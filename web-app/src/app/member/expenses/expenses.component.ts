import { Component } from "@angular/core";

@Component({
  selector: "expenses",
  templateUrl: "./expenses.component.html",
  styleUrls: ["./expenses.component.css"],
})

export class ExpensesComponent{
  data = [
    {
      name: 'Apples',
      value: 70
    },
    {
      name: 'Strawberries',
      value: 68
    },
    {
      name: 'Bananas',
      value: 48
    },
    {
      name: 'Oranges',
      value: 40
    },
    {
      name: 'Pears',
      value: 32
    },
    {
      name: 'Pineapples',
      value: 27,
    },
    {
      name: 'Grapes',
      value: 18
    }
  ];
  optionsCompraCusto: any;
  optionsRestauranteCusto: any;
  optionsCompraFreq: any;
  optionsRestauranteFreq: any;
  initOpts: any;
  constructor() {}
  
  ordered: boolean = false;

  ngOnInit(): void {
    
    this.initOpts = {
      renderer: "canvas",
      width: 450,
      height: 500,
    };
    
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
          subtext: 'Restaurante mais caro',
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
          data: this.data,
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
          subtext: 'Comidaaaaaaaaaaaa mais caraaaaaaaaaaaaaaaaaaaa',
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
          data: this.data,
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
          subtext: 'Restaurante mais comprado',
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
          data: this.data,
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
          subtext: 'Comida mais comprada',
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
          data: this.data,
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
}
