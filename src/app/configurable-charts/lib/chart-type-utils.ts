export function getValueByPath(data: any, path: string[]) {
  if (!path.length) {
    return data;
  }
  const key = path[0];
  if (data && data.hasOwnProperty(key)) {
    return getValueByPath(data[key], path.slice(1));
  }
  return undefined;
}
