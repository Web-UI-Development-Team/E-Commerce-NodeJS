// alert("Hello Static Files!")
// Select the login form element
const loginForm = document.querySelector("#form");
const registerForm = document.querySelector("#register");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const url = "http://localhost:3000/api/v1/users/login";
  try {
    // Send login data to the server
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Handle the server response
    if (response.ok) {
      console.log('hello');
      const data = await response.json();
      console.log(data.token);

      //save token in cookie or sessionstorage
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("email", data.email);
      window.location.assign("http://localhost:3000/profile.html")
    } else {
      const errorMessage = await response.text();
      console.error("Login failed:", errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
