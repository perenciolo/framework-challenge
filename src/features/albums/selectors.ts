import { RootState } from '../../app/store';

export const selectAlbums = (state: RootState) => state.albums.list;
export const selectAlbumsStatus = (state: RootState) => state.albums.status;
