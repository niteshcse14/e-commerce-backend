import {
	GraphQLString,
	GraphQLInt,
} from 'graphql';
import GraphQLType from '../Resolvers/base/GraphQLType';
export default class ItemType extends GraphQLType {
	static get name () {
		return 'Item';
	}
	static get description () {
		return 'Get Item Information';
	}
	static fields () {
		return {
			id: {
				type: GraphQLString,
				description: 'Item _id',
			},
			itemName: {
				type: GraphQLString,
				description: 'Item Name',
			},
			noOfItems: {
				type: GraphQLInt,
				description: 'noOfItems',
			},
		};
	}
}
