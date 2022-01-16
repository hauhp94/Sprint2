import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexMarkers,
  ApexXAxis,
  ApexPlotOptions,
} from 'ng-apexcharts';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {StatisticService} from '../../../service/statistic/statistic.service';
import {Contract} from '../../../model/contract/contract';
import {Title} from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-statistic-liquidation',
  templateUrl: './statistic-liquidation.component.html',
  styleUrls: ['./statistic-liquidation.component.css']
})
export class StatisticLiquidationComponent implements OnInit {
  pastDay = this.datePipe.transform(new Date().setDate(new Date().getDate() - 365), 'yyyy-MM-dd');
  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  check = false;
  checkStartDate = this.pastDay;
  checkEndDate = this.today;
  checkDateForm: FormGroup;
  isCheckStatistic = false;
  contract: Contract[] = [];
  totalMoney = 0;

  constructor(private statisticService: StatisticService,
              private titleService: Title,
              private datePipe: DatePipe,
              private toast: ToastrService) {
    this.titleService.setTitle('Thống kê');
    this.getEndDateStartDate();
  }

  ngOnInit(): void {
  }

  getEndDateStartDate() {
    this.checkDateForm = new FormGroup({
      checkStartDate: new FormControl('', Validators.required),
      checkEndDate: new FormControl('', Validators.required)
    }, this.checkDate);
  }

  private checkDate(check: AbstractControl): any {
    const fromDate = check.get('checkStartDate');
    const toDate = check.get('checkEndDate');
    return fromDate.value <= toDate.value ? null : {errorDateTo: true};
  }

  getLoan() {
    this.statisticService.getStatisticLiquidation(this.checkStartDate, this.checkEndDate).subscribe(value => {
      this.contract = value;
      for (let i = 0; i < this.contract.length; i++) {
        // @ts-ignore
        this.chartOptions.series[0].data.push(Number(this.contract[i].loan));
      }

    }, error => {
      console.log(error);
    });
  }

  getContractCode() {
    this.statisticService.getStatisticLiquidation(this.checkStartDate, this.checkEndDate).subscribe(value => {
      this.contract = value;
      this.chartOptions.labels[0] = this.contract[0].contractCode;
      for (let i = 1; i < this.contract.length; i++) {
        this.totalMoney += Number(this.contract[i].totalMoney);
        this.chartOptions.labels.push(this.contract[i].contractCode);
      }


    }, error => {
      console.log(error);
    });
    console.log(this.totalMoney);
  }

  getTotalMoney() {
    this.statisticService.getStatisticLiquidation(this.checkStartDate, this.checkEndDate).subscribe(value => {
      this.contract = value;
      for (let i = 0; i < this.contract.length; i++) {
        // @ts-ignore
        this.chartOptions.series[1].data.push(Number(this.contract[i].totalMoney));

      }

    }, error => {
      console.log(error);
    });
  }

  getStatistic() {
    this.check = true;
    this.isCheckStatistic = true;
    if (this.isCheckStatistic) {
      this.statisticLiquidation();
      this.getContractCode();
      this.getLoan();
      this.getTotalMoney();


    }
  }

  statisticLiquidation() {

    this.check = true;
    this.chartOptions = {
      series: [
        {
          name: 'Tổng tiền cho vay',
          type: 'column',
          data: []
        },
        {
          name: 'Tổng số tiền bán',
          type: 'area',
          data: []
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        stacked: false
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: [''],
      markers: {
        size: 0
      },
      yaxis: {
        title: {
          text: 'VND'
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter(y) {
            if (typeof y !== 'undefined') {
              return y.toFixed(0) + 'VND';
            }
            return y;
          }
        }
      }
    };
  }

  public generateData(count, yrange) {
    let i = 0;
    const series = [];
    while (i < count) {
      const x = 'w' + (i + 1).toString();
      const y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x,
        y
      });
      i++;
    }
    return series;
  }

  progress() {
    this.toast.success('Tính năng đang phát triển');
  }
}
