import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule) },
  { path: 'graph', loadChildren: () => import('./modules/graph/graph.module').then(m => m.GraphModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
/**
 * Root Angular routing module
 */
export class AppRoutingModule { }
