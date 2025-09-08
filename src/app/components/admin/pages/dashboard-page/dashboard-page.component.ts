import {ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {SelectModule} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {MenuItem, SelectItem} from 'primeng/api';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {ChartModule} from 'primeng/chart';
import {TimelineModule} from 'primeng/timeline';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {RouterLink} from '@angular/router';


class EventItem {
}

@Component({
  selector: 'app-dashboard-page',
  imports: [SelectModule, FormsModule, ChartModule, TimelineModule, CardModule, ButtonModule, CarouselModule,
            BreadcrumbModule, RouterLink, CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  revenueYears: SelectItem[];
  eventHistoryTransactions: EventItem[];
  revenueYearSelected: string = '2025';

  revenueData: any;
  revenueOptions: any;

  paymentData: any;
  paymentOptions: any;

  orderData: any;
  orderOptions: any;

  responsiveOptions: any[] | undefined;

  items: MenuItem[] | undefined;

  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) {
    this.revenueYears = []
    for (let i = 2000; i < 2025; i++){
      this.revenueYears.push({ label: i.toString(), value: i.toString()})
    }

    this.eventHistoryTransactions = [
      { status: 'Ordered', customer: '#R3102', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', price: '200$'},
      { status: 'Processing', customer: '#R3102', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7', price: '350$'},
      { status: 'Shipped', customer: '#R3102', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800', price: '120$'},
      { status: 'Delivered', customer: '#R3102', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B', price: '100$'},
      { status: 'Delivered', customer: '#R3102', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B', price: '100$'},
      { status: 'Delivered', customer: '#R3102', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B', price: '100$'},
      { status: 'Delivered', customer: '#R3102', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B', price: '100$'}
    ];
  }


  ngOnInit() {
    this.initChart();
    this.items = [{ icon: 'pi pi-home', route: '/admin' }, { label: 'Dashboard' }, { label: 'E-commerce', route: '/admin' }];
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getSeverity(quantity: number) {
    if(quantity == 0) return 'danger';
    else if(quantity <= 10) return 'warn';
    else return 'success';
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
        datasets: [
          {
            type: 'line',
            label: 'Line Dataset',
            borderColor: documentStyle.getPropertyValue('--background-line-chart-color'),
            backgroundColor: 'transparent',
            tension: 1,
            stepped: true,
            fill: false,
            data: [60, 60, 70, 60, 40, 40, 40, 20, 30, 30, 50, 50],
            pointRadius: 0,
            pointHoverRadius: 6
          },
          {
            type: 'bar',
            label: 'My First dataset',
            backgroundColor: documentStyle.getPropertyValue('--background-chart-color'),
            borderColor: documentStyle.getPropertyValue('--background-chart-color'),
            data: [65, 59, 80, 81, 56, 55, 40, 20, 32, 44, 55, 50],
            barThickness: 20
          }
        ]
      };

      this.revenueOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.7,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              display: false
            }
          }
        }
      };
      this.cd.markForCheck()

      this.paymentData = {
        datasets: [
          {
            data: [10, 5, 20, 50, 15],
            backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500'), documentStyle.getPropertyValue('--background-chart-color'), documentStyle.getPropertyValue('--background-line-chart-color')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400'), , documentStyle.getPropertyValue('--background-chart-color'), documentStyle.getPropertyValue('--background-line-chart-color')]
          }
        ]
      };

      this.paymentOptions = {
        cutout: '60%',
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        }
      };
      this.cd.markForCheck()

      this.orderData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            tension: 0.4,
            borderColor: 'rgba(2,238,104)',
            backgroundColor: 'rgba(2,238,104,0.2)'
          },
          {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: true,
            tension: 0.4,
            borderColor: 'rgb(238,191,2)',
            backgroundColor: 'rgba(238,191,2,0.2)'
          },
          {
            label: 'Third Dataset',
            data: [12, 51, 62, 33, 21, 62, 45],
            fill: true,
            borderColor: 'rgba(238,2,2)',
            tension: 0.4,
            backgroundColor: 'rgba(238,2,2,0.2)'
          }
        ]
      };

      this.orderOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              display: false
            }
          }
        }
      };
      this.cd.markForCheck();
    }
  }
}
