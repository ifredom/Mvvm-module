class Compiler {
  constructor(vm, newValue, key) {
    vm._data[key] = newValue;
    vm.el.innerHTML = vm._data[key];
  }
}
