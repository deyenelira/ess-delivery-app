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
  options: any;
  initOpts: any;
  constructor() {}
  
  ngOnInit(): void {
    this.initOpts = {
      renderer: "canvas",
      width: 1282*devicePixelRatio,
      height: 1280*devicePixelRatio
    };
  
    this.options = {
      //Settando os titulos
      
      title: [
        //Comida mais cara 
        {
          text: 'Comida mais cara',
          textStyle:{
            fontFamily: 'ABeeZee Regular',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 32,
            color: "#FFFFFF",
          },
          left: '75%',
          top: '5%',
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
          left: '75%',
          top: '7.5%',
          textAlign: 'center',
        },

        //Restaurante mais caro
        {
          text: 'Restaurante mais caro',
          textStyle:{
            fontFamily: 'ABeeZee Regular',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 32,
            color: "#FFFFFF",
          },
          left: '25%',
          top: '5%',
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
          left: '25%',
          top: '7.5%',
          textAlign: 'center'
        },

        //Comida mais comprada
        {
          text: 'Comida mais comprada',
          textStyle:{
            fontFamily: 'ABeeZee Regular',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 32,
            color: "#FFFFFF",
          },
          left: '75%',
          top: '55%',
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
          left: '75%',
          top: '57.5%',
          textAlign: 'center'
        },

        //Restaurante mais comprado
        {
          text: 'Restaurante mais comprado',
          textStyle:{
            fontFamily: 'ABeeZee Regular',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 32,
            color: "#FFFFFF",
          },
          left: '25%',
          top: '55%',
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
          left: '25%',
          top: '57.5%',
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
      series: [
        //Chart da comida mais cara
        {
          name: "Comida:",
          type: "pie",
          radius: "25%",
          center: ['75%', '25%'],
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
        
        //Chart da comida mais comprada
        {
          name: "Comida:",
          type: "pie",
          radius: "25%",
          center: ['75%', '75%'],
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

        //Chart do restaurante mais caro
        {
          name: "Restaurante:",
          type: "pie",
          radius: "25%",
          center: ['25%', '25%'],
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
        
        //Chart do restaurante mais comprado
        {
          name: "Restaurante:",
          type: "pie",
          radius: "25%",
          center: ['25%', '75%'],
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
  }
}
