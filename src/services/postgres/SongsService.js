/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapToModelSongs, mapToModelSongBy } = require("../../utils");

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({ title, year, genre, performer, duration, albumId }) {
    const song_id = `song-${nanoid(16)}`;

    const query = {
      text: "INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING song_id",
      values: [song_id, title, year, genre, performer, duration, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].song_id) {
      throw new InvariantError("Lagu gagal ditambahkan");
    }
    return result.rows[0].song_id;
  }

  async getSongs(title, performer) {
    const query = {
      text: `SELECT * FROM songs WHERE lower(title) LIKE '%${title}%' AND lower(performer) LIKE '%${performer}%'`,
    };
    const result = await this._pool.query(query);
    return result.rows.map(mapToModelSongs);
  }

  async getSongById(song_id) {
    const query = {
      text: "SELECT * FROM songs WHERE song_id = $1",
      values: [song_id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Lagu tidak ditemukan");
    }

    // return result.rows.map(mapToModelSongBy)[0];
    return mapToModelSongBy(result.rows[0]);
  }

  async editSongById(
    song_id,
    { title, year, genre, performer, duration, albumId }
  ) {
    const query = {
      text: "UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, id_album = $6 WHERE song_id = $7 RETURNING song_id",
      values: [title, year, genre, performer, duration, albumId, song_id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Gagal memperbarui Lagu. Id tidak ditemukan");
    }
  }

  async deleteSongById(song_id) {
    const query = {
      text: "DELETE FROM songs WHERE song_id = $1 RETURNING song_id",
      values: [song_id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Lagu gagal dihapus. Id tidak ditemukan");
    }
  }

  async getSongByAlbum(album_id) {
    const query = {
      text: "SELECT * FROM songs WHERE id_album = $1",
      values: [album_id],
    };

    const result = await this._pool.query(query);
    return result.rows.map(mapToModelSongs);
  }
}

module.exports = SongsService;
