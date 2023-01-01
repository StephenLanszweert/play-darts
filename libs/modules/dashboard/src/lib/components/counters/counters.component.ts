import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'playdarts-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.scss'],
})
export class CountersComponent implements OnInit {
  isMobile: boolean = false;
  data: any;
  chartOptions: any;
  @Input() darkMode!: boolean | null;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    Chart.register(ChartDataLabels);
    this.data = {
      labels: [
        '501',
        'Round the world',
        'Scoring'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    this.chartOptions = {
      defaults: {
        font: {
          family: "'Poppins', sans-serif"
        },
      },
      responsive: true,
      plugins: {
        datalabels: {
          borderRadius: 20,
          color: this.darkMode ? 'white' : '#050A0C',
        },
        legend: {
          labels: {
            color: '#ffffff'
          }
        },
      },
    };
  }
}
