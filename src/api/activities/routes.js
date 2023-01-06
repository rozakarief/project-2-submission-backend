/* eslint-disable quotes */
const routes = (handler) => [
  {
    method: "GET",
    path: "/playlists/{id}/activities",
    handler: (request, h) => handler.getDetailActivitiesHandler(request, h),
    options: {
      auth: "openmusicsapp_jwt",
    },
  },
];

module.exports = routes;
