type TStack<T> = {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  remove: () => null
  getSize: () => number;
  getContainer: () => T | null
};

export class Stack<T> {
  private container: T[] = [];

  push = (item: T) => {
    this.container.push(item);
  };
  pop = () => {
    this.container.pop();
  };
  peak = () => {
    return this.container[this.getSize() - 1] || null;
  };
  remove = () => {
    return this.container = []
  }
  getSize = () => this.container.length;
  getContainer = () => this.container;
}
