var Payment = require('../models/payment').Payment;

exports.addPayment = function(payment, userId, next) {
	var newPayment = new Payment({
		user_id : userId, // use mongojs.ObjectId?
		payment_method : payment.method,
		card_owner : payment.name,
		card_number : payment.credit_card,
		date_to : payment.expiryDate
	});

	newPayment.save(function(err) {
		if (err) return next(err);
		next(null);
	});
};

exports.findPayment = function(userId, next) {
	Payment.find({user_id: userId}, function(err, payment) {
		return next(err, payment);
	});
};