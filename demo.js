// 自定义call函数
Function.prototype.mycall =function (context) {
    if(typeof this!=='function'){
        throw new TypeError('not function')
    }
    context=context||window;
    context.fn=this;
    let arg=[...arguments].slice(1);
    let result= context.fn(...arg);
    delete context.fn;
    return result;
}
// 自定义 applay函数
Function.prototype.myapplay =function (context) {
     if(typeof this!=='function'){
         throw new TypeError('not function')
     }
     context=context||window;
     context.fn=this;
     let result;
     if(arguments[1]){
         result= context.fn(...arguments[1])
     }else{
        result= context.fn()
     }
     delete context.fn
     return result
}
// 自定义 bind 函数
Function.prototype.myBind =function (context) {
    if(typeof this!=='function'){
        throw new TypeError('not function')
    }
  let _this=this;
  let arg=[...arguments].slice(1);
   return function F() {
       if(this instanceof F){
           return _this(arg.concat(...arguments))
       }else{
        _this.apply(context,arg.concat(...arguments))
       }
   }
}
// instanceof 实现原理
function instance_of(left,right) {
    let leftProto= left._proto_;
    let rightProto= right.prototype;
    while (true) {
        if(leftProto===null){
            return false
        }
        if(leftProto===rightProto){
            return true
        }
        leftProto=leftProto._proto_;
    }
    
}
// Object.create 实现原理
function object_create(obj) {
  function F(){};
  F.prototype=obj;
  return new F();
}
// new 的实现
function new_fun (fun) {
    return function () {
        let obj={
            _proto_: fun.prototype
        };
        fun.call(obj,...arguments);
        return obj
    }
}
// 实现一个基本Promise
class Promise{
    constructor(fn){
      this.state='pending';
      this.value= undefined;
      this.reason =undefined;
      let resolve=value=>{
         if(this.state==='pending'){
             this.value=value;
             this.state= 'fulfilled';
         }
      }
      let reject=value=>{
        if(this.state==='pending'){
            this.reason=value;
            this.state= 'rejected';
        }
      }
      try{
          fn(resolve,reject)
      }catch(e){
          reject(e)
      }
    }
    then(onFulfilled,onRejected){
        if(this.state==='fulfilled'){
            onFulfilled()
        }else if(this.state==='rejected'){
            onRejected()
        }
    }
}
// 浅拷贝
const copy1= {...{x:1}};
const copy2= Object.assign({},{x:1});
// 深拷贝
function deepClone(obj) {
    let copy=  obj instanceof Object ==='Array'?[]:{};
    for(let i in obj){
        if(obj.hasOwnProperty(i)){
            copy[i]= typeof obj[i]==='object'?deepClone(obj[i]):obj[i]
        }
    }
    return copy;
}