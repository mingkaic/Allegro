var checksNav = function() {
	console.log($(document).find("login"))
	if ($(document).find("login").length)
		$("#globalheader").find("#userInfo").children().hide();

	if ($(document).find("browse").length)
		$("#globalheader").find("#userInfo").children().show();

	if ($(document).find("manage").length)
		$("#globalheader").find("#userInfo").children().show();
};

$(document).ready(function() {
	checksNav();
	$(document).on("click", checksNav());
});