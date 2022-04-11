import { Component } from "@angular/core";
import { ClientService } from "src/app/client/client.service";
import { orderService } from "src/app/orders/order.service";

@Component({
  selector: "expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.css"],
})

export class ExpensesComponent{
  data: any;
  filters: any;
  optionsCompraCusto: any;
  optionsRestauranteCusto: any;
  optionsCompraFreq: any;
  optionsRestauranteFreq: any;
  initOpts: any;
  period: string = 'Últimos 30 dias';

  monthNames: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril',
                        'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
                        'Outubro', 'Novembro', 'Dezembro'];

  constructor(
    private clientService: ClientService,
    private orderService : orderService
  ) {}
  
  ordered: boolean = false;

  ngOnInit(): void {
    var today = new Date();
    var priorMonth = new Date(new Date().setDate(today.getDate() - 30));
    this.filters = {
      start: priorMonth,
      end: today
    };

    this.getData();
  }

  public getData() {
    console.log(this.filters);
    this.orderService.getAnalytics(this.clientService.getId(), this.filters)
      .then(res => {
        console.log(res);
        this.data = res;
        this.initOpts = {
          renderer: "canvas",
          width: 450,
          height: 500,
        };

        if (!this.data.most_expensive.food.length) this.ordered = false;
        else this.setData();
      });
  }

  public setData() {
    this.ordered = true;

    /*===========Chart do Restaurante mais caro=============*/
    this.optionsRestauranteCusto = {
      //Settando o titulo
      title: [
        {
          text: 'Restaurante mais caro',
          textStyle:{
            fontFamily: 'ABeeZee Regular',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 32,
            color: "#FFFFFF",
          },
          left: '50%',
          top: '2.5%',
          textAlign: 'center',
        },
        {
          subtext: this.data.most_expensive.restaurant[0].name,
          subtextStyle:{
            fontFamily: 'Cherry Bomb One Regular',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 24,
            color: '#FF5200',
            width: 450,
            overflow: 'break',
          },
          left: '50%',
          top: '12.5%',
          textAlign: 'center'
        },
      ],
      tooltip: {
        trigger: "item",
        width: "100%"
      },
      legend: {
        show: false,
      },
      //Definindo o Chart
      series: [
        {
          name: "Restaurante:",
          type: "pie",
          radius: "50%",
          center: ['50%', '55%'],
          data: this.data.most_expensive.restaurant,
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2
          },
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "40",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
        },
      ],
    };

    /*===========Chart da comida mais cara=============*/
    this.optionsCompraCusto = {
      //Settando o titulo
      title: [
        {
          text: 'Comida mais cara',
          textStyle:{
            fontFamily: 'ABeeZee Regular',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 32,
            color: "#FFFFFF",
          },
          left: '50%',
          top: '2.5%',
          textAlign: 'center',
        },
        {
          subtext: this.data.most_expensive.food[0].name,
          subtextStyle:{
            fontFamily: 'Cherry Bomb One Regular',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 24,
            color: '#FF5200',
            width: 450,
            overflow: 'break',
          },
          left: '50%',
          top: '12.5%',
          textAlign: 'center',
        },
      ],
      tooltip: {
        trigger: "item",
        width: "100%"
      },
      legend: {
        show: false,
      },
      //Definindo o Chart
      series: [
        {
          name: "Comida:",
          type: "pie",
          radius: "50%",
          center: ['50%', '55%'],
          data: this.data.most_expensive.food,
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2
          },
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "40",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
        }, 
      ]
    };

    /*===========Chart do Restaurante mais comprado=============*/
    this.optionsRestauranteFreq = {
      //Settando o titulo
      title: [
        {
          text: 'Restaurante mais comprado',
          textStyle:{
            fontFamily: 'ABeeZee Regular',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 32,
            color: "#FFFFFF",
          },
          left: '50%',
          top: '2.5%',
          textAlign: 'center',
        },
        {
          subtext: this.data.most_request.restaurant[0].name,
          subtextStyle:{
            fontFamily: 'Cherry Bomb One Regular',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 24,
            color: '#FF5200',
            width: 450,
            overflow: 'break',
          },
          left: '50%',
          top: '12.5%',
          textAlign: 'center'
        },
      ],
      tooltip: {
        trigger: "item",
        width: "100%"
      },
      legend: {
        show: false,
      },
      //Definindo o Chart
      series: [
        {
          name: "Restaurante:",
          type: "pie",
          radius: "50%",
          center: ['50%', '55%'],
          data: this.data.most_request.restaurant,
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2
          },
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "40",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
        },
      ],
    };
    
    /*===========Chart da comida mais comprada=============*/
    this.optionsCompraFreq = {
      //Settando o titulo
      title: [
        {
          text: 'Comida mais comprada',
          textStyle:{
            fontFamily: 'ABeeZee Regular',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 32,
            color: "#FFFFFF",
          },
          left: '50%',
          top: '2.5%',
          textAlign: 'center',
        },
        {
          subtext: this.data.most_request.food[0].name,
          subtextStyle:{
            fontFamily: 'Cherry Bomb One Regular',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 24,
            color: '#FF5200',
            width: 450,
            overflow: 'break',
          },
          left: '50%',
          top: '12.5%',
          textAlign: 'center'
        },
      ],
      tooltip: {
        trigger: "item",
        width: "100%"
      },
      legend: {
        show: false,
      },
      //Definindo o Chart
      series: [
        {
          name: "Comida:",
          type: "pie",
          radius: "50%",
          center: ['50%', '55%'],
          data: this.data.most_request.food,
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2
          },
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "40",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
        },
      ],
    };
  }

  openDatePicker(dp: any) {
    dp.open();
  }

  closeDatePicker(eventData: any, dp?: any) {
    var s = new Date(eventData);
    var e = new Date(eventData);
    e.setMonth(e.getMonth() + 1);
    this.filters = {
      start: s,
      end: e
    }
    dp.close();   
    this.period = this.monthNames[s.getMonth()] + '/' + s.getFullYear();
    
    this.getData();
  }
}
