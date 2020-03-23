import { checkProperties } from '../helpers';

describe('Helpers', () => {
  test('checkProperties', () => {
    expect(() => {
      checkProperties();
    }).not.toThrow();
    expect(() => {
      checkProperties(['a', 'b', 'c']);
    }).toThrow(`error.missing.property.a`);
    expect(() => {
      checkProperties(['a', 'b', 'c'], { a: 'a', b: 'b' });
    }).toThrow(`error.missing.property.c`);
    expect(() => {
      checkProperties(['a', 'b', 'c'], { a: 'a', b: 'b', c: 'c' });
    }).not.toThrow();
  });
});
