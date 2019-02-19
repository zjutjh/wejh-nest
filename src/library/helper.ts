import * as config from 'config';
import { map } from 'rxjs/operators';

export function now() {
  return Math.ceil(new Date().getTime() / 1000);
}

export const safeNumber = (n, i = 0) => {
  return Math.ceil(Math.max(Math.abs(n), i));
};

/**
 * @param length
 * @param chars
 */
export function randomString(length: number, chars: string = ''): string {
  if (chars.length === 0) {
    chars = '012345678abcdefghiklmnopqrstuvwxyz';
  }
  const s = chars.split('');
  if (!length) {
    length = Math.floor(Math.random() * s.length);
  }
  let str = '';
  for (let i = 0; i < length; i++) {
    str += s[Math.floor(Math.random() * s.length)];
  }
  return str;
}

export function formatList(nodes, total, offset, limit) {
  nodes = nodes || [];
  total = total || 0;
  const current = limit === 0 ? 1 : Math.floor(offset / limit) + 1;
  return {
    nodes,
    cursor: offset,
    limit,
    totalCount: total,
    pageInfo: {
      hasNextPage: offset + nodes.length > total,
      hasPreviousPage: offset - limit > 0,
      startCursor: '0',
      endCursor: total.toString(),
      current,
    },
  };
}

export function extractColumn<T>(arr: T[], column: keyof T) {
  if (!Array.isArray(arr)) {
    return [];
  }
  const r = [];
  arr.forEach(x => {
    if (x[column] !== undefined) {
      r.push(x[column]);
    }
  });
  return r;
}

export function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length;
  let temporaryValue: T = null,
    randomIndex = 0;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function range(start = 0, length = 1, step = 1): number[] {
  const stop = start + length;
  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  const result = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

export function getApiUrl(key: string, isExt?: boolean) {
  const configs = config.get<Map<string, any>>('api');
  if (!isExt) {
    isExt = process.env.API_EXT === 'true';
  }
  const route = configs.get(key);
  if (!route) {
    return false;
  }
  const compatible = process.env.API_COMPATIBLE === 'true';
  if (Array.isArray(route)) {
    if (compatible) {
      return configs.get('compatibleURL') + encodeURI(route.api);
    }
    return isExt ? route.ext : route.api;
  }
  let url: string = '';
  if (isExt) {
    url = configs.get('prefix').ext + route;
  } else {
    url = config.get('prefix').api + route;
  }
  if (compatible) {
    url = config.get('compatibleURL') + encodeURI(config.prefix.api + route);
  }
  return url;
}
