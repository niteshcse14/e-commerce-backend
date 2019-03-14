var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	// app.get('/', routes.views.index);

	app.options('/api*', function(req, res) {
		res.send(200);
	});
	/*app.all('/!*', middleware.cors);
	app.options('/!*', function (req, res) {
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-XSRF-TOKEN');
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		res.header('Access-Co`ntrol-Allow-Method', 'GET,POST,PUT,DELETE');
		res.header('Access-Control-Allow-Credentials', true);
		res.sendStatus(200);
	});*/

	// app.get('/', routes.views.index);

	// app.get('/login', routes.views.index);
	// app.get('/', routes.api.getUser.name);
	app.get('/', middleware.isLoggedInUser, middleware.isLoggedInUserTokenAuth, routes.api.GraphQLSchema.get);
	app.post('/', middleware.isLoggedInUser, middleware.isLoggedInUserTokenAuth, routes.api.GraphQLSchema.post);


	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
};
