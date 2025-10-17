import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { IPERMISOS, RoleType } from '../../../auth/interfaces/auth_responser.interface';
import { AuthService } from '../../../auth/services/auth.service';

const NZ_MODULES = [NzIconModule, NzLayoutModule, NzMenuModule, NzAvatarModule, NzDropDownModule, NzModalModule];

@Component({
  selector: 'app-main-layout',
  imports: [NZ_MODULES, RouterLink, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  isCollapsed: boolean = false;

  RoleType: typeof RoleType = RoleType;
  PERMISOS: typeof IPERMISOS = IPERMISOS;

  constructor(
    public authService: AuthService,
    private modal: NzModalService,
    private router: Router,
  ) {}

  // Obtener iniciales del usuario para el avatar
  getUserInitials(): string {
    const user = this.authService._user();
    if (!user?.email) return 'U';
    return user.email.substring(0, 2).toUpperCase();
  }

  // Ir al perfil
  goToProfile(): void {
    this.router.navigate(['/admin/profile']);
  }

  // Confirmar logout
  confirmLogout(): void {
    this.modal.confirm({
      nzTitle: '¿Cerrar sesión?',
      nzContent: '¿Estás seguro que deseas cerrar sesión?',
      nzOkText: 'Sí, cerrar sesión',
      nzOkDanger: true,
      nzCancelText: 'Cancelar',
      nzOnOk: () => this.logout(),
    });
  }

  // Cerrar sesión
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
