import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'playdarts-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  mobile: boolean = false;

  ngOnInit(): void {
    Chart.register(ChartDataLabels);
    if (window.screen.width <= 850) {
      this.mobile = true;
    }
    this.basicData = {
      labels: ['05/05/22', '10/05/22', '15/5/22', '20/5/22', '25/5/22'],
      datasets: [
        {
          label: 'Avg',
          data: [65.23, 59.25, 80.00, 81.15, 56.45],
          fill: false,
          borderColor: '#F26C6D',
          tension: .4
        }
      ]
    };
    this.basicOptions = {
      defaults: {
        font: {
          family: "'Poppins', sans-serif"
        }
      },
      // interaction: {
      //   mode: 'nearest',
      //   axis: 'x',
      //   intersect: false
      // },
      responsive: true,
      plugins: {
        datalabels: {
          backgroundColor: '#050A0C',
          borderRadius: 20,
          color: 'white',
          font: {
            weight: 'bold'
          },
          padding: 6
        },
        legend: {
          display: false,
          labels: {
            color: '#495057'
          }
        },
        tooltip: {
          enabled: false
        },
        point: {
          pointStyle: 'cross'
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }
}
