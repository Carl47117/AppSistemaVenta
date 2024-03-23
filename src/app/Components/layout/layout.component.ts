import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Menu } from '../../Interfaces/menu';

import { MenuService } from '../../Services/menu.service';
import { UtilidadService } from '../../Reutilizable/utilidad.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  listaMenus: Menu[] = [];
  userEmail: string = '';
  rolUsuario: string = '';

  constructor(
    private router: Router,
    private _menuServicio: MenuService,
    private _utilidadService: UtilidadService
  ) {}

  ngOnInit(): void {
    const usuario = this._utilidadService.ObtenerSesionUsuario();

    if (usuario != null) {
      this.userEmail = usuario.email;
      this.rolUsuario = usuario.rolDescription;

      this._menuServicio.lista(usuario.idUser).subscribe({
        next: (data) => {
          if (data.status) this.listaMenus = data.value;
        },
        error: (e) => {},
      });
    }
  }

  cerrarSesion() {
    this._utilidadService.eliminarSesionUsuario();
    this.router.navigate(['login']);
  }
}
