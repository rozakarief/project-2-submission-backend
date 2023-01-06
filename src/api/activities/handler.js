/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unreachable */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */

class ActivitiesHandler {
  constructor(service, playlistService, validator) {
    this._service = service;
    this._playlistService = playlistService;
    this._validator = validator;
  }

  async getDetailActivitiesHandler(request) {
    const { id } = request.params; // playlist id
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistOwner(id, credentialId);

    const activities = await this._service.getDetailActivities(id);
    return {
      status: "success",
      data: {
        playlistId: id,
        activities,
      },
    };
  }
}

module.exports = ActivitiesHandler;
