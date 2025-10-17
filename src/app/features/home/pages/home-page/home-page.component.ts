import { CommonModule } from '@angular/common';
// home-page.component.ts
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

// NG-ZORRO Imports
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

Chart.register(...registerables);

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzGridModule,
    NzStatisticModule,
    NzTableModule,
    NzIconModule,
    NzTagModule,
    NzDividerModule,
  ],
  templateUrl: './home-page.component.html',
  styles: `
    .dashboard-container {
      padding: 24px;
      background: #f0f2f5;
      min-height: 100vh;
    }

    .kpi-card {
      text-align: center;
      height: 100%;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .kpi-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    .chart-container {
      position: relative;
      height: 300px;
      padding: 10px;
    }

    .header-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #1890ff;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .header-subtitle {
      font-size: 14px;
      color: #8c8c8c;
      margin-bottom: 24px;
    }

    ::ng-deep .ant-statistic-content {
      font-size: 32px !important;
      font-weight: 700 !important;
    }

    ::ng-deep .ant-statistic-title {
      font-size: 14px;
      margin-bottom: 8px;
    }

    .card-icon {
      font-size: 48px;
      margin-bottom: 8px;
    }
  `,
})
export class HomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('chartIngresos') chartIngresos!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartServicios') chartServicios!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartEspecies') chartEspecies!: ElementRef<HTMLCanvasElement>;

  // DATOS ESTÁTICOS DEL DASHBOARD
  kpis = {
    ingresosDia: 2450.5,
    citasHoy: 12,
    nuevosPacientes: 28,
    vacunasMes: 85,
    ingresosMes: 45780.0,
    citasMes: 156,
    cirugiasMes: 23,
    veterinarios: 5,
  };

  // Datos para gráfico de ingresos mensuales
  ingresosMensuales = [
    { mes: '2024-05', total: 38500 },
    { mes: '2024-06', total: 42300 },
    { mes: '2024-07', total: 39800 },
    { mes: '2024-08', total: 45200 },
    { mes: '2024-09', total: 43600 },
    { mes: '2024-10', total: 45780 },
  ];

  // Datos para gráfico de servicios
  distribucionServicios = [
    { servicio: 'Consultas', cantidad: 156, color: '#1890ff' },
    { servicio: 'Cirugías', cantidad: 23, color: '#52c41a' },
    { servicio: 'Vacunas', cantidad: 85, color: '#faad14' },
  ];

  // Datos para especies
  especiesAtendidas = [
    { especie: 'Perros', cantidad: 145 },
    { especie: 'Gatos', cantidad: 98 },
    { especie: 'Aves', cantidad: 12 },
    { especie: 'Conejos', cantidad: 8 },
    { especie: 'Otros', cantidad: 5 },
  ];

  // Citas de hoy
  citasHoy = [
    { hora: '09:00', paciente: 'Max', dueno: 'Juan Pérez', estado: 'Completada' },
    { hora: '09:30', paciente: 'Luna', dueno: 'María García', estado: 'Completada' },
    { hora: '10:00', paciente: 'Rocky', dueno: 'Carlos López', estado: 'En proceso' },
    { hora: '10:30', paciente: 'Bella', dueno: 'Ana Martínez', estado: 'Pendiente' },
    { hora: '11:00', paciente: 'Toby', dueno: 'Luis Rodríguez', estado: 'Pendiente' },
    { hora: '11:30', paciente: 'Coco', dueno: 'Carmen Sánchez', estado: 'Pendiente' },
  ];

  // Cirugías próximas
  cirugiasProximas = [
    { fecha: '2024-10-17', paciente: 'Max', tipo: 'Esterilización', veterinario: 'Dr. Ramírez' },
    { fecha: '2024-10-18', paciente: 'Luna', tipo: 'Extracción dental', veterinario: 'Dra. Torres' },
    { fecha: '2024-10-19', paciente: 'Rocky', tipo: 'Cirugía abdominal', veterinario: 'Dr. Ramírez' },
    { fecha: '2024-10-20', paciente: 'Bella', tipo: 'Limpieza dental', veterinario: 'Dra. Mendoza' },
  ];

  chartIngresosInstance: any;
  chartServiciosInstance: any;
  chartEspeciesInstance: any;

  ngOnInit() {
    console.log('Dashboard inicializado con datos estáticos');
  }

  ngAfterViewInit() {
    // Pequeño delay para asegurar que los canvas estén renderizados
    setTimeout(() => {
      this.createCharts();
    }, 100);
  }

  createCharts() {
    this.createChartIngresos();
    this.createChartServicios();
    this.createChartEspecies();
  }

  createChartIngresos() {
    if (this.chartIngresosInstance) {
      this.chartIngresosInstance.destroy();
    }

    const ctx = this.chartIngresos.nativeElement.getContext('2d');

    this.chartIngresosInstance = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: this.ingresosMensuales.map((d) => {
          const [year, month] = d.mes.split('-');
          const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
          return monthNames[Number.parseInt(month) - 1];
        }),
        datasets: [
          {
            label: 'Ingresos (S/)',
            data: this.ingresosMensuales.map((d) => d.total),
            backgroundColor: 'rgba(24, 144, 255, 0.1)',
            borderColor: '#1890ff',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#1890ff',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 13 },
            callbacks: {
              // label: (context) => `Ingresos: S/ ${context.parsed.y.toLocaleString()}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `S/ ${((value as number) / 1000).toFixed(0)}k`,
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  createChartServicios() {
    if (this.chartServiciosInstance) {
      this.chartServiciosInstance.destroy();
    }

    const ctx = this.chartServicios.nativeElement.getContext('2d');

    this.chartServiciosInstance = new Chart(ctx!, {
      type: 'doughnut',
      data: {
        labels: this.distribucionServicios.map((d) => d.servicio),
        datasets: [
          {
            data: this.distribucionServicios.map((d) => d.cantidad),
            backgroundColor: ['#1890ff', '#52c41a', '#faad14'],
            borderWidth: 3,
            borderColor: '#fff',
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: { size: 12, weight: 'bold' },
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            callbacks: {
              label: (context) => {
                const total = context.dataset.data.reduce((a: any, b: any) => a + b, 0);
                const percentage = ((context.parsed / total) * 100).toFixed(1);
                return `${context.label}: ${context.parsed} (${percentage}%)`;
              },
            },
          },
        },
      },
    });
  }

  createChartEspecies() {
    if (this.chartEspeciesInstance) {
      this.chartEspeciesInstance.destroy();
    }

    const ctx = this.chartEspecies.nativeElement.getContext('2d');

    this.chartEspeciesInstance = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: this.especiesAtendidas.map((d) => d.especie),
        datasets: [
          {
            label: 'Pacientes',
            data: this.especiesAtendidas.map((d) => d.cantidad),
            backgroundColor: ['#1890ff', '#52c41a', '#faad14', '#13c2c2', '#722ed1'],
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 20,
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  getEstadoColor(estado: string): string {
    const colores: any = {
      Completada: 'success',
      'En proceso': 'processing',
      Pendiente: 'warning',
    };
    return colores[estado] || 'default';
  }
}
