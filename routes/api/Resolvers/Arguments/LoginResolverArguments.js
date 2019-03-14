import {
	GraphQLString,
	GraphQLNonNull,
} from 'graphql';
export default class LoginResolverArguments {
	constructor () {
		return {
			email: {
				type: new GraphQLNonNull(GraphQLString),
				description: 'email',
			},
			password: {
				type: new GraphQLNonNull(GraphQLString),
				description: 'password',
			},
		};
	}
}
