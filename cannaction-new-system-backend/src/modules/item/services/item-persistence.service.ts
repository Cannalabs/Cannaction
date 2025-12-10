import { BarcodeService } from '@/modules/barcode/barcode.service';
import { ItemNotFoundError } from '@/modules/item/errors/item-not-found.error';
import { StockPersistenceService } from '@/modules/stock/services/stock-persistence.service';
import { createBufferedAvatarImage } from '@/utils/image';
import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { ItemCreateRequest } from '../dtos/requests/create-item.request';
import { ItemUpdateRequest } from '../dtos/requests/update-item.request';
import { ItemType } from '../enums/item-type.enum';
import { ItemClothingSizeError } from '../errors/item-size-clothing.error';
import { Item } from '../item.entity';
import { ItemRepository } from '../repositories/item.repository';
import { ItemS3Repository } from '../repositories/item.s3.repository';

@Injectable()
export class ItemPersistenceService {
	constructor(
		private readonly itemRepository: ItemRepository,
		private readonly itemS3Repository: ItemS3Repository,
		private readonly stockPersistenceService: StockPersistenceService,
		private readonly barcodeService: BarcodeService
	) {}

	async create(newItem: ItemCreateRequest): Promise<Item> {
		if (newItem.type === ItemType.CLOTHING && !newItem.size)
			throw new ItemClothingSizeError();
		const composedItem = this.composeEntity(newItem);
		const item = await this.itemRepository.create(composedItem);

		for (const barcode of newItem.barcodes) {
			if (!barcode.barcode || barcode.barcode === '') continue;
			await this.barcodeService.handleBarcode(item.id, barcode.country.id, barcode.barcode);
		}
		for (const store of newItem.storeIds) {
			await this.itemRepository.addItemStore(item.id, store);
		}

		return item;
	}

	async update(id: number, body: ItemUpdateRequest): Promise<Item> {
		const item = await this.itemRepository.findOne(id);
		if (!item) throw new ItemNotFoundError();
		const updatedItem: DeepPartial<Item> = this.composeEntity(body);

		await this.itemRepository.removeItemStores(item.id);

		for (const store of body.storeIds) {
			await this.itemRepository.addItemStore(item.id, store);
		}

		for (const barcode of body.barcodes) {
			if (!barcode.barcode || barcode.barcode === '') continue;
			await this.barcodeService.handleBarcode(item.id, barcode.country.id, barcode.barcode);
		}

		return this.itemRepository.update(id, updatedItem);
	}

	async inactive(id: number): Promise<void> {
		const item = await this.itemRepository.findOne(id);
		if (!item) throw new ItemNotFoundError();
		if (!item.active) return;
		return this.itemRepository.inactive(id);
	}

	async active(id: number): Promise<void> {
		const item = await this.itemRepository.findOne(id);
		if (!item) throw new ItemNotFoundError();
		if (item.active) return;
		return this.itemRepository.active(id);
	}

	async delete(id: number): Promise<void> {
		const item = await this.itemRepository.findOne(id);
		if (!item) throw new ItemNotFoundError();
		await this.itemRepository.deleteItem(id);
	}

	private composeEntity(request: ItemCreateRequest | ItemUpdateRequest) {
		return {
			name: request.name,
			description: request.description,
			image: request.image,
			dots: request.dots,
			active: true,
			exchange: request.exchange,
			size: request instanceof ItemCreateRequest ? request.size : undefined,
			type: request instanceof ItemCreateRequest ? request.type : undefined,
			points: request.points,
		};
	}

	async updateImage(id: number, image: string) {
		const item = await this.itemRepository.findOne(id);
		if (!item) throw new ItemNotFoundError();

		const buffer = await createBufferedAvatarImage(image);

		const imageUrl = await this.itemS3Repository.save(
			id,
			buffer
		);

		await this.itemRepository.update(id, { image: imageUrl });
	}
}
