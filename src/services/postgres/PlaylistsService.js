/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const AuthorizationError = require("../../exceptions/AuthorizationError");
const { mapToModelPlaylists, mapToModelPlaylistById } = require("../../utils");

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylist({ name, owner }) {
    const playlist_id = `playlist-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO playlists VALUES($1, $2, $3) RETURNING playlist_id",
      values: [playlist_id, name, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].playlist_id) {
      throw new InvariantError("Playlist gagal ditambahkan");
    }
    return result.rows[0].playlist_id;
  }

  async getPlaylists(owner) {
    const query = {
      text: `SELECT a.playlist_id, a.name, b.username 
            FROM playlists AS a
            INNER JOIN users AS b ON a.owner = b.id 
            WHERE owner = $1`,
      values: [owner],
    };
    const result = await this._pool.query(query);
    return result.rows.map(mapToModelPlaylists);
  }

  async getPlaylistById(playlist_id) {
    const query = {
      text: `SELECT a.playlist_id, a.name, b.username 
            FROM playlists AS a 
            INNER JOIN users AS b ON a.owner = b.id 
            WHERE a.playlist_id = $1`,
      values: [playlist_id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Playlist tidak ditemukan");
    }
    // return result.rows.map(mapToModelAlbum)[0];
    return mapToModelPlaylistById(result.rows[0]);
  }

  async deletePlaylistById(playlist_id) {
    const query = {
      text: "DELETE FROM playlists WHERE playlist_id = $1 RETURNING playlist_id",
      values: [playlist_id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Playlist gagal dihapus. Id tidak ditemukan");
    }
  }

  async verifyPlaylistOwner(playlist_id, owner) {
    const query = {
      text: "SELECT * FROM playlists WHERE playlist_id = $1",
      values: [playlist_id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Playlist tidak ditemukan");
    }

    const playlist = result.rows[0];

    if (playlist.owner !== owner) {
      throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
    }
  }
}

module.exports = PlaylistsService;
