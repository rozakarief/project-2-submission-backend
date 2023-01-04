/* eslint-disable max-len */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable camelcase */

// exports.shorthands = undefined;

exports.up = (pgm) => {
  // membuat table collaborations
  pgm.createTable("collaborations", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    id_playlist: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    id_user: {
      type: "VARCHAR(50)",
      notNull: true,
    },
  });

  /*
    Menambahkan constraint UNIQUE, kombinasi dari kolom id_playlist dan id_user.
    Guna menghindari duplikasi data antara nilai keduanya.
  */
  pgm.addConstraint(
    "collaborations",
    "unique_id_playlist_and_id_user",
    "UNIQUE(id_playlist, id_user)"
  );

  // memberikan constraint foreign key pada kolom id_playlist dan id_user terhadap playlists.id dan users.id
  pgm.addConstraint(
    "collaborations",
    "fk_collaborations.playlists.id",
    "FOREIGN KEY(id_playlist) REFERENCES playlists(playlist_id) ON DELETE CASCADE"
  );

  pgm.addConstraint(
    "collaborations",
    "fk_collaborations.users.id",
    "FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  // menghapus tabel collaborations
  pgm.dropTable("collaborations");
};
