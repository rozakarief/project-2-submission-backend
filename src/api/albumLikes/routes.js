/* eslint-disable quotes */
const routes = (handler) => [
  {
    method: "POST",
    path: "/albums/{albumId}/likes",
    handler: (request, h) => handler.postAlbumLikedHandler(request, h),
    options: {
      auth: "openmusicsapp_jwt",
    },
  },
  {
    method: "GET",
    path: "/albums/{albumId}/likes",
    handler: (request, h) => handler.getCountAlbumLikedHandler(request, h),
  },
];

module.exports = routes;
