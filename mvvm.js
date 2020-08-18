class Mvvm {
  constructor(options) {
    this.el = document.querySelector(options.el);
    this._data = options.data; //

    this.proxyData(options, options.data);
  }

  // 参数代理, 实现 vm.xxx -> vm._data.xxx
  proxyData(options, data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return this._data[key];
        },
        set(newValue) {
          this._data[key] = newValue;
          this.el.innerHTML = this._data[key]; // 更改模板数据的值
        },
        enumerable: true,
        configurable: true,
      });
    });
  }
}
