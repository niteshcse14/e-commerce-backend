var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Users Model
 * ==========
 */
var Users = new keystone.List('Users');

Users.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
});
Users.defaultColumns = 'name, email, isUsers';
Users.register();
