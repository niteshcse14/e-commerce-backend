var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Items Model
 * ==========
 */
var Items = new keystone.List('Items', {
	track: true,
});

Items.add({
	name: { type: Types.Text, initial: true, required: true },
	noOfItems: { type: Types.Number, default: 0 },
});
Items.defaultColumns = 'name, noOfItems, createdAt';
Items.register();
