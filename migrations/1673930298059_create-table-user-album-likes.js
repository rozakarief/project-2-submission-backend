/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable camelcase */

// exports.shorthands = undefined;

exports.up = (pgm) => {
  // membuat table user_album_likes
  pgm.createTable("user_album_likes", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    id_user: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    id_album: {
      type: "VARCHAR(50)",
      notNull: true,
    },
  });

  // memberikan constraint foreign key pada kolom id_user dan id_album terhadap user.id dan album.id
  pgm.addConstraint(
    "user_album_likes",
    "fk_user_album_likes.user.id",
    "FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE"
  );

  pgm.addConstraint(
    "user_album_likes",
    "fk_user_album_likes.album.id",
    "FOREIGN KEY(id_album) REFERENCES albums(album_id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  // menghapus tabel user_album_likes
  pgm.dropTable("user_album_likes");
};
