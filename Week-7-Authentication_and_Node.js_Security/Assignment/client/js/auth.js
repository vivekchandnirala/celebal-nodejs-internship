let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById("form-title").innerText = isLogin ? "Login" : "Register";
  document.querySelector("button").innerText = isLogin ? "Login" : "Register";
  document.querySelector(".toggle-text").innerHTML = isLogin
    ? `Don't have an account? <span>Register</span>`
    : `Already have an account? <span>Login</span>`;
}

async function handleAuth() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please fill in all fields");
    return;
  }

  const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(`Error: ${data.error}`);
      return;
    }

    if (isLogin) {
      // alert("Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      window.location.href = "./welcome.html";
    } else {
      alert("Registered successfully! Please login.");
      toggleForm();
    }
  } catch (err) {
    alert("Server error. Please try again.");
  }
}
