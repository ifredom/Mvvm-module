class Mvvm {
  constructor(options) {
    this.el = document.querySelector(options.el);
    this._data = options.data; //
    new Observer(this, options.data);

    this._compile = new Compile(options.el, this)
  }
}
