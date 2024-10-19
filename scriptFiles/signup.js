document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  // Check if both fields are filled
  if (username && password) {
    // Check if the username already exists in localStorage
    const existingUser = localStorage.getItem(username);
    if (existingUser) {
      alert(
        "User already exists. Please choose a different username or log in."
      );
    } else {
      // Store user credentials in localStorage
      localStorage.setItem(username, password);
      alert("Signup successful! You can now log in.");
      window.location.href = "booking.html"; // Redirect to login page
    }
  } else {
    alert("Please fill in both username and password fields.");
  }
});
