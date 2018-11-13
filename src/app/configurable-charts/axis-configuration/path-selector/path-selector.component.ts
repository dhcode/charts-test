import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PathInfo } from '../../lib/models/path-info';

@Component({
  selector: 'app-path-selector',
  templateUrl: './path-selector.component.html',
  styleUrls: ['./path-selector.component.scss']
})
export class PathSelectorComponent implements OnInit {

  @Input() paths: PathInfo[];

  @Output() selected = new EventEmitter<PathInfo>();


  constructor() {
  }

  ngOnInit() {
  }

  select(pathInfo: PathInfo) {
    this.selected.next(pathInfo);
  }

}
