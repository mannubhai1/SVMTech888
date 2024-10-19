document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  // Retrieve stored credentials from localStorage
  const storedPassword = localStorage.getItem(username);

  // Check if the entered credentials match
  if (storedPassword === password) {
    alert(`Welcome, ${username}!`);

    // Store the username in localStorage
    localStorage.setItem("currentUsername", username);

    // Redirect to booking.html
    window.location.href = "booking.html";
  } else {
    alert("Invalid username or password. Please try again.");
  }
});
