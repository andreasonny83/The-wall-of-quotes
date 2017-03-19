import { Pipe, PipeTransform } from '@angular/core';

function isUndefined(value: any) {
  return typeof value === 'undefined';
}

function extractDeepPropertyByMapKey(obj: any, map: string): any {
  const keys = map.split('.');
  const key = keys.shift();

  return keys.reduce((prop: any, key: string) => {
    return !isUndefined(prop) && !isUndefined(prop[key])
      ? prop[key]
      : undefined;
  }, obj[key || '']);
}

function isString(value: any) {
  return typeof value === 'string';
}

@Pipe({
  name: 'orderBy',
  pure: false,
})
export class SortCardsPipe implements PipeTransform {
  public transform(input: any, config: any): any[] {
    if (!Array.isArray(input)) {
      return input;
    }

    const out = [...input];

    const [prop, asc, sign] = SortCardsPipe.extractFromConfig(config);

    return out.sort(SortCardsPipe.orderCompare.bind(this, prop, asc));
  }

  private static simpleSort(a: any, b: any) {
    return isString(a) && isString(b)
      ? a.toLowerCase().localeCompare(b.toLowerCase())
      : a - b;
  }

  private static orderCompare(prop: string, asc: boolean, a: any, b: any) {
    const first = extractDeepPropertyByMapKey(a, prop);
    const second = extractDeepPropertyByMapKey(b, prop);

    if (first === second) {
      return 0;
    }

    if (isString(first) && isString(second)) {
      const pos = first.toLowerCase().localeCompare(second.toLowerCase());
      return asc ? pos : -pos;
    }

    return asc
      ? first - second
      : second - first;
  }

  private static extractFromConfig(config: any) {
    const sign = config.substr(0, 1);
    const prop = config.replace(/^[-+]/, '');
    const asc = sign !== '-';

    return [prop, asc, sign];
  }
}
