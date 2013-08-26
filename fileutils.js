var fs = require('fs');

function read_and_eval (path) {
	//var content = fs.readFileSync(__dirname+'/hookcollection.js', 'utf8');
	var content = fs.readFileSync(path, 'utf8');
	return eval(content);
}
module.exports = {
	read_and_eval : read_and_eval
}


