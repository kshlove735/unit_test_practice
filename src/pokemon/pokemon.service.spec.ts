import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpModule } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import exp from 'constants';

describe('PokemonService', () => {
  let pokemonService: PokemonService; // renamed variable to pokemonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],  // import HttpModule
      providers: [PokemonService],
    }).compile();

    pokemonService = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(pokemonService).toBeDefined();
  });


  describe('getPokemon', () => {
    // 1. id가 1 보다 작으면 return a BadRequestException
    it('pokemon ID less than 1 should throw error', async () => {
      const getPokemon = pokemonService.getPokemon(0);
      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
    })

    // 2. id가 151 보다 크면 return a BadRequestException
    it('pokemon ID bigger than 151 should throw error', async () => {
      const getPokemon = pokemonService.getPokemon(152);
      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
    })

    // 3. api와 호출한 data가 예상과 다르면 return a InternalServerErrorException
    it('valid pokemon ID to return the pokemon name', async () => {
      const getPokemon = pokemonService.getPokemon(1);
      await expect(getPokemon).resolves.toBe('bulbasaur')
    })
  })

});
