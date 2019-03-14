import ResolverBase from '../base/ResolverBase';
import LoginResolverArguments from '../Arguments/LoginResolverArguments';
const Users = require('keystone').list('Users').model;
export default class LoginResolver extends ResolverBase {
	get args () {
		return new LoginResolverArguments();
	}

	resolve (parent, args, request) {
		if (!args.email.toString().trim().toLowerCase() || !args.password) {
			return new Error('Permission Denied !!');
		}
		return new Promise((resolve, reject) => {
			this.authorizeUser(args.email, args.password, (err, result) => {
				if (err) return reject(err);
				if (result === null) {
					return reject(new Error('No User Found'));
				}
				try {
					request.loginUser({
						_id: result._id,
						email: result.email,
						password: result.password,
					});
					result._customerToken = request._customerToken;
					resolve(result);
				} catch (err) {
					console.log('err : ', err);
					reject(err);
				}
				/*if (result.password) {
					console.log("............................... ", result);
					if (services.HashingServices.compareHash(args.password, result.password)) {
						request.loginUser({
							_id: result._id,
							email: result.email,
							password: result.password,
						});
						result._customerToken = request._customerToken;
						resolve(result);
					} else {
						return reject(new Error('No User Found'));
					}
				} else {
					return reject(new Error('No User Found'));
				}*/
			});
		});
	}
	async authorizeUser (email, password, callback) {
		let user = await Users.findOne({ email: email });
		return callback(null, user);
	}
}
