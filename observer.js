class Observer {
  constructor(data) {
    this.data = data;
    this.proxyData(data);
  }

  // 由于mvvm.js中已经实现了 vm.xxx -> vm._data.xxx属性代理
  // 而 vm.$options.data 即为传入 new Observer(data)中的data.
  // 需要做的是 
  // 1.每一个代理的属性都创建一个消息收发装置(Dep) 2.对每一个代理的属性都放置摄像头（observe）,

  proxyData(data) {
    var that = this;
    Object.keys(data).forEach((key) => {
      var val = data[key];
      var dep = new Dep();
      var childObj = that.observe(val);
      Object.defineProperty(data, key, {
        get() {
          if (Dep.target) {
            dep.depend();
          }
          return val;
        },
        set(newVal) {
          if (newVal === val) {
            return;
          }
          val = newVal;
          // 新的值是object的话，再次进行监听
          childObj = that.observe(newVal);
          dep.notify();
        },
        enumerable: true,
        configurable: false,
      });
    });
  }
  observe(value, vm) {
    if (!value || typeof value !== "object") {
      return;
    }
    return new Observer(value);
  }
}

var uid = 0;
class Dep {
  constructor() {
    this.id = uid++;
    this.subs = [];
  }
  addFollower(oneMessage) {
    this.subs.push(oneMessage);
  }
  removeFollower(sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.slice(index, 1);
    }
  }
  notify() {
    this.subs.forEach((sub) => sub.update());
  }

  depend() {
    Dep.target.addDep(this);
  }
}
Dep.target = null; // 静态属性
