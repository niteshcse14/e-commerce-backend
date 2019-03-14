import {
	GraphQLObjectType,
	GraphQLSchema,
} from 'graphql';

import graphqlExpress from 'express-graphql';

/*
* Query Resolver
* */
import OrderItemsResolver from './Resolvers/Query/OrderItemsResolver';

/*
* Types
* */
import UserType from './Types/UserType';
import ItemType from './Types/ItemType';

/*
* Mutation Resolver
* */
import UserSignupResolver from './Resolvers/Mutation/UserSignupResolver';
import CreateOrderResolver from './Resolvers/Mutation/CreateOrderResolver';
import DeleteOrderResolver from './Resolvers/Mutation/DeleteOrderResolver';
import UpdateOrderResolver from './Resolvers/Mutation/UpdateOrderResolver';
import LoginResolver from './Resolvers/Query/LoginResolver';
import LogoutResolver from './Resolvers/Query/LogoutResolver';

const GraphQLSchemaInstance = new GraphQLSchema({
	/*
	* Queries (Read only)
	* */
	query: new GraphQLObjectType({
		name: 'Query',
		description: 'The Root Of All Queries',
		fields: () => ({
			loginResolver: new LoginResolver(UserType, 'Login Resolver'),
			logoutResolver: new LogoutResolver(UserType, 'Login Resolver'),
			ordersList: new OrderItemsResolver(ItemType, 'Get Order List', true),
		}),
	}),
	mutation: new GraphQLObjectType({
		name: 'Mutation',
		description: 'The Root Of All Mutations',
		fields: () => ({
			signup: new UserSignupResolver(UserType, ' User Signup Resolver'),
			createOrder: new CreateOrderResolver(ItemType, ' Create Order Resolver'),
			updateOrder: new UpdateOrderResolver(ItemType, 'Update Order Resolver'),
			deleteOrder: new DeleteOrderResolver(ItemType, 'Delete Order Resolver'),
		}),
	}),
});

exports.get = graphqlExpress({
	schema: GraphQLSchemaInstance,
	graphiql: true,
});

exports.post = graphqlExpress({
	schema: GraphQLSchemaInstance,
	graphiql: false,
});
