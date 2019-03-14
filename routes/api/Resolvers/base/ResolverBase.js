import {
	GraphQLList,
} from 'graphql';
export default class ResolverBase {
	constructor (Type, description, isList) {
		this._description = description;
		if (Type === undefined) {
			this._type = {};
		} else {
			this._type = Type.toGraphQLObjectType();
		}
		return {
			type: isList ? new GraphQLList(this._type) : this._type,
			description: this.description,
			args: this.args,
			resolve: this.resolve.bind(this),
		};
	}

	get type () {
		return this._type;
	}

	get description () {
		return this._description;
	}
}
