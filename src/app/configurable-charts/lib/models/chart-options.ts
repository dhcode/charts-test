export type ChartOptionType = 'int' | 'string' | 'decimal' | 'boolean' | 'color';

export interface ChartOptionValues {
  [key: string]: any;
}

export interface ChartOption {
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
  type: ChartOptionType;
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
