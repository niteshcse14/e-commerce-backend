import ResolverBase from '../base/ResolverBase';
export default class LogoutResolver extends ResolverBase {
	get args () {
		return {};
	}
	resolve (parent, args, request) {
		request.logout();
		return 'Token cleared';
	}
}
