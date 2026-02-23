export class Branch {
  id!: number;
  branchName!: string;
  city!: string;
  address!: string;
  rating!: number;
  phone!: string;
  imgUrl!: string;
  email!: string;
  hotelId!: number;

  hotelName?: string; // Optional property to hold the hotel name
}