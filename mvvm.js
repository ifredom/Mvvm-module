class Mvvm {
  constructor(options) {
    this.el = document.querySelector(options.el);
    this.$options = options || {};

    // 数据代理
    // 实现 vm.xxx -> vm._data.xxx
    // 实现后，当设置vm.name ="Tom"时，等同于设置vm.options.data, 同时才能触发 Observer代理options.data这个对象内部的set方法，set方法中含有发送通知方法.
    var that = this;
    var data = (this._data = this.$options.data);
    Object.keys(data).forEach(function (key) {
      that._proxyData(key);
    });
    new Observer(options.data);
    this.$compile = new Compile(options.el || document.body, this);
  }
  _proxyData(key) {
    var that = this;
    Object.defineProperty(this, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter() {
        return this._data[key];
      },
      set: function proxySetter(newVal) {
        this._data[key] = newVal;
      },
    });
  }

  $watch(key, cb, options) {
    new Watcher(this, key, cb);
  }
}
