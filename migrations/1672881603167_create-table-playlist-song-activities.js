/* eslint-disable quotes */
/* eslint-disable camelcase */

// exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("playlist_song_activities", {
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
    id_user: {
      type: "VARCHAR(50)",
    },
    action: {
      type: "VARCHAR(30)",
    },
    time: {
      type: "TEXT",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("playlist_song_activities");
};
