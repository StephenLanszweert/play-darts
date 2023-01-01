import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'playdarts-latest-averages',
  templateUrl: './latest-averages.component.html',
  styleUrls: ['./latest-averages.component.scss'],
})
export class LatestAveragesComponent implements OnInit {
  isMobile: boolean = false;
  basicData: any;
  basicOptions: any;
  @Input() darkMode = true;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    Chart.register(ChartDataLabels);
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
      responsive: true,
      plugins: {
        datalabels: {
          backgroundColor: this.darkMode ? '#050A0C' : 'white',
          borderRadius: 20,
          color: this.darkMode ? 'white' : '#050A0C',
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
            color: this.darkMode ? '#FFFFFF' : '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: this.darkMode ? '#FFFFFF' : '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }
}
