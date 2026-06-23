const API = '/notes';
let editId = null;

async function getNotes() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    renderNotes(data);
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
}

function renderNotes(data) {
  const container = document.getElementById('notes');
  container.innerHTML = '';

  data.forEach(note => {
    // Memanggil fungsi format tanggal
    const formattedDate = formatDate(note.tanggal_dibuat);

    container.innerHTML += `
      <div class="note-card">
        <h3>${note.judul}</h3>
        <div class="note-date">Dibuat ${formattedDate}</div>
        <div class="note-content">${note.isi}</div>
        <div class="note-id">ID: ${note.id}</div>
        <div class="note-actions">
          <button class="btn-edit" onclick="editNote(${note.id}, \`${note.judul}\`, \`${note.isi}\`)">Edit</button>
          <button class="btn-delete" onclick="deleteNote(${note.id})">Hapus</button>
        </div>
      </div>
    `;
  });
}

// Fungsi untuk membuat format tanggal sesuai permintaan gambar
function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;

  const pad = (n) => n.toString().padStart(2, '0');
  
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  
  return `${day}/${month}/${year}, ${hours}.${minutes}.${seconds}`;
}

function editNote(id, judul, isi) {
  editId = id;
  document.getElementById('judul').value = judul;
  document.getElementById('isi').value = isi;
  document.getElementById('judul').focus();
}

async function saveNote() {
  const judul = document.getElementById('judul').value;
  const isi = document.getElementById('isi').value;

  if (!judul || !isi) return;

  const method = editId ? 'PUT' : 'POST';
  const url = editId ? `${API}/${editId}` : API;

  try {
    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ judul, isi })
    });

    document.getElementById('judul').value = '';
    document.getElementById('isi').value = '';
    editId = null;
    getNotes();
  } catch (error) {
    console.error('Error saving note:', error);
  }
}

async function deleteNote(id) {
  try {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    getNotes();
  } catch (error) {
    console.error('Error deleting note:', error);
  }
}

// Memanggil data awal saat aplikasi dimuat
getNotes();