import ResolverBase from '../base/ResolverBase';
import SignupResolverArguments from '../Arguments/SignupResolverArguments';

export default class UserSignupResolver extends ResolverBase {
	get args () {
		return new SignupResolverArguments();
	}
	async resolve (parent, args, request) {
		let obj = {
			name: {
				first: args.name.first || undefined,
				last: args.name.last || undefined,
			},
			email: args.email.toString().trim().toLowerCase() || undefined,
			password: args.password.toString().trim() || undefined,
		};
		if (!obj.email) {
			return new Error('user email is required');
		}
		if (!obj.name.first && !obj.name.last) {
			return new Error('user full name is required');
		}
		if (!obj.password || obj.password.length < 6) {
			return new Error('password is required && length must be greater than 5');
		}
		let userExists = await services.UserServices.getUser({ email: obj.email })
		if (userExists) {
			return new Error('given email id is already registered!');
		} else {
			obj.password = await services.HashingServices.hash(args.toString().trim());
			let newUser = await services.UserServices.saveUser(obj);
			if (newUser) {
				return newUser;
			} else {
				return new Error('Something wrong!');
			}
		}
	}
}
