;(function(root){
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
  // do render
  gethash(hash).cb()  
}
$.start=(hash)=>{
  var {_hashchange} = $
  window.addEventListener('hashchange',_hashchange,false)
  const cash=location.hash  
  location.hash = hash
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
 console.log('---- hashsan.js ----')
 console.log($)
 console.log('----/hashsan.js ----')  
 root.hashsan = $
})(this||window);
