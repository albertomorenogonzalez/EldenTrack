import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Boss } from '../../models/boss.model';
import { BossService } from '../../services';
import { LocaleService } from '../../services/localeService';

@Component({
  selector: 'app-boss',
  templateUrl: './boss.component.html',
  styleUrls: ['./boss.component.scss'],
})
export class BossComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() boss!: Boss;

  constructor(
    private data: BossService,
    public locale:LocaleService
  ) { }

  ngOnInit() {}

  onEditClick(){
    this.onEdit.emit(this.boss);
  }

  onDeleteClick(){
    this.onDelete.emit(this.boss);
  }

}
