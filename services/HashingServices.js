import bcrypt from 'bcrypt';
export default class HashingServices {
	async hash (text) {
		let has = await bcrypt.hashSync(text, Number(process.env.SALT_ROUNDS));
		return has;
	}
	async compareHash (text, hashText) {
		let res = await bcrypt.compareSync(text, hashText);
		return res;
	}
}
