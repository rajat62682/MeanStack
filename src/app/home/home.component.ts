import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import * as _ from 'lodash';
import { Country } from './region/country.model';
import { RegionComponent } from './region/region.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
  ngOnInit(): void {
    
  }
  regionArr=["asia","africa","americas","europe","oceania"]
  
  logoutLoader:boolean=false
   selectedRegion=this.regionArr[0];
   
   totalRegionPopulationToArea:number=0;
   totalArea:number=0;
   @ViewChild(RegionComponent) regionComp: RegionComponent;
  constructor() { }
  
  logoutOperation(event){
    this.logoutLoader=true;
  }
 
  changeRegion(reg){
  this.selectedRegion=reg.tab.textLabel.toLowerCase();
  this.regionComp.changeTab(this.selectedRegion);
  }



 
 

}
