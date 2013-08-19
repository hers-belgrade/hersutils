var util = require('util');

function comparearry(a,b){
  if(a.length!==b.length){return false;}
  var al = a.length;
  for(var i=0; i<al; i++){
    if(!compare(a[i],b[i])){
      return false;
    }
  }
  return true;
};

function compareobj(a,b){
  for(var p in a){
    if(!compare(a[p],b[p])){
      return false;
    }
  }
  return true;
};

function compare(a,b){
  var toa = typeof a;
  var tob = typeof b;
  if(toa!==tob){return false;}
  if(toa === 'object'){
    return(compareobj(a,b)&&compareobj(b,a));
  }
  if(util.isArray(a)&&util.isArray(b)){
    return comparearry(a,b);
  }
  return a===b;
};

module.exports = {
	compare:compare
};
