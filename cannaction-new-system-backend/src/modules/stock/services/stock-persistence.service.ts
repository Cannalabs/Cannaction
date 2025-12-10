import { Item } from "@/modules/item/item.entity";
import { Store } from "@/modules/store/store.entity";
import { Injectable } from "@nestjs/common";
import { CreateStockRequest } from "../dtos/requests/create-stock.request";
import { StockNotFoundError } from "../errors/stock-not-found.error";
import { StockRepository } from "../stock.repository";


@Injectable()
export class StockPersistenceService {
	constructor(
		private readonly stockRepository: StockRepository,
	) {}

	async create(body: CreateStockRequest) {
		const stock = await this.stockRepository.findByStoreAndItem(body.storeId, body.itemId);
		if (stock) return;
		await this.stockRepository.create({ store: new Store({ id: body.storeId }), item: new Item({ id: body.itemId }), minimumAmount: 0, input: 0, output: 0, total: 0 });
	}

	async reduceAmountToStock(itemId: number, storeId: number) {
		const stock = await this.stockRepository.findByStoreAndItem(storeId, itemId);
		if (!stock) throw new StockNotFoundError();
		await this.stockRepository.update({
			...stock,
			output: stock.output + 1,
			total: stock.total - 1,
			updatedAt: new Date()
		});
	}

	// async update(id: number, body: AddToStockRequest) {
	// 	const stock = await this.stockRepository.findOne(id);
	// 	if (!stock) throw new StockNotFoundError();
	// 	await this.stockRepository.update({ ...stock, minimumAmount: body.minimumAmount, total: Number(stock.total) + Number(body.total), input: Number(stock.input) + Number(body.total) });
	// }

	async updateByPointsStatement(itemId: number, storeId: number, amount: number) {
		const stock = await this.stockRepository.findByStoreAndItem(storeId, itemId);
		if (!stock) {
			await this.stockRepository.create({
				store: new Store({ id: storeId }),
				item: new Item({ id: itemId }),
				minimumAmount: 0,
				input: amount,
				output: 0,
				total: amount
			});
		} else {
			await this.stockRepository.update({
				...stock,
				total: Number(stock.total) + Number(amount),
				input: Number(stock.input) + Number(amount),
				updatedAt: new Date()
			});
		}
	}
}
