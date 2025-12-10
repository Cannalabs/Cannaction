import { Injectable } from '@nestjs/common';
import { Country } from '../country/country.entity';
import { Item } from '../item/item.entity';
import { Barcode } from './barcode.entity';
import { BarcodeRepository } from './barcode.repository';


@Injectable()
export class BarcodeService {
	constructor(
		private readonly barcodeRepository: BarcodeRepository,
	) {}


	async findOne(itemId: number, countryId: number): Promise<Barcode | undefined> {
		return this.barcodeRepository.findOne(itemId, countryId);
	}

	async handleBarcode(itemId: number, countryId: number, code: string) {
		const barcode = await this.findOne(itemId, countryId);
		if (barcode) {
			barcode.barcode = code;
			await this.barcodeRepository.update(barcode);
		} else {
			await this.barcodeRepository.create({ item: new Item({ id: itemId }), country: new Country({ id: countryId }), barcode: code });
		}
	}
}
