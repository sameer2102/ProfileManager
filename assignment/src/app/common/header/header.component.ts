import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() language:any;
  selectedLanguage:string='English';
  constructor(private utilService:UtilService) { }

  ngOnInit(): void {

  }


  languageChanged(){
    this.utilService.languageSelection.next(this.selectedLanguage);
  }

}
