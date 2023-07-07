import { Controller, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Get } from '@nestjs/common';
import { ParsePokemonIdPipe } from 'src/parse-pokemon-id/parse-pokemon-id.pipe';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get(':id')
    getPokemon(@Param('id', ParsePokemonIdPipe) id: number) {
        return this.pokemonService.getPokemon(id);
    }
}
