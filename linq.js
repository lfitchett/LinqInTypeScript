"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LinqIterable {
    constructor(iterator) {
        this.iterator = iterator;
    }
    // public static FromArray<T>(array: T[]): LinqIterable<T> {
    //     return new LinqIterable(array[Symbol.iterator]);
    // }
    static FromIterable(array) {
        return new LinqIterable(function* () {
            for (let o of array) {
                yield o;
            }
        });
    }
    static Range(startend, end) {
        let start = 0;
        if (end == undefined) {
            end = startend;
        }
        else {
            start = startend;
            end++;
        }
        return new LinqIterable(function* () {
            for (let i = start; i < end; i++) {
                yield i;
            }
        });
    }
    [Symbol.iterator]() {
        return this.iterator();
    }
    map(f) {
        let self = this;
        return new LinqIterable(function* () {
            for (let o of self) {
                yield f(o);
            }
        });
    }
    filter(f) {
        let self = this;
        return new LinqIterable(function* () {
            for (let o of self) {
                if (f(o)) {
                    yield o;
                }
            }
        });
    }
    reduce(f) {
        let iter = this.iterator();
        let current = iter.next();
        let result = current.value;
        current = iter.next();
        while (!current.done) {
            result = f(result, current.value);
            current = iter.next();
        }
        return result;
    }
    count(f) {
        let i = 0;
        if (f == undefined) {
            for (let o of this) {
                i++;
            }
        }
        else {
            for (let o of this) {
                if (f(o)) {
                    i++;
                }
            }
        }
        return i;
    }
    ToString() {
        return this.map(o => `${o}`).reduce((prev, next) => `${prev}, ${next}`);
    }
}
exports.LinqIterable = LinqIterable;
//# sourceMappingURL=linq.js.map