export type AlbumId = string;

export type Album = {
  userId: string;
  id: AlbumId;
  title: string;
};

export type FetchAlbumsError = {
  message: string;
};

export type AlbumsState = {
  status: 'loading' | 'idle';
  error: string | null;
  list: Album[];
};
