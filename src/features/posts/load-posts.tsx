import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { useTypedSelector } from '../../app/store';
import { fetchPosts, Post, selectPosts, selectPostsStatus } from '.';

import classes from './load-posts.module.scss';

function LoadPosts() {
  const dispatch = useDispatch();
  const status = useTypedSelector(selectPostsStatus);
  const posts = useTypedSelector(selectPosts);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<Post | null>(null);

  useEffect(() => {
    dispatch(fetchPosts(10));
  }, []);

  function handlePaginate(page: number) {
    setCurrentPage(page);
  }

  function handleOpenModal(post: Post) {
    setModalContent(post);
    setIsOpen(true);
  }

  function handleCloseModal() {
    setModalContent(null);
    setIsOpen(false);
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className={classes.postsTitle}>Posts List</h2>
      <div className={classes.postsBox}>
        {posts &&
          posts[currentPage]?.map((post, i) => (
            <button
              onClick={() => handleOpenModal(post)}
              className={classes.postsItem}
              key={post.id + i}
              data-testid="open-modal-btn"
            >
              {post.title}
            </button>
          ))}
        <div className={classes.postsPaginationBox}>
          {posts &&
            Object.keys(posts).map((page) => (
              <button
                onClick={() => handlePaginate(Number(page))}
                key={page}
                className={classNames({
                  [classes.active]: Number(page) === currentPage,
                })}
                data-testid="pagination-btn"
              >
                {Number(page) + 1}
              </button>
            ))}
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
        <div className={classes.modalBox} data-testid="detail-modal">
          {modalContent && (
            <div className={classes.modalContent}>
              <h4>{modalContent.title}</h4>
              <p>{modalContent.body}</p>
              <p>Reference User: {modalContent.userId}</p>
            </div>
          )}
          <div className={classes.closeModalBox}>
            <button
              className={classes.closeModal}
              type="button"
              onClick={handleCloseModal}
              data-testid="close-modal-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default LoadPosts;
