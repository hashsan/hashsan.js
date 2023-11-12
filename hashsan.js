/*
v1 new
v2 throw the underscore 
v3 scroll
v4 isFunction is async Function not woking so replace
v5 hashsan stable full, so off the console.log
v6 cut off the underscore's check, change angular
v7 bug fix direct asccess and same start hash
*/
;(function(root){

  function isFunction(value) {return typeof value === 'function';} //angular isFunction
  function isString(value) {return typeof value === 'string';} //angular isString
  var _={}
  _.isString = isString
  _.isFunction = isFunction
///////////////////////////////////////////
  
var $={}
$.debug = false;
$.hashary=[];
$._hashchange=(e)=>{
  if($.debug) console.log('------ hashchange start! -------',e)
  var {hash} = location
  var {gethash,ishash} = $
  if( !ishash(hash)){
    if($.debug) console.log('not found the hash! ',hash)
    return
  }
  //v3.0 scroll
  window.scroll(0,0) //scroll back to the top  
  // do render
  gethash(hash).cb()  
}
$.start=(hash)=>{
  var {_hashchange} = $
  window.addEventListener('hashchange',_hashchange,false)
  const cash = location.hash  
  location.hash = hash===cash ? '#' : hash; //v7 special case and same issue. 
  //
  if(cash){
    //direct #anchor access
    location.hash = cash  
  }
}
$.add=(hash,cb)=>{
  let {hashary} = $
  if(!_.isFunction(cb)){
    throw new Error('$.add(...,cb); cb need function!');
  }
  hashary.push({hash,cb})
  return hashary
}
$.gethash=(hash)=>{
  let {hashary} = $
  let ret=hashary
  .filter(d=>_.isString(d.hash)?hash===d.hash:d.hash(hash))
  .at(0)
  return ret
}
$.ishash=(hash)=>{
  var {gethash} = $
  return !!gethash(hash)
}
 ////
 //v5
 //console.log('---- hashsan.js ----')
 //console.log($)
 //console.log('----/hashsan.js ----')  
 root.hashsan = $
})(window||this);
