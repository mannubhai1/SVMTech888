document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  if (username && password) {
    const existingUser = localStorage.getItem(username);
    if (existingUser) {
      alert(
        "User already exists. Please choose a different username or log in."
      );
    } else {
      localStorage.setItem(username, password);
      alert("Signup successful! You can now log in.");
      window.location.href = "login.html"; // Redirect to login page
    }
  } else {
    alert("Please fill in both username and password fields.");
  }
});
