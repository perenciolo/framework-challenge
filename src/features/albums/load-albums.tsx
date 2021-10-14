import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../app/store';
import { Album, fetchAlbums, selectAlbums, selectAlbumsStatus } from '.';

import classes from './load-albums.module.scss';

function LoadAlbums() {
  const dispatch = useDispatch();
  const status = useTypedSelector(selectAlbumsStatus);
  const albums = useTypedSelector(selectAlbums);
  const [filtered, setFiltered] = useState<Album[]>([]);
  const [numAlbums, setNumAlbums] = useState(5);

  useEffect(() => {
    dispatch(fetchAlbums(100));
  }, []);

  useEffect(() => {
    setFiltered(albums.slice(0, numAlbums));
  }, [albums]);

  useEffect(() => {
    setFiltered(albums.slice(0, numAlbums));
  }, [numAlbums]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className={classes.albumsTitle}>Albums List</h2>
      <div className={classes.albumsShowingBox}>
        <h3 className={classes.albumsShowingTitle}>
          Showing <span>{numAlbums}</span> albums.
        </h3>
        <div className={classes.albumsQtdSelectorBox}>
          <span className={classes.albumsQtdSelectorLabel}>Number of Albums to show:</span>
          <div className={classes.albumsQtdSelector}>
            <select value={numAlbums} onChange={(e) => setNumAlbums(Number(e.target.value))}>
              <option value={5}>5</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>
      <div className={classes.albumsBox}>
        {filtered.map((album, i) => (
          <div className={classes.albumsItem} key={album.id + i}>
            {album.title}
          </div>
        ))}
      </div>
    </>
  );
}

export default LoadAlbums;
