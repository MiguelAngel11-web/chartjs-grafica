import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './servicio/api.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

	private intervalUpdate: any = null;

	public chart: any = null;

	/**
	* Constructor
	*/
	constructor(private service : ApiService) {

	}
	private ngOnInit(): void {
		this.chart = new Chart('realtime', {
			type: 'bar',
			data: {
				labels: [],
				datasets: [
				  {
					label: 'Data',
					fill: false,
					data: [],
					backgroundColor: '#168ede',
					borderColor: '#168ede'
				  }
				]
			  },
			  options: {
				tooltips: {
					enabled: false
				},
				legend: {
					display: true,
					position: 'bottom',
					labels: {
						fontColor: 'white'
					}
				},
				scales: {
				  yAxes: [{
					  ticks: {
						  fontColor: "white"
					  }
				  }],
				  xAxes: [{
					ticks: {
						fontColor: "white",
						beginAtZero: true
					}
				  }]
				}
			  }
		});

		this.showData();

		this.intervalUpdate = setInterval(function(){
			this.showData();
		}.bind(this), 500);
	}

	private ngOnDestroy(): void {
		clearInterval(this.intervalUpdate);
	}

	private showData(): void {
		this.getFromAPI().subscribe(response => {
			if(response.error === false) {
				let chartTime: any = new Date();
				chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
				if(this.chart.data.labels.length > 15) {
						this.chart.data.labels.shift();
						this.chart.data.datasets[0].data.shift();
				}
				this.chart.data.labels.push(chartTime);
				this.chart.data.datasets[0].data.push(response.data);
				this.chart.update();
			} else {
				console.error("ERROR: The response had an error, retrying");
			}
		}, error => {
			console.error("ERROR: Unexpected response");
		});
	}

	private getFromAPI(): Observable<any>{
	  return this.service.consulta();
	}

}
