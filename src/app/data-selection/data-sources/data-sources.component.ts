import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-sources',
  templateUrl: './data-sources.component.html',
  styleUrls: ['./data-sources.component.scss']
})
export class DataSourcesComponent implements OnInit {

  dataSources = [
    {
      type: 'db',
      name: 'Database',
      transform: null,
      properties: {
        url: '',
        query: {}
      }
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
