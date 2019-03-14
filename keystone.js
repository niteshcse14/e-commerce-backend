require('dotenv').config();
require('babel-register');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
// Require keystone
const keystone = require('keystone');
const handlebars = require('express-handlebars');
const appBaseDir = __dirname;
keystone.init({
	'name': 'e-commerce-backend',
	'brand': 'e-commerce-backend',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': '.hbs',
	'admin path': 'admin',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'Admin',
});
keystone.import('models');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
keystone.set('routes', require('./routes'));

keystone.set('nav', {
	admins: 'admins',
	users: 'Users',
	Items: ['Items', 'Orders'],
});

// Load Service
try {
	let services = {};
	let list = fs.readdirSync(path.join(appBaseDir, 'services'));
	list.forEach(item => {
		if (item.search(/.js$/) !== -1) {
			let name = item.toString().replace(/\.js$/, '');
			console.log(`Loading Service: ${name}`);
			services[name] = new (require(path.join(appBaseDir, 'services', name))).default;
		}
	});
	addSafeReadOnlyGlobal('services', services);
}
catch (err) {
	console.log(err);
}
keystone.start();


function addSafeReadOnlyGlobal(prop, val) {
	Object.defineProperty(global, prop, {
		get: function () {
			return val;
		},
		set: function () {
			log.warn('You are trying to set the READONLY GLOBAL variable `', prop, '`. This is not permitted. Ignored!');
		},
	});
}
