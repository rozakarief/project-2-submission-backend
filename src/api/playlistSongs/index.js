/* eslint-disable comma-dangle */
/* eslint-disable quotes */
const PlaylistSongsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "playlistSongs",
  version: "1.0.0",
  register: async (server, { service, playlistService, validator }) => {
    const playlistSongsHandler = new PlaylistSongsHandler(
      service,
      playlistService,
      validator
    );
    server.route(routes(playlistSongsHandler));
  },
};
