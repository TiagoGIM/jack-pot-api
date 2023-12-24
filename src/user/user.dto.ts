import { PickType } from "@nestjs/mapped-types";
import { Role, Signature } from "src/enum/auth.enum";
import { Bet } from "src/ticket/dto/get-ticket.dto";

export interface User {
    userId: any;
    name? :string;
    email : string;
    bets? : Bet[];
    signature?: Signature

}

export class CreateUserDto {
    id: any;
    name? :string;
    email : string;
    bets? : Bet[];
    password? :string;
    role?: Role;
    signature?: Signature;
  }

export class UpdateUserStatus extends  PickType(CreateUserDto, [ 'signature', 'email']){
}

export class UpdateUserRoleDto  extends PickType(CreateUserDto, [ 'role', 'email']){

}
