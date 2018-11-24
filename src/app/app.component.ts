import {Component, OnInit} from '@angular/core';
import {ChartOption} from './configurable-charts/lib/models/chart-options';
import {booleanOpt, colorOpt, stringOpt} from './configurable-charts/lib/chart-option-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'charts-test';
  data = generateData(100);

  public graph = {
    data: [
      {
        x: [1, 2, 3],
        y: [2, 6, 3],
        type: 'scatter',
        mode: 'lines+points',
        marker: {color: 'red'}
      },
      {
        x: [1, 2, 3],
        y: [2, 5, 3],
        type: 'bar'
      },
    ],
    layout: {autosize: true, title: 'A Fancy Plot'}
  };

  ngOnInit(): void {
    console.log('generated data', this.data);
  }

}

function generateData(count: number) {
  const result = [];
  const start = new Date().getTime();
  for (let i = 0; i < count; i++) {
    result.push({
      info: {
        time: new Date(start + 1000 * i).toISOString(),
        count: Math.round(Math.random() * 100),
        factor: Math.random() * 10,
        state: Math.random() > 0.5
      },
      category: Math.random() > 0.5 ? 'a' : 'b'
    });
  }
  return result;
}
