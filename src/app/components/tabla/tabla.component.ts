import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Equipo } from 'src/app/interfaces/equipo';
import { TravelsService } from '../../services/travels.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent implements OnInit {
  equiposMap = {
    '1': 'A Reparar',
    '2': 'A Reparar',
    '3': 'A Reparar',
    '4': 'A Reparar',
    '5': 'Reparado',
    '6': 'Reparado',
    '7': 'Reparado',
    '8': 'Reparado',
    '9': 'Reparado',
    '10': 'A Reparar',
  };
  viajesMap = {
    '1': 'Pendiente',
    '2': 'Pendiente',
    '3': 'En Curso',
    '4': 'Pendiente',
    '5': 'En Curso',
    '6': 'Pendiente',
    '7': 'Pendiente',
    '8': 'En Curso',
    '9': 'Entregado',
    '10': 'Pendiente',
  };

  dataSource: MatTableDataSource<Equipo>;
  equipos: Equipo[] = [];
  userid = JSON.parse(localStorage.getItem('userID')!);
  
  constructor(private viajes: TravelsService) {
    this.viajes.estado(this.userid).subscribe((resp) => {
      this.equipos = resp.reverse();
      this.dataSource = new MatTableDataSource(this.equipos);
    });
    this.dataSource = new MatTableDataSource(this.equipos);
  }
  @Input() displayedColumns: string[] = [];

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {}
}
