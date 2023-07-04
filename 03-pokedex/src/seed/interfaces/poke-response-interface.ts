export interface IResponsePokemonApi {
  count: number;
  next: string;
  previous: null;
  results: IResult[];
}

export interface IResult {
  name: string;
  url: string;
}
