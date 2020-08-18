class Mvvm {
  constructor(options) {
    this.el = document.querySelector(options.el);
    this._data = options.data; // 

    this.proxyData(options.data);

    options.el.innerHTML = this.data[exp];  // 初始化模板数据的值
  }

  // 参数代理, 实现 vm.xxx -> vm._data.xxx
  proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return this._data[key];
        },
        set(newValue) {
          this._data[key] = newValue;
        },
        enumerable: true,
        configurable: true,
      });
    });
  }
}
