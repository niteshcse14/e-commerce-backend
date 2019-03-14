import crypto from 'crypto'
export default class SecurityServices {
	encryption (data) {
		var jsonData = JSON.stringify({ payload: data })
		try {
			var cipher = crypto.createCipher(process.env.GENERATOR_ALGO, process.env.GENERATOR_SECRET)
			return cipher.update(jsonData, 'binary', 'hex') + cipher.final('hex')
		} catch (error) {
			return new Error (error)
		} 
	}
	decryption (encryptedText) {
		var data = null
		try {
			var decipher = crypto.createDecipher(process.env.GENERATOR_ALGO, process.env.GENERATOR_SECRET)
			data = JSON.parse(decipher.update(encryptedText, 'hex') + decipher.final())
		} catch (error) {
			error.message = "Unable to decode the encryptedText. Tampered input! Or Invalid Secret! " + error.message;
			return new Error(error)
		}
		if (data && data.payload) {
			return data.payload;
		} else {
			return new Error("Unable to parse. Bad data or secret.");
		}
	}
}
