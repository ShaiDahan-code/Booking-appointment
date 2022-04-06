import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-input-from-user',
  templateUrl: './input-from-user.component.html',
  styleUrls: ['./input-from-user.component.css']
})
export class InputFromUserComponent  {
  name = '';
  date = '';
  email = '';
  successMsg = '';
  errorMsg = '';
  emailFlag = false;
  emailFormatFlag = false;
  dateFlag = false;
  nameFlag = false;
  dateEmptyFlag = false;

  //make a static array of the booking for the user
  static bookingArray = [];



  constructor() { }

  // check if the input is empty
  checkEmail() {
    this.emailFlag = this.email.length <= 0;
    return this.emailFlag
  }
  //Checking if Email is in correct format
  checkValidEmail(){
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("Email is: " + this.email);
    this.emailFormatFlag = !emailRegex.test(this.email);
    return this.emailFormatFlag;
  }

  // check if the input is empty
  checkName() {
    this.nameFlag = this.name.length <= 0;
    return this.nameFlag
  }

  //check if the date is passed or not.
  checkDate(){
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    //check if Date now is greater than date
    this.dateFlag = new Date(this.date) < now;
    return this.dateFlag;
  }

  //check if the date is empty
  checkDateEmpty(){
    this.dateEmptyFlag = this.date.length <= 0;
    return this.dateEmptyFlag
  }


  public editBooking(name,email,date){
    this.name = name;
    this.email = email;
    this.date = date;
  }



  //Check if the date is the same as the current date in the booking array
  checkDateInArray(){
    let dateInArray = false;
    for(let i = 0; i < InputFromUserComponent.bookingArray.length; i++){
      if(InputFromUserComponent.bookingArray[i].date == this.date){
        dateInArray = true;
      }
    }
    return dateInArray;
  }



  onSubmit() { // Check if all fields are filled
    this.checkName()
    this.checkEmail()
    this.checkValidEmail()
    this.checkDate()
    this.checkDateEmpty();
    let check = !this.checkName() && !this.checkEmail() && !this.checkValidEmail() && !this.checkDate() && !this.checkDateEmpty();
    if(!check) {

    }
    else{
      // Check if the date is already in the booking array
      if(this.checkDateInArray()){
        this.errorMsg = "Date is already booked. change the Date";
        this.successMsg = "";
      }
      else{
        // Add the booking to the array
        InputFromUserComponent.bookingArray.push({
          name: this.name,
          date: this.date,
          email: this.email
        });
        this.successMsg = "The Date is booked for " + this.name + " on " + this.date;
        this.errorMsg = "";
        // Clear the fields
        this.name = '';
        this.date = '';
        this.email = '';

        //sort the array by date
        InputFromUserComponent.bookingArray.sort(function(a, b){
          // @ts-ignore
          return new Date(a.date) - new Date(b.date);
        });

      }


      console.log(InputFromUserComponent.bookingArray);

    }

  }
}
