import {test, expect} from 'vitest';
import { LRU } from './lru.js';

test('LRU', () => {
    const lru = new LRU(3);
    lru.insert('a', 1);
    lru.insert('b', 2);
    lru.insert('c', 3);
    lru.insert('d', 4);
    expect(lru.get('a')).toBe(undefined);
    expect(lru.oldest_item === 'b').toBe(true);
    expect(lru.get('b')).toBe(2);
    expect(lru.oldest_item === 'c').toBe(true);
    expect(lru.get('c')).toBe(3);
    expect(lru.get('d')).toBe(4);
    lru.insert('e', 5);
    expect(lru.get('b')).toBe(undefined);
});
