/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapToModelPlaylistSongs } = require("../../utils");

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  // menambahkan lagu pada playlist
  async addSongInPlaylist({ id_playlist, id_song }) {
    const id = nanoid(16);

    const query = {
      text: "INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id",
      values: [id, id_playlist, id_song],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Lagu gagal ditambahkan pada Playlist");
    }
    return result.rows[0].id;
  }

  // mendapatkan semua lagu berdasarkan playlist
  async getSongsByPlaylist(id_playlist) {
    const query = {
      text: `SELECT a.id_song, b.title, b.performer 
            FROM playlist_songs AS a 
            INNER JOIN songs AS b ON a.id_song = b.song_id 
            WHERE a.id_playlist = $1`,
      values: [id_playlist],
    };
    const result = await this._pool.query(query);
    return result.rows.map(mapToModelPlaylistSongs);
  }

  // menghapus lagu pada playlist
  async deleteSongInPlaylist(id_song) {
    const query = {
      text: `DELETE FROM playlist_songs WHERE id_song = $1 RETURNING id`,
      values: [id_song],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError(
        "Lagu gagal dihapus pada Playlist. Id Lagu tidak ditemukan"
      );
    }
  }

  // cek lagu berdasarkan id lagu
  async verifySong({ songId }) {
    const query = {
      text: "SELECT * FROM songs WHERE song_id = $1",
      values: [songId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Lagu tidak ditemukan");
    }
  }
}

module.exports = PlaylistSongsService;
