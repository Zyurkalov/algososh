type TQueue<T> = {
  enqueue: (item: T) => void;
  dequeue: () => void;
  isHeader: () => void;
  isTail: () => void;
  remove: () => void;
  isEmpty: () => boolean;
  getContainer: () => (T | null)[]
};

export class Queue<T> implements TQueue<T>{
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Превышена максимальная длина очереди");
    }
    this.container[this.tail] = item;
    this.tail = (this.tail + 1) % this.size;
    this.length++;
  };
  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("Очередь пуста");
    }
    this.container[this.head] = null;
    this.head = (this.head + 1) % this.size;
    this.length--;
  };
  isHeader = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("Очередь пуста");
    }
    return this.container[this.head];
  };
  isTail = (): T | null => {
    if (this.isEmpty()) {
        throw new Error("Очередь пуста");
      }
    return this.container[(this.tail + this.size - 1) % this.size]; 
  }
  remove = () => { 
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array(this.size);
  }
  interrupt = () => {
    return this.length >= this.size
  }
  isEmpty = () => this.length === 0;
  getContainer = () => this.container;
}
