var StringUtils = {
	endsWidth : function (str, suffix) {
		var re = new RegExp (suffix+'$');
		return re.test(str);
	},
}

module.exports = StringUtils;
