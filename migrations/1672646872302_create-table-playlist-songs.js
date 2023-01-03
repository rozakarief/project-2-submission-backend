/* eslint-disable quotes */
/* eslint-disable camelcase */

// exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("playlist_songs", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    id_playlist: {
      type: "VARCHAR(50)",
    },
    id_song: {
      type: "VARCHAR(50)",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("playlist_songs");
};
