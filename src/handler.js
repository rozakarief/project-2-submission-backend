/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable camelcase */
/* eslint-disable quotes */
const { nanoid } = require("nanoid");
const albums = require("./albums");

const addAlbumHandler = (request, h) => {
  const { name, year } = request.payload;
  const album_id = nanoid(16);

  const newAlbum = {
    name,
    year,
    album_id,
  };
  albums.push(newAlbum);

  const isSuccess =
    albums.filter((album) => album.album_id === album_id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Album berhasil ditambahkan",
      data: {
        albumId: album_id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Album gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllAlbumsHandler = () => ({
  status: "success",
  data: {
    albums,
  },
});

const getAlbumByIdHandler = (request, h) => {
  const { id } = request.params;
  const album = albums.filter((m) => m.album_id === id)[0];
  if (album !== undefined) {
    return {
      status: "success",
      data: {
        album,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: 'Album tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editAlbumByIdHandler = (request, h) => {
  const { id } = request.params;
  const { name, year } = request.payload;

  const index = albums.findIndex((album) => album.album_id === id);

  if (index !== -1) {
    albums[index] = {
      ...albums[index],
      name,
      year,
    };
    const response = h.response({
      status: "success",
      message: "Album berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui album. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteAlbumByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = albums.findIndex((album) => album.album_id === id);
  if (index !== -1) {
    albums.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Album berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Album gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addAlbumHandler,
  getAllAlbumsHandler,
  getAlbumByIdHandler,
  editAlbumByIdHandler,
  deleteAlbumByIdHandler,
};
