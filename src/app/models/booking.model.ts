export type BookingStatus = 'CONFIRMED' | 'CANCELLED'| 'PENDING';  //this is a way to define enum like thing in typescript.

// so here export tells that this type can be used in other files as well. and 
// we are defining a type called UserRole which can only have two values 'ADMIN' or 'CUSTOMER'. 
// This is useful for ensuring that only valid roles are assigned to users in our application.



export class Booking {
  id!: number;
  roomId!: number;
  userId!: number;
  checkInDate!: string;  // set date datatype
  checkOutDate!: string;
  price!: number;
  status!:BookingStatus;
  numberOfRooms!: number;
}