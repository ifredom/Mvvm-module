class Compile {
  constructor(el, vm, newValue, key) {
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    this.compileElement(this.$el);

    // vm._data[key] = newValue;
    // this.htmlUpdate(vm, key);
  }

  compileElement(el) {
    var childNodes = el.childNodes;
    var self = this;
    console.log(childNodes);

    var copyChildNodes = [].slice.call(childNodes);
    copyChildNodes.forEach((node) => {
      var text = node.textContent;
      var reg = /\{\{(.*)\}\}/;

      if (this.isElementNode(node)) {
        this.compile(node);
      } else if (this.isTextNode(node) && reg.test(text)) {
        this.compileText(node, RegExp.$1.trim());
      }
    });
  }
  compile(node) {
    var nodeAttrs = node.attributes;
    var self = this;
    console.log(nodeAttrs);
    var copyNodeAttrs = [].slice.call(nodeAttrs);
    copyNodeAttrs.forEach((attr) => {
      var attrName = attr.name;
      console.log(attrName);
      if (this.isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);
        if (dir == "html") {
          // new Watcher();
        } else if (dir == "class") {
        }
      }
    });
  }
  compileText(node, direct) {}

  htmlUpdate(vm, key) {
    console.log(this.$vm.el);
    this.$vm.el.innerHTML = this.$vm._data[key];
  }

  classUpdate(node, value) {
    node.className = value;
  }

  // 是否是规定的指令，v-这样的形式
  isDirective(attr) {
    return attr.indexOf("v-") == 0;
  }

  // 是否是元素节点
  isElementNode(node) {
    return node.nodeType == 1;
  }
  // 是否是文本内容节点
  isTextNode(node) {
    return node.nodeType == 3;
  }
}
