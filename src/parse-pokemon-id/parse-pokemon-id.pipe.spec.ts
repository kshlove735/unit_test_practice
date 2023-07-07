import { ParsePokemonIdPipe } from './parse-pokemon-id.pipe';
import { BadRequestException } from '@nestjs/common'

describe('ParsePokemonIdPipe', () => {

  let pipe: ParsePokemonIdPipe;

  beforeEach(() => {
    pipe = new ParsePokemonIdPipe();
  })

  it('should be defined', () => {
    expect(new ParsePokemonIdPipe()).toBeDefined();
  });

  it('should throw error for non number', () => {
    const value = () => pipe.transform('hello');
    expect(value).toThrowError(BadRequestException);
  })

  it('should throw error if number less than 1', () => {
    const value = () => pipe.transform("-20");
    expect(value).toThrow(BadRequestException);
  })

  it('should throw error if number greater than 151', () => {
    const value = () => pipe.transform('2000');
    expect(value).toThrow(BadRequestException);
  })

  it('should return number if between 1 to 151', () => {
    const value = () => pipe.transform('2');
    expect(value()).toBe(2)
  })
});
