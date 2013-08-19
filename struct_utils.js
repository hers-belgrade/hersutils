function defined(obj) { return (typeof (obj) !== 'undefined'); }
function notdefined(obj) {return !defined(obj)};
function doesKeyExist (obj,key) { return (key in obj); }
function isKeyDefined (obj,key) { return (doesKeyExist(obj,key) && defined(obj[key])); }
function isString (obj) {return (typeof(obj) === 'string')}
function isFunction(obj){return (typeof(obj) === 'function')}
function isNull (obj) {return obj === null};
function parseBoolean (str) { return (isString(str))?(str === 'true'):undefined; }
function cNumber (val) {
  try {
    val = parseFloat(val);
  }catch (e){return undefined;}
  return isNaN(val)?undefined:val;
}

function isNumber (val) {
    return (defined(cNumber(val)))?true:false;
}

function isObject(val) {return (val instanceof Object);}
function isHashAlike (val) {return (isObject(val) && !isArray(val));}
function isEmpty (obj){
  var pcnt=0;
  for(var n in obj){
    pcnt++;
  }
  return pcnt<1;
};
function keys (val) {
  if (!(isHashAlike(val) || isArray(val))) return undefined;
  var ret = [];
  for (var i in val) ret.push(i);
  return ret;
}

function vals(val) {
  if (!(isHashAlike(val) || isArray(val))) return undefined;
  var ret = [];
  for (var i in val) ret.push(val[i]);
  return ret;
}

function remap_to_hash (keys,data) {
  var ret = {};
  for (var i in keys) {
    ret[keys[i]] = data[keys[i]];
  }
  return ret;
}

function remap_to_hash_arr (keys,data) {
  var ret = [];
  if(!(data&&data.length)){
    return ret;
  }
  var mod = keys.length;

  for (var i=0;i<data.length;i+=mod) {
    var t = {};
    for (var j = 0; j<mod; j++) {
      t[keys[j]] = data[j+i];
    }
    ret.push(t);
  }
  return ret;
}

function flattern_hash (keys, data) {
  var ret = [];
  for (var i in keys) {
    ret.push (data[keys[i]]);
  }
  return ret;
}

function remap_to_arr (keys, data) {
  var ret = [];
  var mod = keys.length;

  for (var i=0;i<data.length;i+=mod) {
    var t = [];
    for (var j = 0; j<mod; j++) {
      t.push(data[j+i]);
    }
    ret.push(t);
  }
  return ret;
}



module.exports = {
  remap_to_arr:remap_to_arr,
  remap_to_hash:remap_to_hash,
  remap_to_hash_arr:remap_to_hash_arr,
  flattern_hash: flattern_hash,
  keys:keys,
  vals:vals,
  defined:defined,
  notdefined:notdefined,
  doesKeyExist:doesKeyExist,
  isKeyDefined:isKeyDefined,
  isString:isString,
  isFunction:isFunction,
  isNull:isNull,
  parseBoolean:parseBoolean,
  cNumber:cNumber,
  isNumber:isNumber,
  isObject:isObject,
  isHashAlike:isHashAlike,
  isEmpty:isEmpty
};
