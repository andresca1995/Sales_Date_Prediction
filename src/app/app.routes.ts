import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { BarChartComponent } from './d3/bar-chart/bar-chart.component';

export const routes: Routes = [
    { path: "", redirectTo: "inicio", pathMatch: "full" },
    {path:"inicio",component:HomeComponent},
    {path:"d3",component:BarChartComponent}
];
