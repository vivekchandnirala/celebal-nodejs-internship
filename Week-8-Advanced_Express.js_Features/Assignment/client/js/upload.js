const form = document.getElementById('uploadForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('file');
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Unknown error');

    status.innerText = data.message || '✅ Upload successful!';
    status.style.color = 'green';
  } catch (err) {
    status.innerText = '❌ Upload failed. Try again.';
    status.style.color = 'red';
    console.error('Upload Error:', err.message);
  }
});
