/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // memberikan constraint foreign key pada playlist terhadap kolom playlist_id dari tabel playlists
  pgm.addConstraint(
    "playlist_song_activities",
    "fk_activities.playlist.id",
    "FOREIGN KEY(id_playlist) REFERENCES playlists(playlist_id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  // menghapus constraint fk_activities.playlist.id pada tabel playlist_song_activities
  pgm.dropConstraint("playlist_song_activities", "fk_activities.playlist.id");
};
