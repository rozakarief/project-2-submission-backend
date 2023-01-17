/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
const config = require("../../utils/config");

class UploadsHandler {
  constructor(service, validator, albumService) {
    this._service = service;
    this._validator = validator;
    this._albumService = albumService;
  }

  async postUploadImageHandler(request, h) {
    const { cover } = request.payload;
    const { albumId } = request.params;

    this._validator.validateImageHeaders(cover.hapi.headers);

    const filename = await this._service.writeFile(cover, cover.hapi);

    const fileLoc = `http://${config.app.host}:${config.app.port}/upload/images/${filename}`;

    await this._albumService.addAlbumCoverById(albumId, fileLoc);

    const response = h.response({
      status: "success",
      message: `Sampul berhasil diunggah`,
    });

    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
