export type PathType = 'string' | 'number' | 'boolean' | 'null' | 'array' | 'object' | 'bigint' | 'function' | 'symbol';

export interface PathInfo {
  path: string;
  types: PathType[];
  values?: any[];
}

