import { store } from '../../app/store';
import { fetchPosts } from './fetch-posts';
import { removePost } from './post-slice';
import { selectPosts, selectPostsErrors, selectPostsErrorsStatus, selectPostsStatus } from '.';

describe('PostSlice', () => {
  const unmockedFetch = global.fetch;

  const initialState = {
    list: {},
    error: null,
    status: 'idle' as 'loading' | 'idle',
  };

  const postsMock = Array(6)
    .fill(null)
    .map((_, id) => ({ id, title: `some title ${id}`, body: `some body ${id}` }));

  afterEach(() => {
    global.fetch = unmockedFetch;
  });

  it('should initialize the state correctly', () => {
    const state = store.getState().posts;
    expect(state).toEqual(initialState);
  });

  it('should initialize the state correctly', async () => {
    global.fetch = jest.fn().mockReturnValue(
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(postsMock),
      })
    );

    await store.dispatch(fetchPosts());

    expect(store.getState().posts).toEqual({
      list: {
        '0': [
          { id: 0, title: 'some title 0', body: 'some body 0' },
          { id: 1, title: 'some title 1', body: 'some body 1' },
          { id: 2, title: 'some title 2', body: 'some body 2' },
          { id: 3, title: 'some title 3', body: 'some body 3' },
          { id: 4, title: 'some title 4', body: 'some body 4' },
        ],
        '1': [{ id: 5, title: 'some title 5', body: 'some body 5' }],
      },
      error: null,
      status: 'idle',
    });
  });

  it('should remove post from list when calling the remove reducer', async () => {
    global.fetch = jest.fn().mockReturnValue(
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(postsMock),
      })
    );

    await store.dispatch(fetchPosts());
    store.dispatch(removePost({ id: '3' }));

    expect(selectPosts(store.getState())).toEqual({
      '0': [
        { id: 0, title: 'some title 0', body: 'some body 0' },
        { id: 1, title: 'some title 1', body: 'some body 1' },
        { id: 2, title: 'some title 2', body: 'some body 2' },
        { id: 4, title: 'some title 4', body: 'some body 4' },
        { id: 5, title: 'some title 5', body: 'some body 5' },
      ],
    });
  });

  test.each`
    message      | status       | expected
    ${'fail'}    | ${404}       | ${'fail'}
    ${undefined} | ${undefined} | ${'Failed to fetch Posts.'}
  `('should handle fetching errors', async ({ message, status, expected }) => {
    global.fetch = jest.fn().mockReturnValue(
      Promise.reject({
        ok: false,
        status,
        json: () => Promise.resolve({ message }),
      })
    );

    await store.dispatch(fetchPosts());
    const errors = selectPostsErrors(store.getState());
    const errorsStatus = selectPostsErrorsStatus(store.getState());
    const statusRes = selectPostsStatus(store.getState());

    expect(errors).toBe(expected);
    expect(errorsStatus).toBe(status ?? 500);
    expect(statusRes).toBe('idle');
  });
});
