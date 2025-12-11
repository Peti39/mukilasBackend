import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateToyDto {
  /**name String
  material Material
  wheight Float */
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  material: 'wood' | 'metal' | 'plastic' | 'other';
  @IsNotEmpty()
  @IsNumber()
  @Min(0.1)

  wheight: number;
}
