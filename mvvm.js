class Mvvm {
  constructor(options) {
    this.el = document.querySelector(options.el);
    this.$options = options || {};
    var data = (this._data = this.$options.data);
    new Observer(this, options.data);

    this._compile = new Compile(options.el, this);
  }
}
