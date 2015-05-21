var mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
	user_id : {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required : "no associated user"
	},
	payment_method : {
		type : String,
		required : "record the payment method"
	},
	card_owner : {
		type : String,
		required : "credit card owner required"
	},
	card_number : {
		type : String,
		required : "credit card number required"
	},
	date_from : {
		type : Date,
		default : Date.now,
	},
	date_to : {
		type : Date,
		required : "expiry date required"
	}
});

var encKey = process.env.SOME_32BYTE_BASE64_STRING;
var sigKey = process.env.SOME_64BYTE_BASE64_STRING;

paymentSchema.plugin(encrypt, {
	encryptionKey: encKey,
	signingKey: sigKey,
	encryptedFields: ['card_number', 'card_owner']
});

// consider renaming encrypted collection: https://www.npmjs.com/package/mongoose-encryption

var Payment = mongoose.model('Addr', paymentSchema);

module.exports = {
	Payment: Payment
};