var SORT = {
	numeric_sort: function  (a,b) {return a-b;}
}

function appendHashToArry(hash,arry,hashfieldarry){
  var hfl = hashfieldarry.length;
  for(var i=0; i<hfl; i++){
    arry.push(hash[hashfieldarry[i]]);
  }
}

function unpackArryToArryOfHashes(arry,proparry){
  var aoh = [];
  var pal = proparry.length;
  var al = arry.length;
  for(var i=0; i<al; ){
    var o={};
    for(var j=0; j<pal; j++){
      var p = proparry[j];
      if(typeof p === 'object'){
        o;
      }else{
        o[p]=arry[i];
        console.log('property ',p,'of',arry,'with value',arry[i],'assigned to',o);
      }
      i++;
    }
    aoh.push(o);
  }
  return aoh;
}

function asyncProcess(arry,processelementcb,finishcb){
  var fcb = (typeof finishcb === 'function')?finishcb:(function(){});
  if(typeof processelementcb !== 'function'){
    return fcb();
  }
  var pecb = processelementcb;
  var a = arry;
  var al = a.length;
  var pe = function _pe(i){
    if(i>=al){
      return fcb();
    }
    var _n = i+1;
    pecb(a[i],function _ncb(){pe(_n);});
  };
  pe(0);
}

function s_copy (arry) {
  var ret = [];
  for (var i in arry) ret[i] = arry[i];
  return ret;
}

function d_copy (arry) {
  return JSON.parse(JSON.stringify(arry));
}

function dumpfields(arry,fieldarry){
  var getfield = function _getfield(e,f){
    if(!e){
      return 'undefined';
    }
    switch(typeof e[f]){
      case 'undefined':
        return 'undefined';
      case 'function':
        return (e[f])();
      default:
        return e[f];
    }
  };
  var al = arry.length;
  var fal = fieldarry.length;
  var ret = '';
  for(var i=0; i<al; i++){
    if(ret.length){
      ret+="\n";
    }
    var es='';
    for(var fi=0; fi<fal; fi++){
      if(es.length){
        es+=',';
      }
      es+=getfield(arry[i],fieldarry[fi]);
    }
    ret+=es;
  }
  return ret;
}


function min (arr) {return Math.min.apply(null, arr);};
function max (arr) {return Math.max.apply(null, arr);};
function diff (arr) {return max(arr) - min(arr);};
function last_el (arr) {return arr[arr.length-1];};
function last_ind (arr) {return arr.length-1;};
function a_index (arr, index) {
  if (index > 0) return arr[index];
  index = (-index)%arr.length;
  return (!index) ? arr[0] : arr[arr.length-index];
};
function numeric_sort (arr) {
  for (var i in arr) arr[i] = parseInt(arr[i]);
  arr.sort(SORT.numeric_sort);
};

function generate_numeric (start, end, step, black_list) {
  step = step || 1;
  var ret = [];
  var i = start;
  var go = (step>0)?(i<=end):(i>end);
  while (go) {
    (!black_list || black_list.length == 0 || black_list.indexOf(i) < 0) && ret.push(i);
    i+= step;
    go = (step>0)?(i<=end):(i>end);
  }
  return ret;
}

function intersect (arr1, arr2) {
  var ret = [];
  for (var i in arr1) {
    if (arr2.indexOf(arr1[i]) > -1) ret.push (arr1[i]);
  }
  return ret;
}

function reject(list, rejection_list) {
  var ret = [];
  for (var i in list) if (rejection_list.indexOf(list[i]) == -1) ret.push (list[i]);
  return ret;
}


module.exports={
  appendHashToArry:appendHashToArry,
  unpackArryToArryOfHashes:unpackArryToArryOfHashes,
  s_copy:s_copy,
  d_copy:d_copy,
  asyncProcess:asyncProcess,
  fieldDump:dumpfields,
  min:min,
  max:max,
  diff:diff,
  last_el:last_el,
  last_ind:last_ind,
  a_index:a_index,
  numeric_sort:numeric_sort,
  generate_numeric: generate_numeric,
  intersect:intersect,
  reject:reject,
	SORT : SORT
};
