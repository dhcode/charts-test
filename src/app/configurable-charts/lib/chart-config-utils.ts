import { ChartDataFormatter, OutputFormat, OutputFormatOptions } from './models/data-formatter';
import { PathInfo, PathType } from './models/path-info';
import { getPrimaryDataType, outputFormatters } from './chart-data-formatters';

interface FormatterWithPriority {
  format: OutputFormat;
  priority: number;
  formatter?: ChartDataFormatter;
}

export function getFormattersByTypes(type: PathType, values: any[]): ChartDataFormatter[] {
  const formatters: FormatterWithPriority[] = [];
  for (const formatter of outputFormatters) {
    const priority = formatter.getInputTypePriority(type, values);
    if (priority !== null) {
      formatters.push({format: formatter.format, priority: priority, formatter: formatter});
    }
  }
  formatters.sort((a, b) => b.priority - a.priority);
  return formatters.map(f => f.formatter);
}

export function getBestFormatByTypes(pathInfo: PathInfo): OutputFormat {
  const best: FormatterWithPriority = {format: 'string', priority: 0};
  for (const formatter of outputFormatters) {
    const priority = formatter.getInputTypePriority(getPrimaryDataType(pathInfo), pathInfo.values);
    if (priority !== null && priority > best.priority) {
      best.format = formatter.format;
      best.priority = priority;
    }
  }
  return best.format;
}

export function getDefaultFormatOptions(format: OutputFormat, values: any[]): OutputFormatOptions {
  return outputFormatters.find(f => f.format === format).getDefaultFormatOptions(values);
}
