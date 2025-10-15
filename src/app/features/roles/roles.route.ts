import { Routes } from "@angular/router";
export const ROLES_ROUTE: Routes = [
  {
    path: "lista",
    loadComponent: () => import("./pages/roles-page/roles-page.component"),
  },

  {
    path: ":id",
    loadComponent: () => import("./pages/rol-detalle/rol-detalle.component"),
  },
  {
    path: "**",
    redirectTo: "lista",
  },
];
