const Orders = require('keystone').list('Orders').model;
export default class OrdersServices {
	async createOrder () {
		let newOrder = new Orders();
		return newOrder;
	}

	async saveOrder (orderData) {
		let order = new Orders();
		Object.assign(order, orderData);
		return await order.save();
	}
	async getOrder (query) {
		let order = await Orders.findOne(query);
		return order;
	}

	async getOrders (query) {
		let orders = await Orders.find(query);
		console.log("----------------------------------------------- ", orders);
		if (!orders) return new Error('Not Found Orders');
		return orders;
	}

	async updateOrder (query, orderData) {
		let updatedOrder = await Orders.update(query, { $set: orderData });
		if (!updatedOrder) return new Error('Failed to update Order');
		else return orderData;
	}

	async deleteOrder (query) {
		if (!query) {
			return new Error('Invalid Query');
		}
		let deletedOrder = await Orders.remove(query);
		if (!deletedOrder) return new Error(`Failed to delete ${ query } Order`);
		else return deletedOrder;
	}
}
