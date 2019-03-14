import {
	GraphQLString,
	GraphQLNonNull,
	GraphQLInputObjectType,
} from 'graphql';
export default class SignupResolverArguments {
	constructor () {
		return {
			name: {
				type: new GraphQLNonNull(new GraphQLInputObjectType({
					name: 'Signup_Full_Name',
					description: 'User Signup full name',
					fields: {
						first: {
							type: GraphQLString,
							description: 'First Name',
						},
						last: {
							type: GraphQLString,
							description: 'Last Name',
						},
					},
				})),
			},
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
