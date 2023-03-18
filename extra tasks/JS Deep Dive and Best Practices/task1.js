class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class List {
  constructor(root) {
    this.root = root;
    this.length = 1;
  }

  addNode(value, i) {
    if (i < 0 || i >= this.length) {
      return false;
    }
    const node = new Node(value);

    if (i === undefined) {
      let current = this.root;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    } else {
      let current = this.root;
      let prev = null;
      let index = -1;

      while (index < i) {
        prev = current;
        current = current.next;
        index++;
      }

      prev.next = node;
      node.next = current;
    }

    this.length++;
    return true;
  }

  removeNode(i) {
    if (i < 0 || i >= this.length || this.length === 1) {
      return false;
    }

    let current = this.root;
    let prev = null;

    if (i === undefined) {
      while (current.next) {
        prev = current;
        current = current.next;
      }

      prev.next = null;
      this.length--;
    } else {
      let index = 0;

      while (index < i) {
        prev = current;
        current = current.next;
        index++;
      }

      prev.next = current.next;
      this.length--;
    }

    return true;
  }

  print() {
    const valuesList = [];
    let current = this.root;

    while (current) {
      valuesList.push(current.value);
      current = current.next;
    }

    console.log(valuesList.join(','));
  }
}

const list = new List(new Node(0));

list.addNode(1);
list.addNode(2);
list.addNode(3);
list.addNode(4, 1);
list.removeNode(1);
list.print();
