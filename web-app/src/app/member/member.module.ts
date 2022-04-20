import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
<<<<<<< HEAD
=======
import { MatButtonModule } from "@angular/material/button";
>>>>>>> 1c37449e29f9485417ae3de1bbb33333a8d68d17
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
import { Order } from "../orders/order";

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
    ReactiveFormsModule,
<<<<<<< HEAD
=======
    MatButtonModule,
>>>>>>> 1c37449e29f9485417ae3de1bbb33333a8d68d17
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
