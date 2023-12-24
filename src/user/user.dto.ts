import { PickType } from "@nestjs/mapped-types";
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
    role?: Role.User
  }

export class UpdateUserRoleDto  extends PickType(CreateUserDto, [ 'role', 'email']){

}

export enum Role{
    Admin = 'admin',
    User = 'user'
}