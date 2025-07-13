window.onload = async () => {
  await loadImages();
  await loadMissions();
};

async function loadImages() {
  const res = await fetch('/uploads');
  const files = await res.json();
  const container = document.getElementById('images');
  container.innerHTML = "";

  files.forEach(file => {
    const div = document.createElement('div');
    div.innerHTML = `
      <img src="/uploads/${file}" width="100%">
      <button onclick="deleteImage('${file}')">🗑️ Delete</button>
    `;
    container.appendChild(div);
  });
}

async function deleteImage(filename) {
  const res = await fetch(`/api/upload/${filename}`, { method: 'DELETE' });
  const data = await res.json();
  alert(data.message);
  loadImages();
}

async function loadMissions() {
  const res = await fetch('/api/operations');
  const data = await res.json();
  const container = document.getElementById('ops');
  container.innerHTML = "";

  data.forEach(m => {
    const card = document.createElement('div');
    card.className = "card";
    card.innerHTML = `<h3>${m.name}</h3><p>${m.description}</p>`;
    container.appendChild(card);
  });
}

async function addMission() {
  const name = document.getElementById('opName').value;
  const desc = document.getElementById('opDesc').value;

  const res = await fetch('/api/operations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description: desc })
  });

  const data = await res.json();
  alert(data.message);
  loadMissions();
}
