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

class Dep {
  constructor() {
    this.allMessage = [];
  }
  addFollower(oneMessage) {
    this.allMessage.push(oneMessage);
  }
  sendMessage() {
    this.allMessage.forEach((sub) => sub.getMessage());
  }
}