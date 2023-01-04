/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable camelcase */

// exports.shorthands = undefined;

exports.up = (pgm) => {
  // memberikan constraint foreign key pada owner terhadap kolom id dari tabel users
  pgm.addConstraint(
    "playlists",
    "fk_playlists.owner.id",
    "FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  // menghapus constraint fk_playlists.owner.id pada tabel playlists
  pgm.dropConstraint("playlists", "fk_playlists.owner.id");
};
