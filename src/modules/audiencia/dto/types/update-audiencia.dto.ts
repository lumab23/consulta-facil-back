import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateAudienciaDto } from './create-audiencia.dto';

export class UpdateAudienciaDto extends PartialType(
  OmitType(CreateAudienciaDto, ['case_id'] as const),
) {}