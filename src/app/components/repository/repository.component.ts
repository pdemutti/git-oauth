import { Component, OnInit, Input } from '@angular/core';
import { Repository } from '../../models/repository.interface';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  @Input() repo: Repository;

  constructor() { }

  ngOnInit() {
  }

}
