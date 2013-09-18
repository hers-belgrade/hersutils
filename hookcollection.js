function ConditionalHook () {
	this.queue = {};
	this.hooks = {};
}

ConditionalHook.prototype.check = function (name) {
	var cb = this.hooks[name];
	return ('function' === typeof(cb)) ? cb() : undefined;
}

ConditionalHook.prototype.register = function (name , condition_cb) {
	this.hooks[name] = condition_cb;
}

ConditionalHook.prototype.unregister = function (name) {
	delete this.hooks[name];
	delete this.queue[name];
}

ConditionalHook.prototype.emptyQueue = function (name) {
	if (!this.hooks[name]) return;
	if (this.queue[name]) delete this.queue[name];
}

ConditionalHook.prototype.attach = function (name, cb) {
	if (!this.hooks[name]) return;
	if (this.check(name)){
		this.fire(name);
		cb();
		return;
	}

	if (!this.queue[name]) this.queue[name] = [];
	this.queue[name].push (cb);
}

ConditionalHook.prototype.fire = function (name) {
	if (!this.check (name)) return;
	var q = this.queue[name];
	if (!q || q.length == 0) return;
	while (q.length) {
		var f = q.shift();
		('function' === typeof(f)) && f();
	}
}


function HookCollection(){
  this.collection = {};
	this.counter = 0;
};
HookCollection.prototype.empty = function(){
	var c = 0;
	for(var n in this.collection){
		return false;
	}
  return true;
};
HookCollection.prototype.inc = function(){
	var t = this;
	function _inc(){
		t.counter++;
		if(t.counter>10000000){
			t.counter=1;
		}
	};
	_inc();
	while(this.counter in this.collection){
		_inc();
	}
};
HookCollection.prototype.attach = function(cb){
  if(typeof cb === 'function'){
		this.inc();
    this.collection[this.counter]=cb;
    //console.log('attached',cb,'to',this.counter);
		return this.counter;
  }
};
HookCollection.prototype.detach = function(i){
	delete this.collection[i];
};
HookCollection.prototype.fire = function(){
  var c = this.collection;
  var fordel=[];
  var pa = Array.prototype.slice.call(arguments);
  //console.log('firing on',c);
  for(var i in c){
    try{
      var fqn = c[i];
      //console.log('calling',fqn,'on',i,'with',pa);
      fqn.apply(null,pa);
    }
    catch(e){
      console.log(e);
      console.log(e.stack);
      fordel.unshift(i);
    }
  }
  var fdl = fordel.length;
  for(var i=0; i<fdl; i++){
		delete c[fordel[i]];
  }
};
/* controversial
HookCollection.prototype.fireAndForget = function(){
  var c = this.collection;
  var pa = Array.prototype.slice.call(arguments);
  for(var i in c){
    try{
      c[i].apply(null,pa);
    }
    catch(e){
      console.log(e);
      console.log(e.stack);
    }
  }
	this.collection = {};
}
*/
HookCollection.prototype.destruct = function(){
  //console.log('destructing');
  for(var i in this.collection){
    delete this.collection[i];
  }
}

module.exports = HookCollection;
