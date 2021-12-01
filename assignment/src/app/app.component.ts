import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UtilService } from './common/services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  languageObject:any;
  languageData:any;
  constructor(private httpClient: HttpClient, private utilService:UtilService){

  }
  ngOnInit(){
    this.httpClient.get('../assets/locale/languages.json').subscribe((data:any)=>{
     this.languageData=data;
     this.utilService.languageSelection.next("English");
    });

    this.utilService.languageSelection.subscribe((language:any)=>{
      this.languageData.languages.forEach((element:any) => {
        if(element.language == language){
          this.languageObject = element;
        }
      });
    });

  }
}
