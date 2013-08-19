var fu = require('./files');

sync_read_and_eval(__dirname+'/hookcollection.js');


module.exports = {
	arry : require ('./arrayutils'),
	sort : require ('./common_sort'),
	comparison : require('./comparison'),
	func : require ('./funcutils'),
	structure: require('./struct_utils'),
	files: fu,
	HookCollection: HookCollection
}
