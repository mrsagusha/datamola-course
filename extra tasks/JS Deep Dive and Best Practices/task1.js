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
    if (
      i < 0 ||
      i >= this.length ||
      typeof value !== 'number' ||
      typeof i !== 'number'
    ) {
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
    if (
      i < 0 ||
      i >= this.length ||
      this.length === 1 ||
      typeof i !== 'number'
    ) {
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
list.addNode(1, 0);
list.addNode('1', 1);

list.print();
