import { Bet } from "src/ticket/dto/get-ticket.dto";

export interface User {
    userId: any;
    name? :string;
    email : string;
    bets? : Bet[];
    password? :string;
}

export class CreateUserDto {
    id: any;
    name? :string;
    email : string;
    bets? : Bet[];
    password? :string;
  }