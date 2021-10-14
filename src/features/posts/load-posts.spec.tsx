import { useDispatch } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';

import { useTypedSelector } from '../../app/store';
import { LoadPosts } from '.';

jest.mock('react-redux');

jest.mock('../../app/store');
jest.mock('./load-posts.module.scss', () =>
  [
    'postsTitle',
    'postsBox',
    'postsItem',
    'postsPaginationBox',
    'active',
    'modalBox',
    'modalContent',
    'closeModalBox',
    'closeModal',
  ].reduce((obj: { [key: string]: string }, value: string) => {
    obj[value] = value;
    return obj;
  }, {})
);

describe('LoadPosts', () => {
  const postsMock = {
    0: [
      {
        userId: 1,
        id: 2,
        title: 'Post 1',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      },
      {
        userId: 1,
        id: 3,
        title: 'Post 2',
        body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
      },
    ],
  };
  it('should render loading when data is loading', () => {
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
    (useTypedSelector as jest.Mock).mockReturnValueOnce('loading');
    (useTypedSelector as jest.Mock).mockReturnValueOnce(postsMock);
    render(<LoadPosts />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should render properly', () => {
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
    (useTypedSelector as jest.Mock).mockReturnValueOnce(false);
    (useTypedSelector as jest.Mock).mockReturnValueOnce(postsMock);
    render(<LoadPosts />);
    expect(screen.getByText(/Post 2/i)).toBeInTheDocument();
  });

  it('should handle pagination', () => {
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
    (useTypedSelector as jest.Mock).mockReturnValueOnce('idle');
    (useTypedSelector as jest.Mock).mockReturnValue({
      0: postsMock[0],
      1: [
        {
          userId: 1,
          id: 3,
          title: 'Post 3',
          body: 'e',
        },
        {
          userId: 1,
          id: 4,
          title: 'Post 4',
          body: 'et ',
        },
      ],
    });
    render(<LoadPosts />);
    const paginationBtn = screen.getAllByTestId('pagination-btn');
    fireEvent.click(paginationBtn[1]);
    expect(screen.queryByText(/Post 3/i)).toBeInTheDocument();
    expect(screen.queryByText(/Post 2/i)).not.toBeInTheDocument();
  });

  it('should open modal with correct values when clicking in the post list item', () => {
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
    (useTypedSelector as jest.Mock).mockReturnValueOnce('idle');
    (useTypedSelector as jest.Mock).mockReturnValue(postsMock);
    render(<LoadPosts />);
    const openModalBtn = screen.getAllByTestId('open-modal-btn');
    expect(screen.queryByTestId('detail-modal')).not.toBeInTheDocument();
    fireEvent.click(openModalBtn[1]);
    expect(screen.getByTestId('detail-modal')).toBeInTheDocument();
  });

  it('should close modal when clicking on the button', () => {
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
    (useTypedSelector as jest.Mock).mockReturnValueOnce('idle');
    (useTypedSelector as jest.Mock).mockReturnValue(postsMock);
    render(<LoadPosts />);
    const openModalBtn = screen.getAllByTestId('open-modal-btn');
    expect(screen.queryByTestId('detail-modal')).not.toBeInTheDocument();
    fireEvent.click(openModalBtn[1]);
    expect(screen.getByTestId('detail-modal')).toBeInTheDocument();
    const closeModalBtn = screen.getByTestId('close-modal-btn');
    fireEvent.click(closeModalBtn);
    expect(screen.queryByTestId('detail-modal')).not.toBeInTheDocument();
  });
});
