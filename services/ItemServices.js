const Items = require('keystone').list('Items').model;
export default class ItemServices {
	async createItem () {
		let newItem = new Items();
		return newItem;
	}

	async saveItem (itemData) {
		let item = new Items();
		Object.assign(item, itemData);
		return await item.save();
	}
	async getItem (query) {
		let item = await Items.findOne(query);
		return item;
	}

	async getItems (query, noOfItems) {
		let items = await Items.find(query);
		if (!items) return new Error('Not Found Items');
		return items;
	}

	async updateItem (query, itemData) {
		let updatedItem = await Items.update(query, { $set: itemData });
		if (!updatedItem) return new Error('Failed to update Item');
		else return itemData;
	}

	async deleteItem (query) {
		if (!query) {
			return new Error('Invalid Query');
		}
		let deletedItem = await Items.remove(query);
		if (!deletedItem) return new Error(`Failed to delete ${ query } Item`);
		else return deletedItem;
	}
}
