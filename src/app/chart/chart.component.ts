import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit, AfterViewInit {

  @ViewChild('chartContainer') chartContainer: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  timeSeriesChart() {
    const chart = c3.generate({
      bindto: this.chartContainer.nativeElement,
      data: {
        x: 'x',
        xFormat: '%Y-%m-%dT%H:%M:%SZ',
        rows: [
          ['x', 'data2', 'data3'],
          ['2018-10-20T20:00:00Z', 120, 300],
          ['2018-10-20T20:01:00Z', 160, 240],
          ['2018-10-20T20:02:00Z', 200, 290],
          ['2018-10-20T20:03:00Z', 160, 230],
          ['2018-10-20T20:04:00Z', 130, 300],
          ['2018-10-20T20:04:30Z', 220, 320],
        ]
      },
      axis: {
        x: {
          type: 'timeseries',
          label: 'Time'
        },
        y: {
          label: 'Tests'
        }
      }
    });
  }

  gaugeChart() {
    const chart = c3.generate({
      bindto: this.chartContainer.nativeElement,
      data: {
        columns: [
          ['data', 91.4],
          ['data2', 50]
        ],
        type: 'gauge'
      },
      gauge: {}
    });
  }

  ngAfterViewInit(): void {
    this.gaugeChart();
  }


}
