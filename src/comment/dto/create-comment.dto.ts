import { IsNumberString, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;
  @IsNumberString()
  userId: number;
}
