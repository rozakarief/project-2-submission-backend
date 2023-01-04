/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable max-len */
/* eslint-disable camelcase */

// exports.shorthands = undefined;

exports.up = (pgm) => {
  // memberikan constraint foreign key pada id playlist terhadap kolom playlist id dari tabel playlists
  pgm.addConstraint(
    "playlist_songs",
    "fk_playlist_songs.playlist.id",
    "FOREIGN KEY(id_playlist) REFERENCES playlists(playlist_id) ON DELETE CASCADE"
  );

  //   memberikan constraint foreign key pada id playlist terhadap kolom playlist id dari tabel playlists
  pgm.addConstraint(
    "playlist_songs",
    "fk_playlist_songs.song.id",
    "FOREIGN KEY(id_song) REFERENCES songs(song_id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  // menghapus constraint fk_playlist_songs.playlist.id pada tabel playlist_songs
  pgm.dropConstraint("playlist_songs", "fk_playlist_songs.playlist.id");

  // menghapus constraint fk_playlist_songs.song.id pada tabel playlist_songs
  pgm.dropConstraint("playlist_songs", "fk_playlist_songs.song.id");
};
