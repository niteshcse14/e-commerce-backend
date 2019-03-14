var _ = require('lodash');
import fs from 'fs';
import path from 'path';

/**
	Initialises the standard view locals
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};


exports.isLoggedInUser = function (req, res, next) {
	req.loginUser = function (user) {
		req._isAuthenticated = true;
		let userToken = services.SecurityServices.encryption(user);
		if (userToken instanceof Error) {
			console.log("/////////////////////////////////// ", user, userToken);
			return res.status(500).send(userToken);
		} else {
			req._user = user;
			req._userToken = userToken;
			res.cookie(process.env.cookieSecretKey, userToken, {
				expires: new Date(+new Date() + (1 * 24 * 60 * 60 * 1000)),
			});
		}
	};
	req.logout = function () {
		let userToken = req.headers['authorization'] || req.headers['Authorization'] || req.cookies[process.env.cookieSecretKey]|| req.query.token || undefined;
		req._user = null;
		req._isAuthenticated = false;
		if (userToken) {
			console.log('Log out successfully');
		} else {
			console.log('already Not Loggedin');
		}
		res.cookie(process.env.cookieSecretKey, userToken, {
			expires: new Date(+new Date() - (1 * 24 * 60 * 60 * 1000)),
		});
	};
	next();
};

exports.isLoggedInUserTokenAuth = function (req, res, next) {
	var userToken = req.headers['authorization'] || req.headers['Authorization'] || req.cookies[process.env.cookieSecretKey]|| req.query.token || undefined;
	if (userToken) {
		var _user = services.SecurityServices.decryption(userToken);
		if (_user instanceof Error) {
			return res.status(500).send(_user);
		}
		req._user = _user;
	}
	next();
};

exports.setEndPoint = async function (req, res, next) {
	// let userAgent = req.headers['user-agent'];

	// console.log("//////////////////////////// ", req.type, req.query.jsuseragent);
	var userToken = req.headers['authorization'] || req.headers['Authorization'] || req.cookies[process.env.cookieSecretKey]|| req.query.token || undefined;
	if (userToken) {
		// let endPoint = req.originalUrl;
		// let host = req.headers.host;
		// let userAgent = req.headers['user-agent']
		// let connection = req.headers['connection']
		// let timeout = req.connection.server.timeout
		// let _remoteAddress = req.connection._httpMessage.req._remoteAddress
		// let sessionID = req.connection._httpMessage.req.sessionID
		// console.log(userAgent);
		// console.log("SET END POINT !!!!!!!!!!headers:!!!!!! ", );
		// console.log("SET END POINT !!!!!!!!!!headers:!!!!!! ", );
		// let setEndPoint = await ;
	} else {
		// saving for guest user
		// after matching any entry to any user then our web worker will remove entries
	}
	next();
};

exports.cors = function (req, res, next) {
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-XSRF-TOKEN');
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Credentials', true);
	next();
};
