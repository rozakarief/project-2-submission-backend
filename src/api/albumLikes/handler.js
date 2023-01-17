/* eslint-disable camelcase */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
class AlbumLikesHandler {
  constructor(service, albumService) {
    this._service = service;
    this._albumService = albumService;
  }

  async postAlbumLikedHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { albumId } = request.params;

    await this._albumService.getAlbumById(albumId);

    const isCount = await this._service.cekLikedAlbum(userId, albumId);

    if (isCount > 0) {
      this.pesan = await this._service.deleteLikedAlbum(userId, albumId);
    } else {
      this.pesan = await this._service.addLikedAlbum(userId, albumId);
    }

    const response = h.response({
      status: "success",
      message: this.pesan,
    });

    response.code(201);
    return response;
  }

  async getCountAlbumLikedHandler(request, h) {
    const { albumId } = request.params;
    const countLikes = await this._service.getCountLikedAlbum(albumId);
    const response = h.response({
      status: "success",
      data: {
        likes: countLikes,
      },
    });

    response.code(200);
    return response;
  }
}

module.exports = AlbumLikesHandler;
