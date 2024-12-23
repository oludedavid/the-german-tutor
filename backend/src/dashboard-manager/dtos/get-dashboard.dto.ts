import { IsMongoId } from 'class-validator';

export class GetDashboardDto {
  @IsMongoId()
  readonly owner: string;
}
