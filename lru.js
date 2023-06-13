export class LRU {
    constructor(size) {
        this.size = size;
        this.cache = new Map();
    }

    insert (key, value) {
        // update its access if it exists
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        else if (this.cache.size == this.size) {
            // delete least recently used (first elem)
            this.cache.delete(this.oldest_item);
        }
        this.cache.set(key, value);
    }

    get (key) {
        // look for value and update its access
        if (this.cache.has(key)) {
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
    }

    get oldest_item () {
        return this.cache.keys().next().value;  // keys() returns an iterator, so we need to call next() to get the first value
    }

}