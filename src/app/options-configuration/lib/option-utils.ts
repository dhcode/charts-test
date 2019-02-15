import { OptionType} from './options.model';
import { OptionDefinition, SelectionValue } from './options.model';

export function stringOpt(name: string, label: string, defaultValue?: string, values?: string[] | SelectionValue[]): OptionDefinition {
  return generateOpt('string', name, label, defaultValue, values);
}

export function booleanOpt(name: string, label: string, defaultValue?: boolean, values?: string[] | SelectionValue[]): OptionDefinition {
  return generateOpt('boolean', name, label, defaultValue, values);
}

export function decimalOpt(name: string, label: string, defaultValue?: number, values?: number[] | SelectionValue[]): OptionDefinition {
  return generateOpt('decimal', name, label, defaultValue, values);
}

export function integerOpt(name: string, label: string, defaultValue?: number, values?: number[] | SelectionValue[]): OptionDefinition {
  return generateOpt('int', name, label, defaultValue, values);
}


export function colorOpt(name: string, label: string, defaultValue?: string, values?: string[] | SelectionValue[]): OptionDefinition {
  return generateOpt('color', name, label, defaultValue, values);
}

export function generateOpt(type: OptionType, name: string, label: string,
                            defaultValue?: any, values?: any[] | SelectionValue[]): OptionDefinition {
  return {
    type: type,
    name: name,
    label: label,
    defaultValue: defaultValue,
    selectionValues: values
  };
}

export function createDefaultOptions(optionsDef: OptionDefinition[]): { [name: string]: any } {
  const opt = {};
  for (const o of optionsDef) {
    opt[o.name] = o.defaultValue;
  }
  return opt;
}
