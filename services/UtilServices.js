const ObjectId = require('mongoose').Types.ObjectId;
export default class UtilService {

	convertToObjectId (id) {
		let objectId = null;
		if (id instanceof ObjectId) {
			objectId = id;
		} else if (id) {
			try {
				objectId = ObjectId(id);
			} catch (c) {
				objectId = null;
			}
		}
		return objectId;
	}

	addSafeReadOnlyGlobal (prop, val) {
		Object.defineProperty(global, prop, {
			get: function () {
				return val;
			},
			set: function () {
				log.warn('You are trying to set READONLY GLOBAL variable `', prop, '`. This is not permitted. Ignored!');
			},
		});
	}
}
