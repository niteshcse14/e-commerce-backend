import {
	GraphQLString,
	GraphQLInt,
} from 'graphql';
import GraphQLType from '../Resolvers/base/GraphQLType';
export default class CreateOrderType extends GraphQLType {
	static get name () {
		return 'CreateOrder';
	}
	static get description () {
		return 'Get Item Information';
	}
	static fields () {
		return {
			itemId: {
				type: GraphQLString,
				description: 'Item _id',
			},
			name: {
				type: GraphQLString,
				description: 'Item Name',
			},
			userId: {
				type: GraphQLString,
				description: 'Item _id',
			},
			userName: {
				type: GraphQLString,
				description: 'Item Name',
			},
			userEmail: {
				type: GraphQLString,
				description: 'Item Name',
			},
			noOfItems: {
				type: GraphQLInt,
				description: 'Item Email',
			},
		};
	}
}
