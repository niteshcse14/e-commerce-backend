import {
	GraphQLObjectType
} from "graphql";

let TYPES = {}
export default class GraphQLType {
	static toGraphQLObjectType () {
		// console.log('[GraphQL Resolvers]'.bold.blue, ' Loading Resolvers: '.yellow, '[Name:]'.bold.blue, this.name.bold.green, '[Description]'.bold.blue, this.description.bold.green)
		if (!TYPES[this.name]) {
			TYPES[this.name] = new GraphQLObjectType({
				name: (this.name).replace(/([^_]+)_(\1)/, '$1'),
				description: this.description,
				fields: () => this.fields()
			})
		}
		return TYPES[this.name]
	}
}
