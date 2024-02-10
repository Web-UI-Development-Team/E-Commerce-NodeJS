var userName = document.getElementById('name');
var userEmail = document.getElementById('email');

window.addEventListener("load", () => {
    getUsers();
  });
  
  const getUsers = () => {
    const url = "http://localhost:3000/api/v1/users";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json;",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        email = sessionStorage.getItem("email");
        let user = data.find((u)=> u.email === email);

        userName.innerText = user.name;
        userEmail.innerText = user.email;
      });
  };
  