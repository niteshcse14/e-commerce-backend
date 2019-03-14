var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Orders Model
 * ==========
 */
var Orders = new keystone.List('Orders', {
	track: true,
});

Orders.add({
	item: { type: Types.Relationship, ref: 'Items', required: true, index: true, initial: true },
	itemName: { type: Types.Text },
	email: { type: Types.Email, initial: true, required: true, index: true, sparse: true },
	noOfItems: { type: Types.Number, initial: true, required: true, default: 0 },
});
Orders.defaultColumns = 'item, itemName, noOfItems, email, createdAt';
Orders.register();
