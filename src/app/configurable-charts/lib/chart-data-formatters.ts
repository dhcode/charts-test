import { PathInfo, PathType } from './models/path-info';
import { ChartDataFormatter, OutputFormat, OutputFormatOptions } from './models/data-formatter';
import { ColumnConfig } from './models/chart-config';


export class StringDataFormatter implements ChartDataFormatter {
  format: OutputFormat = 'string';
  label = 'String';

  getDefaultFormatOptions(values: any[]): OutputFormatOptions {
    return {
      prefix: '',
      suffix: ''
    };
  }

  getInputTypePriority(type: PathType, values: any[] = []): number | null {
    return 1;
  }

  toInternalValue(value: any, options?: OutputFormatOptions): string {
    const type = typeof(value);
    if (type === 'symbol') {
      return value.toString();
    }
    if (type === 'function') {
      return value.name;
    }
    if (type === 'object' && value === null) {
      return null;
    }
    return String(value);
  }

  toOutputValue(value: any, options?: OutputFormatOptions): string {
    return commonOutput(value, options);
  }

}

export class DatetimeDataFormatter implements ChartDataFormatter {
  format: OutputFormat = 'datetime';
  label = 'Datetime';

  getDefaultFormatOptions(values: any[]): OutputFormatOptions {
    return {
      format: 'medium',
      prefix: '',
      suffix: ''
    };
  }

  getInputTypePriority(type: PathType, values: any[] = []): number | null {
    const dateMatcher = /^\d{4}-\d\d-\d\d(T\d\d:\d\d:\d\d)?/;
    if (type === 'string' && values.some(v => !!String(v).match(dateMatcher))) {
      return 10;
    }
    if (type === 'number') {
      return 1;
    }
    return null;
  }

  toInternalValue(value: any, options?: OutputFormatOptions): Date | null {
    const type = typeof(value);
    if (type === 'string' || type === 'number') {
      return new Date(value);
    }
    return null;
  }

  toOutputValue(value: Date | null, options?: OutputFormatOptions): string {
    return commonOutput(value && value.toLocaleString(), options);
  }

}

export class NumberDataFormatter implements ChartDataFormatter {
  format: OutputFormat = 'number';
  label = 'Number';

  getDefaultFormatOptions(values: any[]): OutputFormatOptions {
    const hasDecimals = values
      .map(v => this.toInternalValue(v))
      .filter(v => v !== null)
      .some(v => v % 1 !== 0);
    return {
      prefix: '',
      suffix: '',
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: hasDecimals ? 2 : 0,
      minimumIntegerDigits: 1
    };
  }

  getInputTypePriority(type: PathType, values: any[] = []): number | null {
    if (type === 'number' && values.some(v => typeof v === 'number')) {
      return 10;
    }
    if (type === 'number' || type === 'string' && values.some(v => !isNaN(v))) {
      return 2;
    }
    return null;
  }

  toInternalValue(value: any, options?: OutputFormatOptions): number {
    const type = typeof(value);
    if (type === 'string') {
      return parseFloat(value);
    }
    if (type === 'number') {
      return value;
    }
    return null;
  }

  toOutputValue(value: number | null, options?: OutputFormatOptions): string {
    if (!options) {
      options = this.getDefaultFormatOptions([value]);
    }
    const opt = {
      useGrouping: options.useGrouping,
      minimumFractionDigits: options.minimumFractionDigits,
      maximumFractionDigits: options.maximumFractionDigits,
      minimumIntegerDigits: options.minimumIntegerDigits,
    };
    return commonOutput(value !== null ? value.toLocaleString(undefined, opt) : null, options);
  }

}

export class BooleanDataFormatter implements ChartDataFormatter {
  format: OutputFormat = 'boolean';
  label = 'Boolean';

  getDefaultFormatOptions(values: any[]): OutputFormatOptions {
    return {
      prefix: '',
      suffix: '',
      trueLabel: 'True',
      falseLabel: 'False'
    };
  }

  getInputTypePriority(type: PathType, values: any[] = []): number | null {
    if (type === 'boolean') {
      return 10;
    }
    return 1;
  }

  toInternalValue(value: any, options?: OutputFormatOptions): boolean {
    const type = typeof(value);
    if (type === 'boolean') {
      return value;
    }
    return !!value;
  }

  toOutputValue(value: boolean, options?: OutputFormatOptions): string {
    if (!options) {
      options = this.getDefaultFormatOptions(null);
    }
    return commonOutput(value ? options.trueLabel : options.falseLabel, options);
  }

}

function commonOutput(value: any, options: OutputFormatOptions): string {
  if (!options) {
    return value;
  }
  return (options.prefix || '') + value + (options.suffix || '');
}

export function getPrimaryDataType(pathInfo: PathInfo): PathType {
  let type: PathType = pathInfo.types[0];
  pathInfo.types.forEach(t => {
    if (t !== 'null') {
      type = t;
    }
  });
  return type;
}

export const outputFormatters: ChartDataFormatter[] = [
  new StringDataFormatter(),
  new DatetimeDataFormatter(),
  new NumberDataFormatter(),
  new BooleanDataFormatter()
];

export function getFormatter(column: ColumnConfig): ChartDataFormatter {
  return outputFormatters.find(f => f.format === column.format);
}
