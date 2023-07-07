import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParsePokemonIdPipe implements PipeTransform {
  transform(value: string): number {
    const id = parseInt(value);
    if (isNaN(id)) {
      throw new BadRequestException('Validation failed (numberic string is expected');
    }
    if (id < 1 || id > 151) {
      throw new BadRequestException('ID must be between 1 to 151');
    }
    return id;
  }
}
