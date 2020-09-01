class Compile {
  constructor(el, vm, newValue, key) {
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
      this.$fragment = this.node2Fragment(this.$el);
      this.init();
      this.$el.appendChild(this.$fragment);
    }
  }
  init() {
    this.compileElement(this.$fragment);
  }

  node2Fragment(el) {
    var fragment = document.createDocumentFragment();
    var child;
    // 将原生节点拷贝到fragment
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    return fragment;
  }

  compileElement(el) {
    this.compileUtil = new CompileUtil();
    var childNodes = el.childNodes;
    var self = this;

    var copyChildNodes = [].slice.call(childNodes);

    copyChildNodes.forEach((node) => {
      var text = node.textContent;
      var reg = /\{\{(.*)\}\}/;

      if (this.isElementNode(node)) {
        this.compile(node);
      } else if (this.isTextNode(node) && reg.test(text)) {
        this.compileText(node, RegExp.$1.trim());
      }

      if (node.childNodes && node.childNodes.length) {
        this.compileElement(node);
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

      if (this.isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);

        if (this.isEventDirective(dir)) {
          this.compileUtil.eventHandle(node, this.$vm, exp, dir);
        } else {
          this.compileUtil[dir] && this.compileUtil[dir](node, exp);
        }
      }
    });
  }
  compileText(node, exp) {
    this.compileUtil.text(node, this.$vm, exp);
  }

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
  // 是否是事件的指令，v-on:这样的形式
  isEventDirective(attr) {
    return attr.indexOf("on") == 0;
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

class CompileUtil {
  eventHandle(node, vm, exp, dir) {
    var eventType = dir.split(":")[1];
    var fn = vm.$options.methods && vm.$options.methods[exp];
    if (eventType && fn) {
      node.addEventListener(exp, fn.bind(vm), false);
    }
  }
  bind(node, vm, exp, dir) {
    console.log("bind fn=>", dir);
  }
  text(node, vm, exp) {
    this.bind(node, vm, exp, "text");
  }
  html(node, vm, exp) {
    this.bind(node, vm, exp, "html");
  }
  model(node, vm, exp) {
    this.bind(node, vm, exp, "model");
  }
  class(node, vm, exp) {
    this.bind(node, vm, exp, "class");
  }
}
