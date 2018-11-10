import { PathInfo, PathType } from './models/path-info';

const basicTypeOfTypes = ['string', 'number', 'boolean', 'bigint', 'function', 'symbol'];

interface ScanContext {
  path: string[];
  infoList: PathInfo[];
  infoMap: { [pathId: string]: PathInfo };
}

export function identifyPathsInArray(data: any[]): PathInfo[] {
  const ctx: ScanContext = {path: [], infoList: [], infoMap: {}};
  if (!data || !data.length) {
    return [];
  }
  data.forEach(entry => identifyObject(entry, ctx));
  return ctx.infoList;
}

export function identifyPaths(data: any): PathInfo[] {
  const ctx: ScanContext = {path: [], infoList: [], infoMap: {}};
  identifyObject(data, ctx);
  return ctx.infoList;
}

function identifyObject(obj: any, ctx: ScanContext) {
  const type = typeof(obj);
  const pathId = ctx.path.join('.');
  if (type === 'undefined') {
    return;
  }
  if (basicTypeOfTypes.includes(type)) {
    return addToContext(pathId, type, obj, ctx);
  }
  if (type === 'object' && obj === null) {
    return addToContext(pathId, 'null', obj, ctx);
  } else if (type === 'object' && Array.isArray(obj)) {
    const currentPath = ctx.path;
    for (let i = 0; i < obj.length; i++) {
      ctx.path = [...currentPath, '[]'];
      identifyObject(obj[i], ctx);
    }
    ctx.path = currentPath;
  } else if (type === 'object') {
    const keys = Object.keys(obj);
    const currentPath = ctx.path;
    for (const key of keys) {
      ctx.path = [...currentPath, key];
      identifyObject(obj[key], ctx);
    }
    ctx.path = currentPath;
    return;
  }
}

function addToContext(pathId: string, type: PathType, value: any, ctx: ScanContext) {
  let pathInfo: PathInfo;
  if (ctx.infoMap.hasOwnProperty(pathId)) {
    pathInfo = ctx.infoMap[pathId];
  } else {
    pathInfo = {path: pathId, types: [], values: []};
    ctx.infoMap[pathId] = pathInfo;
    ctx.infoList.push(pathInfo);
  }
  if (!pathInfo.types.includes(type)) {
    pathInfo.types.push(type);
  }
  if (type !== 'array' && type !== 'object' && !pathInfo.values.includes(value) && pathInfo.values.length < 10) {
    pathInfo.values.push(value);
  }
}
