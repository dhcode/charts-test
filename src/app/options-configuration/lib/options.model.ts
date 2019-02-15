export type OptionType = 'int' | 'string' | 'decimal' | 'boolean' | 'color';

export interface OptionValues {
  [key: string]: any;
}

export interface OptionDefinition {
  /**
   * Technical name of the option
   */
  name: string;
  /**
   * Label that describes the option
   */
  label: string;
  /**
   * Hint that describes more details
   */
  hint?: string;
  /**
   * The type decided how the options input is presented
   */
  type: OptionType;
  /**
   * If there are only some values to select from
   */
  selectionValues?: any[] | SelectionValue[];
  /**
   * The default value
   */
  defaultValue: any;
}

export interface SelectionValue {
  value: any;
  label: string;
}
