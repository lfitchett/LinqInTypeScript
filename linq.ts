export class LinqIterable<T> implements Iterable<T>{
    constructor(private iterator: () => Iterator<T>) { }

    // public static FromArray<T>(array: T[]): LinqIterable<T> {
    //     return new LinqIterable(array[Symbol.iterator]);
    // }

    public static FromIterable<T>(array: Iterable<T>): LinqIterable<T> {
        return new LinqIterable<T>(function* () {
            for (let o of array) {
                yield o;
            }
        });
    }

    public static Range(end: number): LinqIterable<number>;
    public static Range(start: number, end: number): LinqIterable<number>;
    public static Range(startend: number, end?: number): LinqIterable<number> {
        let start = 0;
        if (end == undefined) {
            end = startend;
        } else {
            start = startend;
            end++;
        }

        return new LinqIterable<number>(function* () {
            for (let i = start; i < end; i++) {
                yield i;
            }
        });
    }

    [Symbol.iterator]() {
        return this.iterator();
    }

    public map<U>(f: (o: T) => U): LinqIterable<U> {
        let self = this;
        return new LinqIterable<U>(function* () {
            for (let o of self) {
                yield f(o);
            }
        });
    }

    public filter(f: (o: T) => boolean): LinqIterable<T> {
        let self = this;
        return new LinqIterable<T>(function* () {
            for (let o of self) {
                if (f(o)) {
                    yield o;
                }
            }
        });
    }

    public reduce(f: (prev: T, next: T) => T): T {
        let iter: Iterator<T> = this.iterator();
        let current: IteratorResult<T> = iter.next();
        let result: T = current.value;

        current = iter.next();
        while (!current.done) {
            result = f(result, current.value);
            current = iter.next();
        }

        return result;
    }

    public count(f?: (o: T) => boolean): number {
        let i = 0;

        if (f == undefined) {
            for (let o of this) {
                i++;
            }
        } else {
            for (let o of this) {
                if (f(o)) {
                    i++;
                }
            }
        }

        return i;
    }

    public ToString(): String {
        return this.map(o => `${o}`).reduce((prev, next) => `${prev}, ${next}`);
    }

}