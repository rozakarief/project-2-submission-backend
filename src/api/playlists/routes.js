/* eslint-disable quotes */
const routes = (handler) => [
  {
    method: "POST",
    path: "/playlists",
    handler: (request, h) => handler.postPlaylistHandler(request, h),
    options: {
      auth: "openmusicsapp_jwt",
    },
  },
  {
    method: "GET",
    path: "/playlists",
    handler: (request, h) => handler.getPlaylistsHandler(request, h),
    options: {
      auth: "openmusicsapp_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/playlists/{id}",
    handler: (request, h) => handler.deletePlaylistHandler(request, h),
    options: {
      auth: "openmusicsapp_jwt",
    },
  },
];

module.exports = routes;
