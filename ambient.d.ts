/*
  GRAPHQL
*/
declare module 'graphql/language/parser' {
  import { Source, ParseOptions, Document } from 'graphql';
  // XXX figure out how to directly export this method
  function parse(
      source: Source | string,
      options?: ParseOptions
  ): Document;
}

declare module 'graphql/language/printer' {
  function print(ast: any): string;
}