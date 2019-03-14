import {
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLBoolean,
} from 'graphql';
import GraphQLType from '../Resolvers/base/GraphQLType';
export default class UserType extends GraphQLType {
	static get name () {
		return 'User';
	}
	static get description () {
		return 'Get User Information';
	}
	static fields () {
		return {
			id: {
				type: GraphQLString,
				description: 'User _id',
			},
			name: {
				type: new GraphQLObjectType({
					name: 'UserNormalRegistrationName',
					description: 'User Normal Registration Name',
					fields: {
						first: {
							type: GraphQLString,
							description: 'First Name',
						},
						last: {
							type: GraphQLString,
							description: 'Last Name',
						},
						full: {
							type: GraphQLString,
							description: 'First Name',
							resolve: name => `${name.first || ''} ${name.last || ''}`.trim(),
						},
					},
				}),
			},
			password: {
				type: GraphQLString,
				description: 'User password',
			},
			email: {
				type: GraphQLString,
				description: 'User Email',
			},
			createdAt: {
				type: GraphQLString,
				description: 'User Registration Time',
			},
		};
	}
}
