import ResolverBase from '../base/ResolverBase';
import ItemResolverArguments from '../Arguments/ItemResolverArguments';
const ObjectId = require('mongoose').Types.ObjectId;
export default class UpdateOrderResolver extends ResolverBase {
	get args () {
		return new ItemResolverArguments();
	}
	async resolve (parent, args, request) {
		if (!request._user || !request._user._id || !request._user.email) {
			return new Error('Permission Denied !!');
		}
		let obj = {
			item: this.convertToObjectId(args.item) || undefined,
			email: args.email.toString().trim().toLowerCase() || undefined,
			noOfItems: Number(args.noOfItems),
		};
		if (!obj.item || obj.item.toString().trim().length < 1) {
			return new Error('Item id is required');
		}
		
		console.log("/////////////////////////---------------------------- ", obj.noOfItems, Number(obj.noOfItems));
		if (Number(obj.noOfItems) < 0) {
			return new Error('Invalid number of items option.');
		}
		if (!obj.email || obj.email.toString().trim().length < 1) {
			return new Error('user email id is required.');
		}
		/*
		* Order is exists or not
		* */
		let orderExists = await services.OrdersServices.getOrder({ email: obj.email, item: obj.item });
		if (!orderExists) {
			return new Error(' Order Not Found');
		}
		let itemExists = await services.ItemServices.getItem({ _id: obj.item });

		let noOfItems = orderExists.noOfItems - obj.noOfItems;
		console.log('/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ', orderExists);
		if (noOfItems < 0 && Math.abs(noOfItems) > itemExists.noOfItems) {
			return new Error('Not Available ' + Math.abs(noOfItems) + ' number of items. you can choose max number of items ' + itemExists.noOfItems);
		}
		let updateItem = await services.ItemServices.updateItem({ _id: obj.item }, { noOfItems: (itemExists.noOfItems + noOfItems) });
		let updateOrder = await services.OrdersServices.updateOrder({ item: obj.item, email: obj.email }, { noOfItems: obj.noOfItems });
		if (updateOrder && updateItem) {
			return orderExists;
		} else {
			return new Error('something wrong');
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
