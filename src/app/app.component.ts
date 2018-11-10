import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'charts-test';
  data = generateData(10000);

  ngOnInit(): void {
  }

}

function generateData(count: number) {
  const result = [];
  const start = new Date().getTime();
  for (let i = 0; i < count; i++) {
    result.push({
      time: new Date(start + 1000 * i).toISOString(),
      count: Math.round(Math.random() * 100),
      factor: Math.random() * 10,
      state: Math.random() > 0.5
    });
  }
  return result;
}
