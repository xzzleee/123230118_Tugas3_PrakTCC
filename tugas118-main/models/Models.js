const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Notes = sequelize.define('notes', {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  timestamps: true,
  createdAt: 'tanggal_dibuat',
  updatedAt: false
});

module.exports = Notes;