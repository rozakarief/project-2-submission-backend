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

module.exports = { mapToModelAlbum, mapToModelSongs, mapToModelSongBy };
