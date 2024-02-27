import { isThisTypeNode } from "typescript";

export class Node<T> {
  data: T;
  next: Node<T> | null;

  constructor(data: T, next: Node<T> | null = null) {
    this.data = data;
    this.next = next === undefined ? null : next;
  }
}
type TLinkedList<T> = {
    getHead: () => Node<T> | null;
    getTail: () => Node<T> | null;
    getSize: () => number;
    getList: () => T[];
    getIt: (targetIndex: number) => T | undefined;
    append: (element: T, targetIndex: number) => void;
    checkIndex: (targetIndex: number) => number;
    delete: (targetIndex: number) => void;
    clearAll : () => void;
};

export class SinglyLinkedList<T> implements TLinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;

    constructor(arr: Node<T>[] | null = null) {
        if(Array.isArray(arr) && arr.length > 0) {
            this.head = arr[0]
            let node = this.head;
            for (let i = 1; i < arr.length; i++) {  
                if(arr[i] !== undefined) {
                    node.next = arr[i];
                    node = node.next 
                }  
            }
            this.tail = node
            this.size = arr.length
        } else {
            this.head = null
            this.tail = null
            this.size = 0;
        }
    }
    getHead() {
        return this.head
    }
    getTail() {
        return this.tail
    }
    getSize() {
        return this.size
    }
    getList() {
        if (this.head === null) {
          return [];
        }
        let current: Node<T> | null = this.head;
        let result = [];
    
        while (current !== null) {
          result.push(current.data);
          current = current.next;
        //   console.log(true)
        }
        return result;
    }

    getIt(targetIndex: number) {
        if (this.head == null) {
            throw new Error('список пуст');
        } else {
            let checkingIndex = this.checkIndex(targetIndex);
            let target = this.head;
            let index = 0;

            while (index < checkingIndex && target && target.next) {
                    target = target.next
                    index++
            }
            return target.data;
        }
    }

    append(element: T, targetIndex: number = 0) {
        const node = new Node(element);
        
        if (this.head === null) {
            this.head = node;
            this.tail = node;
            this.size++;
        } else {
            let checkingIndex = this.checkIndex(targetIndex);
            let target = this.head;
            let previous: Node<T> | null = null;
            let index = 0;
    
            while (index < checkingIndex && target.next !== null) {
                previous = target;
                target = target.next;
                index++;
            }
    
            if (index === checkingIndex) {
                if (checkingIndex === 0) {
                    node.next = target;
                    this.head = node;
                    if (target === this.tail) {
                        this.tail = target;
                    }
                } else {
                    node.next = target;
                    if (previous) {
                        previous.next = node;
                    }
                }
                this.size++;
            } else if (target === this.tail) {
                this.tail.next = node;
                this.tail = node;
                this.size++;
            }
        }
    }   
    delete(targetIndex: number) {
        
        if (targetIndex < 0 || this.head === null) {
            return;
        }
        if (targetIndex === 0) {      
            if(!this.head && this.tail) {
                this.head = this.tail
                this.size--;    
                return;
            }
            // if (!this.head && this.tail) {
            //     this.tail = null;
            //     console.log(false)
            // }
            this.head = this.head.next;
            this.size--;
            return;
        }
        let checkingIndex = this.checkIndex(targetIndex);
        let target: Node<T> | null = this.head;
        let previous: Node<T> | null = null;
        let index = 0;
    
        while (target !== null && index < checkingIndex && target.next !== null) {
            previous = target;
            target = target.next;
            index++;
        }
        if (target !== null && previous) {
            previous.next = target.next;
            if (target === this.tail) {
                this.tail = previous;
            }
            this.size--;
        }
    }

    clearAll() {
        let current = this.head;
        let next = null;
        this.size = 0

        while (current !== null) {
          next = current.next;
          current = null;
          current = next;
        }
    }
    checkIndex(targetIndex: number): number {
        return targetIndex < 0 ? 0 : targetIndex >= this.getSize() ? this.getSize() : targetIndex
    }
}