class Observer {
  constructor(vm, data) {
    this.proxyData(vm, data);
  }

  // 参数代理, 实现 vm.xxx -> vm._data.xxx
  proxyData(vm, data) {
    var that = vm;
    var dep = new Dep();

    Object.keys(data).forEach((key) => {
      Object.defineProperty(that, key, {
        get() {
          return that._data[key];
        },
        set(newValue) {
          dep.sendMessage();
        },
        enumerable: true,
        configurable: true,
      });
    });
  }
}

var uid = 0;
class Dep {
  constructor() {
    this.id = uid++;
    this.allMessage = [];
  }
  target = null;
  addFollower(oneMessage) {
    this.allMessage.push(oneMessage);
  }
  removeFollower(sub) {
    var index = this.allMessage.indexOf(sub);
    if (index != -1) {
      this.allMessage.slice(index, 1);
    }
  }
  sendMessage() {
    this.allMessage.forEach((sub) => sub.getMessage());
  }
}
Dep.target = null; // 静态属性
