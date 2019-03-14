import {
	GraphQLNonNull,
	GraphQLString,
} from 'graphql';
export default class OrderItemResolverArguments {
	constructor () {
		return {
			item: {
				type: GraphQLString,
				description: 'item[_id]',
			},
			email: {
				type: new GraphQLNonNull(GraphQLString),
				description: 'Registered User email ID',
			},
		};
	}
}
