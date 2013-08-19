var S = require ('./struct_utils');
module.exports={
	safecb:function safecb(cb){
		return S.isFunction(cb) ? cb : function (){}
	},

	safecall:function safecall(fqn){
		S.isFunction(fqn) && fqn.apply(null,Array.prototype.slice.call(arguments,1));
	}
};
