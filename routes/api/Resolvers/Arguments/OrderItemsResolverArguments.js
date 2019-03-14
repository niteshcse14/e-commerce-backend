import {
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt
} from 'graphql';
export default class OrderItemsResolverArguments {
	constructor () {
		return {
			item: {
				type: new GraphQLNonNull(GraphQLString),
				description: 'item[_id]',
			},
			noOfItems: {
				type: new GraphQLNonNull(GraphQLInt),
				description: 'Number of items',
			},
			email: {
				type: new GraphQLNonNull(GraphQLString),
				description: 'Registered User email ID',
			},
		};
	}
}
