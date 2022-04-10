import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HistoryComponent } from "./history/history.component";
import { HomeComponent } from "./home/home.component";
import { MemberComponent } from "./member.component";
import { ProfileComponent } from "./profile/profile.component";
import { ExpensesComponent } from "./expenses/expenses.component";
import { NgxEchartsModule } from 'ngx-echarts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    HistoryComponent,
    MemberComponent,
    ExpensesComponent
  ],
  imports: [
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: MemberComponent,
        children: [
          { path: "", component: HomeComponent },
          { path: "profile", component: ProfileComponent },
          { path: "history", component: HistoryComponent },
          { path: "expenses", component: ExpensesComponent },
        ],
      },
    ]),
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [ MatDatepickerModule ]
})
export class MemberModule {}
