import ResolverBase from '../base/ResolverBase';
import DeletionOrderResolverArguments from '../Arguments/DeletionOrderResolverArguments';
const ObjectId = require('mongoose').Types.ObjectId;
export default class DeleteOrderResolver extends ResolverBase {
	get args () {
		return new DeletionOrderResolverArguments();
	}
	async resolve (parent, args, request) {
		if (!request._user || !request._user._id || !request._user.email) {
			return new Error('Permission Denied !!');
		}
		let obj = {
			item: this.convertToObjectId(args.item.toString().trim()),
			email: args.email.toString().trim().toLowerCase(),
		};
		if (!args.email.toString().trim().toLowerCase()) {
			return new Error('user email id is required !!');
		}
		if (!obj.item) {
			return new Error('item id is not valid !!');
		}
		let order = await services.OrdersServices.getOrder(obj);
		if (order) {
			let deleteOrder = await services.OrdersServices.deleteOrder(obj);
			if (deleteOrder) {
				let item = await services.ItemServices.getItem({ _id: obj.item });
				let updateItem = await services.ItemServices.updateItem({ _id: obj.item }, { noOfItems: (item.noOfItems + order.noOfItems) });
				if (updateItem) {
					console.log('item deleted from orders and added again in item noOfItem');
				}
				return order;
			} else {
				return new Error('Something wrong');
			}
		} else {
			return new Error('given information is not valid!');
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
