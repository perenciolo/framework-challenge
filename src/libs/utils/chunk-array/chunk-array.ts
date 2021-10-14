import { ChunkArrayResult } from './types';

export function chunkArray<T>(_arrayToChunk: T[] = [], chunkSize: number) {
  const arrayToChunk = [..._arrayToChunk];
  const chunk: ChunkArrayResult<T[]> = {};
  let idx = 0;

  while (arrayToChunk.length) {
    chunk[idx] = arrayToChunk.splice(0, chunkSize);
    idx = idx + 1;
  }

  return chunk;
}
