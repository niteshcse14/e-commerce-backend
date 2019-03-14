import ResolverBase from '../base/ResolverBase';
import ItemResolverArguments from '../Arguments/ItemResolverArguments';
// import mo from 'mongoose';
const ObjectId = require('mongoose').Types.ObjectId;
export default class CreateOrderResolver extends ResolverBase {
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
			noOfItems: Number(args.noOfItems) || 0,
		};
		if (!obj.item) {
			return new Error('item id required !!');
		}
		if (!obj.email) {
			return new Error('email is required !!');
		}
		if (obj.noOfItems < 1) {
			return new Error('number of items is not valid !!');
		}
		console.log(" ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", obj);
		let userExists = await services.UserServices.getUser({ email: obj.email });
		let itemExists = await services.ItemServices.getItem({ _id: obj.item });
		console.log(itemExists, " ========================================= ", userExists);
		if (itemExists.noOfItems < 1) {
			return new Error('This item is OUT OF STOCK');
		}
		if (itemExists.noOfItems < obj.noOfItems) {
			return new Error(obj.noOfItems + ' items not available currently\nonly max ' + itemExists.noOfItems + ' number of items can order');
		}
		if (itemExists && userExists) {
			let orderExists = await services.OrdersServices.getOrder({ item: obj.item, email: obj.email });
			let updateItem = await services.ItemServices.updateItem({ _id: itemExists._id }, { noOfItems: (itemExists.noOfItems - obj.noOfItems) });
			if (orderExists) {
				obj.noOfItems += orderExists.noOfItems;
				let updateOrder = await services.OrdersServices.updateOrder({ _id: orderExists._id }, obj);
				return updateOrder;
			} else {
				obj.itemName = itemExists.name;
				let order = await services.OrdersServices.saveOrder(obj);
				if (order) {
					return order;
				} else {
					return new Error('Something Wrong');
				}
			}
		} else {
			return new Error('Invalid Entries');
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
