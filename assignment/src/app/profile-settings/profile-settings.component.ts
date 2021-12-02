import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IProfile, ProfileService } from '../common/services/profile.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  public title = 'Profile';
  loadingData: boolean = false;
  savingData: boolean = false;
  saveDisable: boolean = false;
  firstBlankError: boolean = false;
  lastBlankError: boolean = false;
  nameError:string="";
  emailError:string="";
  public user: IProfile = {};
  public userBackup: any = {};
  @Input() language:any;
  // public profileForm:FormGroup = new FormGroup({});
  constructor(private profile: ProfileService) { }

  ngOnInit() {
    // this.setProfileForm();
    this.loadingData = true;

    this.getProfile();
  }

  // setProfileForm(){
  //   this.profileForm=new FormGroup({
  //     firstName: new FormControl(''),
  //     lastName:new FormControl('')
  //   });
  // }

  getProfile() {
    this.profile.getProfileUser()
      .then((userData) => {
        this.user = userData;
        this.userBackup = {
          firstName : userData.firstName,
          lastName : userData.lastName
        }
        this.loadingData = false;
      })
      .catch((error) => {
        this.getProfile();
      });
  }

  saveProfile() {
    this.saveDisable=true;
    this.nameError='';
    this.emailError='';
    this.savingData=true;
    if(this.user.firstName && this.user.lastName){
      this.profile.setName(this.user)
      .then((user:any)=>{
        this.saveEmail(user);
        this.savingData=false;
      })
      .catch((err)=>{
        this.nameError=err.error;
        this.savingData=false;
        this.emailError='';
        this.saveDisable=false;
      })

    }
   }

   firstNameChanged(event:any){
    this.nameError='';
    this.emailError='';
    const globalRegex = new RegExp('^[A-Za-z]+$', 'g');
    let value:string =event.target.value;
    if(!globalRegex.test(value.charAt(value.length - 1))){
      event.target.value = value.substr(0,value.length-1);
    }
    if(event.target.value == ''){
      this.firstBlankError=true;
    }else{
      this.firstBlankError=false;
    }

   }

   lastNameChanged(event:any){
    this.nameError='';
    this.emailError='';
    const globalRegex = new RegExp('^[A-Za-z]+$', 'g');
    let value:string =event.target.value;
    if(!globalRegex.test(value.charAt(value.length - 1))){
      event.target.value = value.substr(0,value.length-1);
    }
    if(event.target.value == ''){
      this.lastBlankError=true;
    }else{
      this.lastBlankError=false;
    }

   }



   saveEmail(user:IProfile){
      let email:string = user.firstName?.replace(/\s/g, "") + "." + user.lastName?.replace(/\s/g, "")+"@blueface.com"
      this.profile.setUserEmail(email)
      .then((user)=>{
        this.saveDisable=false;
      })
      .catch((err)=>{
        this.emailError=err.error;
        this.resetForm();
        this.saveDisable=false;
      });
   }

   resetForm(){
    this.user.firstName= this.userBackup.firstName;
    this.user.lastName= this.userBackup.lastName;
    this.user.email='';
   }

}
