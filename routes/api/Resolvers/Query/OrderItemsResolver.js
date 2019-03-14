import ResolverBase from '../base/ResolverBase';
import OrderItemResolverArguments from '../Arguments/OrderItemResolverArguments';
const ObjectId = require('mongoose').Types.ObjectId;
export default class OrderItemsResolver extends ResolverBase {
	get args () {
		return new OrderItemResolverArguments();
	}
	async resolve (parent, args, request) {
		if (!request._user || !request._user._id || !request._user.email) {
			return new Error('Permission Denied !!');
		}
		let obj = {
			email: args.email.toString().trim().toLowerCase(),
		};
		if (args.item && this.convertToObjectId(args.item.toString().trim())) {
			obj.item = this.convertToObjectId(args.item.toString().trim());
		}
		let orders = await services.OrdersServices.getOrders(obj);
		if (orders) {
			return orders;
		} else {
			return new Error('Not Found ordered Item on ' + obj);
		}
	}
	convertToObjectId (id) {
		let objectId = null;
		if (id instanceof ObjectId) {
			objectId = id;
		} else if (id) {
			try {
				objectId = ObjectId(id);
			} catch (c) {
				objectId = null;
			}
		}
		return objectId;
	}
}
