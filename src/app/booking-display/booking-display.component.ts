import { Component, OnInit ,Input} from '@angular/core';
import { InputFromUserComponent } from '../input-from-user/input-from-user.component' ;

@Component({
  selector: 'app-booking-display',
  templateUrl: './booking-display.component.html',
  styleUrls: ['./booking-display.component.css']
})
export class BookingDisplayComponent implements OnInit {
  bookingArray = InputFromUserComponent.bookingArray;
  constructor() { }

  ngOnInit(): void {
  }

  receiveData(data) {
    this.bookingArray = data;
    console.log("This is in here:" + this.bookingArray);
  }

  cancelBooking(index) {
    InputFromUserComponent.bookingArray.splice(index, 1);
  }

  editBooking(index) {
    InputFromUserComponent.bookingArray.splice(index, 1);
  }

}
