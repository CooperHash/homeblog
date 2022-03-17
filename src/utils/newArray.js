var arrayProto = Array.prototype;
// 新建一个继承于Array的对象
var arrayMethods = Object.create(arrayProto);
// 数组拥有的方法
var methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];
methodsToPatch.forEach(function (method) {
  // 缓冲原始数组的方法
  var original = arrayProto[method];
  // 利用Object.defineProperty对方法的执行进行改写
  def(arrayMethods, method, function mutator(val) {
    var args = [],
      len = arguments.length;
    while (len--) args[len] = arguments[len];
    // 执行原数组方法
    var result = original.apply(this, args);
    var inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    //在此处进行通知
    return result;
  });
});
//进行监听
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}

export default arrayMethods
