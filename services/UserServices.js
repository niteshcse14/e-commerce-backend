const Users = require('keystone').list('Users').model;
export default class UserServices {
	async createUser () {
		let newUser = new Users();
		return newUser;
	}

	async saveUser (userData) {
		let user = new Users();
		Object.assign(user, userData);
		return await user.save();
	}
	async getUser (query) {
		let user = await Users.findOne(query);
		return user;
	}

	async getUsers (query) {
		if (!query) {
			return new Error({ status: 303, message: 'Invalid Query' });
		}
		let users = await Users.find(query);
		if (!users) return new Error('Not Found Users');
		return users;
	}

	async updateUser (query, userData) {
		let updatedUser = await Users.update(query, { $set: userData });
		if (!updatedUser) return new Error('Failed to update User');
		else return userData;
	}

	async deleteUser (query) {
		if (!query) {
			return new Error('Invalid Query');
		}
		let deletedUser = await Users.remove(query);
		if (!deletedUser) return new Error(`Failed to delete ${ query } User`);
		else return deletedUser;
	}
}
