/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapToModelActivities } = require("../../utils");

class ActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async postActivities({ playlistId, songId, userId, action }) {
    const id = `activities-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: "INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
      values: [id, playlistId, songId, userId, action, time],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Aktifitas Playlist gagal ditambahkan");
    }
    return result.rows[0].id;
  }

  async getDetailActivities(playlistId) {
    const query = {
      text: `SELECT b.playlist_id, d.username, c.title, a.action, a.time
            FROM playlist_song_activities AS a
            INNER JOIN playlists AS b ON a.id_playlist = b.playlist_id
            INNER JOIN songs AS c ON a.id_song = c.song_id
            INNER JOIN users AS d ON a.id_user = d.id
            WHERE a.id_playlist = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Aktifitas Playlist tidak ditemukan");
    }

    return result.rows.map(mapToModelActivities);
  }
}

module.exports = ActivitiesService;
