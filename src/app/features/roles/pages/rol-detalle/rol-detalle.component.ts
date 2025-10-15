import { JsonPipe } from '@angular/common';
import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, concatMap, map, takeUntil } from 'rxjs';
import { AutoDestroyService } from '../../../../shared/utils/auto-desstroy.service';
import { IRol } from '../../interfaces/rol.inteface';
import { RolService } from '../../services/roles.service';

@Component({
  selector: 'app-rol-detalle',
  imports: [JsonPipe],
  templateUrl: './rol-detalle.component.html',
  styles: ``,
  providers: [AutoDestroyService],
})
export default class RolDetalleComponent implements OnInit {
  private readonly rolService = inject(RolService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly $destroy = inject(AutoDestroyService);
  $role: WritableSignal<IRol | null> = signal(null);

  ngOnInit(): void {
    this.subscribToRouteParams();
  }

  private subscribToRouteParams(): void {
    this.route.params
      .pipe(
        map((params) => params['id']),
        concatMap((id) => this.getRole(id)),
        takeUntil(this.$destroy),
      )
      .subscribe({
        next: (role: IRol) => {
          this.$role.set(role);
        },
      });
  }

  private getRole(id: string): Observable<IRol> {
    return this.rolService.getRoleById(id);
  }

  public navegateToHome(): void {
    this.router.navigate(['/admin/roles']);
  }
}
