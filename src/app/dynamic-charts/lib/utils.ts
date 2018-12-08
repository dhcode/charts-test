export function assignWithDefaults(target: any, source: any, converters: { [key: string]: (source: any) => any } = {}): any {
  const keys = Object.keys(target);
  for (const key of keys) {
    if (source && source.hasOwnProperty(key)) {
      const expectedType = typeof target[key];
      let value = source[key];
      if (key in converters) {
        value = converters[key](value);
      }
      const actualType = typeof value;
      if (target[key] !== null && actualType === expectedType) {
        target[key] = source[key];
      } else if (target[key] !== null) {
        console.warn(`Could not assign key ${key}. Actual: ${actualType} Expected: ${expectedType}`);
      }
    }
  }
  return target;
}

export function assignNotNull(target: any, source: any): any {
  const keys = Object.keys(source);
  for (const key of keys) {
    const value = source[key];
    if (value !== null && value !== undefined) {
      target[key] = value;
    }
  }
  return target;
}
