import { isPathAbsolute } from "../lib/index.js";

describe ('isPathAbsolute', () => {
  it('Debería ser una función', () => {
    expect(typeof isPathAbsolute).toBe('function');
  });
});