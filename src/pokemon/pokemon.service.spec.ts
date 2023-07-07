import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

describe('PokemonService', () => {
  let pokemonService: PokemonService; // renamed variable to pokemonService
  // DeepMocked<HttpService> 타입은 모든 properties와  하위 properties를 자동 완성하게 해준다.
  let httpService: DeepMocked<HttpService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonService,
        // set provide
        {
          provide: HttpService,
          useValue: createMock<HttpService>(),
        },
      ],
    }).compile();

    pokemonService = module.get<PokemonService>(PokemonService);
    httpService = module.get(HttpService);
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

    // 3. api와 호출한 data가 예상한 양식으로 온다면 return data.species.name
    it('valid pokemon ID to return the pokemon name', async () => {
      httpService.axiosRef.mockResolvedValueOnce({
        data: {
          species: { name: 'bulbasaur' }
        },
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      })
      const getPokemon = pokemonService.getPokemon(1);
      await expect(getPokemon).resolves.toBe('bulbasaur')
    })

    // 3. api와 호출한 data가 예상과 다르면 return a InternalServerErrorException
    it('if Pokemon API response unexpectedly changes, throw an error', async () => {
      httpService.axiosRef.mockResolvedValueOnce({
        data: 'Unexpected data',
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      })

      const getPokemon = pokemonService.getPokemon(1);

      await expect(getPokemon).rejects.toBeInstanceOf(InternalServerErrorException);
    })
  })

});
