export type RoomType = 'STANDARD' | 'DELUXE' | 'SUITE';
export class Room {
  id!: number;
  branch_id!: number;
  price!: number;
  type!: RoomType;  
  totalRoom!: number;
  available!: number;

  branchName?: string; // Optional property to hold the branch name
  hotelName?: string;  // Optional property to hold the hotel name
}