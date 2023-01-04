/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable camelcase */

// exports.shorthands = undefined;

exports.up = (pgm) => {
  // memberikan constraint foreign key pada album terhadap kolom album_id dari tabel albums
  pgm.addConstraint(
    "songs",
    "fk_songs.albums.id",
    "FOREIGN KEY(id_album) REFERENCES albums(album_id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  // menghapus constraint fk_songs.albums.id pada tabel songs
  pgm.dropConstraint("songs", "fk_songs.albums.id");
};
