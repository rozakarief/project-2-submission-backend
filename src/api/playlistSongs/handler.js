/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unreachable */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */

class PlaylistSongsHandler {
  constructor(service, playlistService, activitiesService, validator) {
    this._service = service;
    this._playlistService = playlistService;
    this._activitiesService = activitiesService;
    this._validator = validator;
  }

  async postPlaylistSongHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);

    const { id } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistAccess(id, credentialId);

    await this._service.verifySong({ songId });

    await this._service.addSongInPlaylist({
      id_playlist: id,
      id_song: songId,
    });

    await this._activitiesService.postActivities({
      playlistId: id,
      songId,
      userId: credentialId,
      action: "add",
    });

    const response = h.response({
      status: "success",
      message: "Lagu berhasil ditambahkan pada Playlist",
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistAccess(id, credentialId);

    const playlist = await this._playlistService.getPlaylistById(id);
    const songsPlaylist = await this._service.getSongsByPlaylist(id);
    return {
      status: "success",
      data: {
        playlist: {
          id: playlist.id,
          name: playlist.name,
          username: playlist.username,
          songs: songsPlaylist,
        },
      },
    };
  }

  async deletePlaylistSongHandler(request) {
    this._validator.validatePlaylistSongPayload(request.payload);

    const { id } = request.params; // id = playlist id
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistService.verifyPlaylistAccess(id, credentialId);

    await this._service.deleteSongInPlaylist(songId);

    await this._activitiesService.postActivities({
      playlistId: id,
      songId,
      userId: credentialId,
      action: "delete",
    });

    return {
      status: "success",
      message: "Lagu berhasil dihapus pada Playlist",
    };
  }
}

module.exports = PlaylistSongsHandler;
