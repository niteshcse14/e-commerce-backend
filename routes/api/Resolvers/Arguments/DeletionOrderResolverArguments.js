import {
	GraphQLString,
	GraphQLNonNull, GraphQLInt,
} from 'graphql';
export default class DeletionOrderResolverArguments {
	constructor () {
		return {
			item: {
				type: new GraphQLNonNull(GraphQLString),
				description: 'item[_id]',
			},
			email: {
				type: new GraphQLNonNull(GraphQLString),
				description: 'Registered User email ID',
			},
		};
	}
}
