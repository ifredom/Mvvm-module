class Observer {
  constructor(vm, data) {
    this.proxyData(vm, data);
  }

  // 参数代理, 实现 vm.xxx -> vm._data.xxx
  proxyData(vm, data) {
    var that = vm;
    Object.keys(data).forEach((key) => {
      Object.defineProperty(that, key, {
        get() {
          return that._data[key];
        },
        set(newValue) {
          that._data[key] = newValue;
          that.el.innerHTML = that._data[key]; // 更改模板数据的值
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
    console.log("发个消息");
    this.allMessage.forEach((sub) => sub.getMessage());
  }
}

// 创建
var dep = new Dep();

var xiaoming = {
  getMessage() {
    console.log("我，小明，收到消息了");
  },
};
var xiaohong = {
  getMessage() {
    console.log("我，小红，收到消息了");
  },
};

dep.addFollower(xiaoming);
dep.addFollower(xiaoming);

dep.sendMessage();
// >> 发个消息
// >> 我，小明，收到消息了
// >> 我，小红，收到消息了
