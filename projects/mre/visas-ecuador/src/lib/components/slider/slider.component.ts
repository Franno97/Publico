import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StepsSliderService } from '../../services/ctrolUi/steps-slider.service';


@Component({
  selector: 'lib-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() imgDir :string = '';
  @Output() clickStepper = new EventEmitter<number>();
  headerSteps:any = "";
  constructor(private stepsSliderService:StepsSliderService) { 
    this.headerSteps = this.stepsSliderService.getHeaderSteps();
    
  }
  ngOnInit(): void {
    this.stepsSliderService.setPersonalStatus();
    
  }
  clickLink(n:number){
    this.clickStepper.emit(n);
  }
}
