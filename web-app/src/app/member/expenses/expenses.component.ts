import { Component } from "@angular/core";
import { ClientService } from "src/app/client/client.service";

@Component({
  selector: "expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.css"],
})

export class ExpensesComponent{
  data: any;
  optionsCompraCusto: any;
  optionsRestauranteCusto: any;
  optionsCompraFreq: any;
  optionsRestauranteFreq: any;
  initOpts: any;

  constructor(private clientService: ClientService) {}
  
  ordered: boolean = false;

  ngOnInit(): void {
    var filters = {
      start: new Date("2022-04-01"),
      end: new Date("2022-04-01")
    };
    this.clientService.getAnalytics(this.clientService.getId(), filters)
      .then(res => {
        this.data = res;
        this.initOpts = {
          renderer: "canvas",
          width: 450,
          height: 500,
        };

        if (!this.data.most_expensive.food.length) this.ordered = false;
        else {
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
      });

  }
}
