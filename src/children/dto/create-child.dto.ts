import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateChildDto {
  /** name String
  location String
  wasGood Boolean*/
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  location: string
  @IsNotEmpty()
  @IsBoolean()
  wasGood: boolean;
}
