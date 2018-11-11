import { PathType } from './path-info';

export type OutputFormat = 'string' | 'datetime' | 'number' | 'boolean' | 'coordinate';

export interface OutputFormatOptions {
  [key: string]: any;
}

export interface ChartDataFormatter {
  /**
   * Identifier of the format
   */
  format: OutputFormat;

  /**
   * The label is used to represent the format to the user
   */
  label: string;

  /**
   * Returns null if this format can't be used with the type of the path.
   * Otherwise returns a priority number. Higher is more suitable.
   */
  getInputTypePriority(type: PathType, values: any[]): number | null;

  /**
   * Generates the default format options for the given PathInfo
   */
  getDefaultFormatOptions(values: any[]): OutputFormatOptions;

  /**
   * Converts the value to the internal usable value
   */
  toInternalValue(value: any, options?: OutputFormatOptions): any;

  /**
   * Converts the internal value to the output value
   */
  toOutputValue(value: any, options?: OutputFormatOptions): string;

  /**
   * Gets the output Tick options for Plotly
   */
  getOutputTickOptions(options?: OutputFormatOptions): any;
}
