
export class Node<T> {
  value: T;
  next: Node<T> | null;
  prev: Node<T> | null;

  constructor(value: T, next: Node<T> | null = null) {
    this.value = value;
    this.next = next === undefined ? null : next;
    this.prev = next === undefined ? null : next;
  }
}
type THeadOrTail = "head" | "tail";
type TLinkedList<T> = {
  append: (element: T, targetIndex: number | THeadOrTail) => void;
  returnIt: (targetIndex: number) => T | undefined;
  deleteIt: (targetIndex: number) => void;
  deleteAll: () => void;
  getSize: () => number;
};
class LinkedList<T> implements TLinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  append(element: T, targetIndex: number | THeadOrTail = 0) {
    const node = new Node(element);
    let current;
    let index = 0;

    if (this.head === null) {
      this.head = node;
      this.size++;
      return;
    }
    if (this.tail === null) {
      this.tail = node;
      this.tail.prev = this.head;
      this.head.next = this.tail;
      this.size++;
      return;
    }
    if (targetIndex === "head" || targetIndex === 0) {
      current = this.head;
      this.head = node;
      this.head.next = current;
      current.prev = this.head;
      this.size++;
      return;
    }
    if (targetIndex === "tail") {
      current = this.tail;
      this.tail = node;
      this.tail.prev = current;
      current.next = this.tail;
      this.size++;
      return;
    }
    current = this.head;
    while (current.next && index < targetIndex) {
      index++;
      current = current.next;
    }
    node.prev = current.prev;
    node.next = current;
    current.prev = node;
    this.size++;
  }
  deleteIt(targetIndex: number) {
    let index = 0;
    let current = this.head;

    if (targetIndex === 0 && current !== null) {
      this.head = current.next;

      if (this.head !== null) {
        this.head.prev = null;
      }
      current = null;
      this.size--;
      return;
    }
    while (current !== null && index < targetIndex) {
      current = current.next;
      index++;
    }
    if (current !== null) {
      if (current.next !== null) {
        current.next.prev = current.prev;
      }
      if (current.prev !== null) {
        current.prev.next = current.next;
      }
      current = null;
      this.size--;
    } else {
      throw new Error("указан некороектный индекс в deleteIt()");
    }
  }
  returnIt(targetIndex: number): T | undefined {
    let current = this.head;
    let index = 0;

    if (this.head === null) {
      throw new Error("Список пуст");
    }

    if (targetIndex < 0 || targetIndex > this.getSize()) {
      throw new Error("указан некороектный индекс в returnIt()");
    }

    while (current !== null && index < targetIndex) {
      current = current.next;
      index++;
    }

    if (current === null) {
      if (this.tail) {
        return this.tail.value;
      }
      throw new Error("указанный индекс выходит за пределы списка");
    } else {
      return current.value;
    }
  }
  deleteAll() {
    let current = this.head;
    let next = null;

    while (current !== null) {
      next = current.next;
      current = null;
      current = next;
    }
  }
  getSize() {
    return this.size;
  }
}
