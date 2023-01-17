/* eslint-disable camelcase */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");

class AlbumLikesService {
  constructor() {
    this._pool = new Pool();
  }

  async addLikedAlbum(userId, albumId) {
    const id = `album-like-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id",
      values: [id, userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Gagal menyukai Album");
    }

    return "Berhasil menyukai Album";
  }

  async deleteLikedAlbum(userId, albumId) {
    const query = {
      text: "DELETE FROM user_album_likes WHERE id_user = $1 AND id_album = $2 RETURNING id",
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Gagal membatalkan Album yang disukai");
    }

    return "Berhasil membatalkan Album yang disukai";
  }

  async cekLikedAlbum(userId, albumId) {
    const query = {
      text: "SELECT id FROM user_album_likes WHERE id_user = $1 AND id_album = $2",
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    return result.rowCount;
  }

  async getCountLikedAlbum(albumId) {
    const query = {
      text: "SELECT COUNT(*) AS count FROM user_album_likes WHERE id_album = $1",
      values: [albumId],
    };

    const result = await this._pool.query(query);

    return parseInt(result.rows[0].count, 10);
  }
}

module.exports = AlbumLikesService;
