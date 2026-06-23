const Notes = require("../models/Models");

// GET ALL
const getAllNotes = async (req, res) => {
  try {
    const notes = await Notes.findAll({
      order: [['tanggal_dibuat', 'DESC']]
    });
    res.json(notes); // langsung array biar cocok frontend
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE
const createNote = async (req, res) => {
  const { judul, isi } = req.body;

  if (!judul || !isi) {
    return res.status(400).json({ message: "Judul dan isi wajib diisi" });
  }

  try {
    const note = await Notes.create({ judul, isi });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
const getNoteById = async (req, res) => {
  try {
    const note = await Notes.findByPk(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note tidak ditemukan" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
const updateNote = async (req, res) => {
  const { judul, isi } = req.body;

  try {
    const note = await Notes.findByPk(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note tidak ditemukan" });
    }

    await note.update({ judul, isi });

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteNote = async (req, res) => {
  try {
    const note = await Notes.findByPk(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note tidak ditemukan" });
    }

    await note.destroy();

    res.json({ message: "Note berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};