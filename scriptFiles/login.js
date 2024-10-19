document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const storedPassword = localStorage.getItem(username);

  if (storedPassword === password) {
    alert(`Welcome, ${username}!`);

    localStorage.setItem("currentUsername", username);

    window.location.href = "booking.html"; // Redirect to Booking page
  } else {
    alert("Invalid username or password. Please try again.");
  }
});
