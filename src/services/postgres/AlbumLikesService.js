/* eslint-disable comma-dangle */
/* eslint-disable camelcase */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");

class AlbumLikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
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

    await this._cacheService.delete(`album-likes:${albumId}`);

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

    await this._cacheService.delete(`album-likes:${albumId}`);

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
    try {
      // mendapatkan data dari cache
      const result = await this._cacheService.get(`album-likes:${albumId}`);
      return {
        dataSource: "cache",
        likes: JSON.parse(result),
      };
    } catch (error) {
      // bila gagal, diteruskan dengan mendapatkan data dari database
      const query = {
        text: "SELECT COUNT(*) AS count FROM user_album_likes WHERE id_album = $1",
        values: [albumId],
      };
      const result = await this._pool.query(query);

      const jumlah = parseInt(result.rows[0].count, 10);

      // data dari db  disimpan pada cache sebelum fungsi getCountLikedAlbum dikembalikan
      await this._cacheService.set(
        `album-likes:${albumId}`,
        JSON.stringify(jumlah)
      );

      return {
        dataSource: "database",
        likes: jumlah,
      };
    }
  }
}

module.exports = AlbumLikesService;
