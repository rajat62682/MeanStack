import { Component, OnInit, Input } from '@angular/core';

import * as _ from 'lodash';
import { Country } from './country.model';
import { NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import { ApiserviceService } from '../apiservice.service';
import { timeout } from 'q';

am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  @Input() region: string;
   regionData: Country[]=[];
  totalRegionPopulationToArea: number;
   totalArea: number;
  selectedCountry = "";
  loadCards:boolean=false;
  displayCountry: any={};
  displayedColumns: string[] = ['name', 'capital', 'population', 'area'];
  private chartCountry: am4charts.XYChart;
  private chartRegion: am4charts.XYChart;
  constructor(private zone: NgZone,private apiService:ApiserviceService) { }
  ngOnInit() {
   
  }
  processRegionData(data){
    this.loadCards=false;
    var that=this;
    var totalRegionPopulation=0;
    this.totalArea=0
    _.each(data,(value)=>{
    totalRegionPopulation+=value.population;
    that.totalArea+=value.area;
    
    that.regionData.push(new Country(value.name,value.capital,value.subregion,value.population,value.area,value.languages,value.currencies,value.timezones,value.alpha2Code));
    })
    this.loadCards=true;
    console.log( this.regionData[0]);
    this.totalRegionPopulationToArea=totalRegionPopulation/this.totalArea;
    this.displayCountry=this.regionData[0];
    this.selectedCountry=this.regionData[0].name;
  } 
  ngAfterViewInit() {
    this.apiService.getRegionData(this.region).subscribe((response)=>{
      this.processRegionData(response);
setTimeout(()=>{
  this.populateCountryChart(this.totalRegionPopulationToArea, this.displayCountry, this.selectedCountry);
  this.populateRegionChart();
},400)
     
   }) 
  }
  changeTab(selectedCountry) {
 
   // this.selectedCountry = selectedCountry;
    this.apiService.getRegionData(this.region).subscribe((response)=>{
      this.processRegionData(response);
      this.populateCountryChart(this.totalRegionPopulationToArea, this.displayCountry, selectedCountry);
   })
   

  }
  populateCountryChart(totalRegionPopulationToArea, selected: Country, name) {
    if (this.chartCountry) {
      this.chartCountry.dispose();
    }
    let selectedPopulationToArea = (selected.population / this.totalArea);
    let value = (selectedPopulationToArea / totalRegionPopulationToArea) * 100;
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("countryChartdiv", am4charts.RadarChart);
      chart.colors.list = [
        am4core.color("#416d5d"),
        am4core.color("#3e8269"),
        am4core.color("#3c9373"),
        am4core.color("#35a079"),
        am4core.color("#268e68"),
        am4core.color("#25aa79")
      ];
      // Add data
      chart.data = [{
        "category": "Total Population/Area",
        "value": 100,
        "full": 100
      }, {
        "category": name,
        "value": value,
        "full": 100
      }];
      // Make chart not full circle
      chart.startAngle = -90;
      chart.endAngle = 180;
      chart.innerRadius = am4core.percent(60);
      // Set number format
      chart.numberFormatter.numberFormat = "#.#'%'";
      // Create axes
      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis<am4charts.AxisRendererRadial>());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.grid.template.strokeOpacity = 0;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.fontWeight = "200";
      categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
        return (target.dataItem.index >= 0) ? chart.colors.list[target.dataItem.index] : fill;
        // return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
      });
      categoryAxis.renderer.minGridDistance = 10;
      let valueAxis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
      valueAxis.renderer.grid.template.strokeOpacity = 0;
      valueAxis.min = 0;
      valueAxis.max = 100;
      valueAxis.strictMinMax = true;
      // Create series
      let series1 = chart.series.push(new am4charts.RadarColumnSeries());
      series1.dataFields.valueX = "full";
      series1.dataFields.categoryY = "category";
      series1.clustered = false;
      //series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
      series1.columns.template.fill = chart.colors.list[1];
      series1.columns.template.fillOpacity = 0.08;
      // series1.columns.template. = ;
      series1.columns.template.strokeWidth = 0;
      series1.columns.template.radarColumn.cornerRadius = 20;
      let series2 = chart.series.push(new am4charts.RadarColumnSeries());
      series2.dataFields.valueX = "value";
      series2.dataFields.categoryY = "category";
      series2.clustered = false;
      series2.columns.template.strokeWidth = 0;
      series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
      series2.columns.template.radarColumn.cornerRadius = 20;
      series2.columns.template.adapter.add("fill", function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });
         // Add cursor
      chart.cursor = new am4charts.RadarCursor();
      this.chartCountry = chart;
    });
  }

  ngOnDestroy() {
   
       if (this.chartCountry) {
         this.chartCountry.dispose();
       }
       if (this.chartRegion) {
        this.chartRegion.dispose();
      }
   
  }
 
  displayCountryFull(row) {
    // this.selectedCountry=country.name;
    console.log(row);
    this.selectedCountry = row.name;
    this.displayCountry = row;
    this.populateCountryChart(this.totalRegionPopulationToArea, this.displayCountry, this.selectedCountry);
  }
 
  populateRegionChart(){
   
    let chart = am4core.create("regionChartdiv", am4charts.XYChart);
    
    chart.data = this.regionData;
    
    
   
chart.scrollbarX = new am4core.Scrollbar();
chart.colors.list = [
  am4core.color("#416d5d"),
  am4core.color("#3e8269"),
  am4core.color("#3c9373"),
  am4core.color("#35a079"),
  am4core.color("#268e68"),
  am4core.color("#25aa79")
];

  

// Create axes
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "name";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.verticalCenter = "middle";
categoryAxis.renderer.labels.template.rotation = 270;
categoryAxis.tooltip.disabled = true;
categoryAxis.renderer.minHeight = 110;

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.minWidth = 50;

// Create series
let series = chart.series.push(new am4charts.ColumnSeries());
series.sequencedInterpolation = true;
series.dataFields.valueY = "population";
series.dataFields.categoryX = "name";
series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
series.columns.template.strokeWidth = 0;

series.tooltip.pointerOrientation = "vertical";

series.columns.template.column.cornerRadiusTopLeft = 10;
series.columns.template.column.cornerRadiusTopRight = 10;
series.columns.template.column.fillOpacity = 0.8;

// on hover, make corner radiuses bigger
let hoverState = series.columns.template.column.states.create("hover");
hoverState.properties.cornerRadiusTopLeft = 0;
hoverState.properties.cornerRadiusTopRight = 0;
hoverState.properties.fillOpacity = 1;

series.columns.template.adapter.add("fill", function(fill, target) {
  return chart.colors.getIndex(target.dataItem.index);
});

// Cursor
chart.cursor = new am4charts.XYCursor();
    
   this.chartRegion=chart;

  }


}
