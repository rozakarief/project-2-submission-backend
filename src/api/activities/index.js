/* eslint-disable comma-dangle */
/* eslint-disable quotes */
const ActivitiesHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "playlistSongActivities",
  version: "1.0.0",
  register: async (server, { service, playlistService, validator }) => {
    const activitiesHandler = new ActivitiesHandler(
      service,
      playlistService,
      validator
    );
    server.route(routes(activitiesHandler));
  },
};
