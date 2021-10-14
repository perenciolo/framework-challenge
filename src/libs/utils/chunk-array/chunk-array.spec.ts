import { chunkArray } from '.';

describe('chunkArray', () => {
  const postsArray = [
    {
      userId: 1,
    },
    {
      userId: 2,
    },
    {
      userId: 3,
    },
    {
      userId: 4,
    },
  ];

  it('should convert an array to chunks', () => {
    const result = chunkArray(postsArray, 2);
    expect(result).toEqual({
      0: [
        {
          userId: 1,
        },
        {
          userId: 2,
        },
      ],
      1: [
        {
          userId: 3,
        },
        {
          userId: 4,
        },
      ],
    });
  });

  it('should not fail when array to chunk is undefined', () => {
    const result = chunkArray(undefined, 2);
    expect(result).toEqual({});
  });
});
