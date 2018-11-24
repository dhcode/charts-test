import { ChartOptionType} from './models/chart-options';
import { ChartOption, SelectionValue } from './models/chart-options';

export function stringOpt(name: string, label: string, defaultValue?: string, values?: string[] | SelectionValue[]): ChartOption {
  return generateOpt('string', name, label, defaultValue, values);
}

export function booleanOpt(name: string, label: string, defaultValue?: boolean, values?: string[] | SelectionValue[]): ChartOption {
  return generateOpt('boolean', name, label, defaultValue, values);
}

export function decimalOpt(name: string, label: string, defaultValue?: number, values?: number[] | SelectionValue[]): ChartOption {
  return generateOpt('decimal', name, label, defaultValue, values);
}

export function integerOpt(name: string, label: string, defaultValue?: number, values?: number[] | SelectionValue[]): ChartOption {
  return generateOpt('int', name, label, defaultValue, values);
}


export function colorOpt(name: string, label: string, defaultValue?: string, values?: string[] | SelectionValue[]): ChartOption {
  return generateOpt('color', name, label, defaultValue, values);
}

export function generateOpt(type: ChartOptionType, name: string, label: string,
                            defaultValue?: any, values?: any[] | SelectionValue[]): ChartOption {
  return {
    type: type,
    name: name,
    label: label,
    defaultValue: defaultValue,
    selectionValues: values
  };
}

export function createDefaultOptions(optionsDef: ChartOption[]): { [name: string]: any } {
  const opt = {};
  for (const o of optionsDef) {
    opt[o.name] = o.defaultValue;
  }
  return opt;
}
