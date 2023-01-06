/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const mapToModelAlbum = ({ album_id, name, year }) => ({
  album_id,
  name,
  year,
});

const mapToModelSongs = ({ song_id, title, performer }) => ({
  // for get alls
  id: song_id,
  title,
  performer,
});

const mapToModelSongBy = ({
  song_id,
  title,
  year,
  genre,
  performer,
  duration,
  id_album,
}) => ({
  id: song_id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: id_album,
});

const mapToModelPlaylists = ({ playlist_id, name, username }) => ({
  // for get all playlists
  id: playlist_id,
  name,
  username,
});

const mapToModelPlaylistSongs = ({ id_song, title, performer }) => ({
  // for get alls
  id: id_song,
  title,
  performer,
});

const mapToModelPlaylistById = ({ playlist_id, name, username }) => ({
  id: playlist_id,
  name,
  username,
});

const mapToModelActivities = ({
  username,
  title,
  action,
  time,
}) => ({
  username,
  title,
  action,
  time,
});

module.exports = {
  mapToModelAlbum,
  mapToModelSongs,
  mapToModelSongBy,
  mapToModelPlaylists,
  mapToModelPlaylistSongs,
  mapToModelPlaylistById,
  mapToModelActivities,
};
