/* eslint-disable quotes */
/* eslint-disable camelcase */

// exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("songs", {
    song_id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    title: {
      type: "VARCHAR(100)",
      notNull: true,
    },
    year: {
      type: "INTEGER",
      notNull: true,
    },
    genre: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    performer: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    duration: {
      type: "INTEGER",
    },
    id_album: {
      type: "VARCHAR(50)",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("songs");
};
