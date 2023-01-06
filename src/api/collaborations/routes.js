/* eslint-disable quotes */
const routes = (handler) => [
  {
    method: "POST",
    path: "/collaborations",
    handler: (request, h) => handler.postCollaborationHandler(request, h),
    options: {
      auth: "openmusicsapp_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/collaborations",
    handler: (request, h) => handler.deleteCollaborationHandler(request, h),
    options: {
      auth: "openmusicsapp_jwt",
    },
  },
];
module.exports = routes;
