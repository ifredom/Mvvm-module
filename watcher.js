class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.cb = cb;
    this.depIds = {};
    if (expOrFn === "function") {
      this.getter = expOrFn;
    } else {
      this.getter = this.parseGetter(expOrFn.trim());
    }

    this.value = this.get();
  }

  update() {
    this.run();
  }

  run() {
    var newVal = this.get();
    var oldVal = this.value;
    if (newVal != oldVal) {
      this.value = newVal;
      this.cb.call(this.vm, newVal, oldVal);
    }
  }
  get(){
    Dep.target = this;
    var value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  }
  addDep(dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addFollower(this);
      this.depIds[dep.id] = dep;
    }
  }

  parseGetter(exp) {
    if (/[^\w.$]/.test(exp)) return;
    var exps = exp.split(".");
    return function (obj) {
      for (var i = 0, len = exps.length; i < len; i++) {
        if (!obj) return;
        obj = obj[exps[i]];
      }
      return obj;
    };
  }
}
