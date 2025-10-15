import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { IPERMISOS } from '../auth/interfaces/auth_responser.interface';

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private authService = inject(AuthService);
  private hasCreatedView = false;

  @Input() set hasPermission(permissions: IPERMISOS | IPERMISOS[]) {
    this.checkPermission(permissions);
  }

  constructor() {
    effect(() => {
      this.authService.user;
      this.checkCurrentPermission();
    });
  }

  private currentPermissions: IPERMISOS | IPERMISOS[] = [];

  private checkPermission(permissions: IPERMISOS | IPERMISOS[]): void {
    this.currentPermissions = permissions;
    this.checkCurrentPermission();
  }

  private checkCurrentPermission(): void {
    const user = this.authService.user;

    if (!user || !user.permissions) {
      this.viewContainer.clear();
      this.hasCreatedView = false;
      return;
    }

    const permissions = Array.isArray(this.currentPermissions)
      ? this.currentPermissions
      : [this.currentPermissions];

    const hasAccess = this.authService.hasAnyPermission(permissions);

    if (hasAccess && !this.hasCreatedView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasCreatedView = true;
    } else if (!hasAccess && this.hasCreatedView) {
      this.viewContainer.clear();
      this.hasCreatedView = false;
    }
  }
}
