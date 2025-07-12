const username = localStorage.getItem("username");
const token = localStorage.getItem("token");

if (!token) {
  alert("⚠️ You must login first!");
  window.location.href = "index.html";
}

document.getElementById("user-name").innerText = username;

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}
