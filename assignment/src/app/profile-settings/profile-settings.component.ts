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
        console.log("UserData", userData);
        this.loadingData = false;
      })
      .catch((error) => {
        console.log("Error", error);
        this.getProfile();
      });
  }

  saveProfile() {
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
        console.log("Error", err);
        this.savingData=false;
      });
    }
   }

   nameChanged(){
    this.nameError='';
    this.emailError='';
   }

   saveEmail(user:IProfile){
      let email:string = user.firstName?.replace(/\s/g, "") + "." + user.lastName?.replace(/\s/g, "")+"@blueface.com"
      this.profile.setUserEmail(email)
      .then((user)=>{
        console.log("Email Saved");
      })
      .catch((err)=>{
        console.log("Email Error", err);
        this.emailError=err.error;
        this.resetForm();
      });
   }

   resetForm(){
    this.user.firstName= this.userBackup.firstName;
    this.user.lastName= this.userBackup.lastName;
    this.user.email='';
   }

}
