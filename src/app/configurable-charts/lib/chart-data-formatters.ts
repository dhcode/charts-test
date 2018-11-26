import { PathInfo, PathType } from './models/path-info';
import { ChartDataFormatter, OutputFormat, OutputFormatOptions } from './models/data-formatter';
import { format as numberFormat } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { AxisConfig } from './models/chart-config';


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

  getOutputTickOptions(options?: OutputFormatOptions): any {
    return commonOutputTickOptions(options);
  }

}

export class DatetimeDataFormatter implements ChartDataFormatter {
  format: OutputFormat = 'datetime';
  label = 'Datetime';

  getDefaultFormatOptions(values: any[]): OutputFormatOptions {
    return {
      prefix: '',
      suffix: '',
      format: ''
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
    return timeFormat(this.getOutputTickOptions(options).tickformat || '%c')(value);
  }

  getOutputTickOptions(options?: OutputFormatOptions): any {
    return {
      ...commonOutputTickOptions(options),
      tickformat: options.format
    };
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
      format: !values.length || hasDecimals ? ',.2f' : ',d',
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
    return numberFormat(this.getOutputTickOptions(options).tickformat)(value);
  }

  getOutputTickOptions(options?: OutputFormatOptions): any {
    return {
      ...commonOutputTickOptions(options),
      tickformat: options.format
    };
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

  getOutputTickOptions(options?: OutputFormatOptions): any {
    return {
      ...commonOutputTickOptions(options),
      tickmode: 'array',
      tickvals: [false, true],
      tick0: false,
      ticktext: [options.falseLabel, options.trueLabel]
    };
  }

}

function commonOutput(value: any, options: OutputFormatOptions): string {
  if (!options) {
    return value;
  }
  return (options.prefix || '') + value + (options.suffix || '');
}

function commonOutputTickOptions(options: OutputFormatOptions): any {
  return {
    tickprefix: options.prefix || '',
    ticksuffix: options.suffix || ''
  };
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

export function getFormatter(axis: AxisConfig): ChartDataFormatter {
  return outputFormatters.find(f => f.format === axis.format);
}
