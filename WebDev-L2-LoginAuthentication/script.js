// For Register form
const registerForm = document.getElementById("registerForm");

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userName = document.getElementById("name").value;
    const userEmail = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // let users = [];
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find((user) => {
      return user.userEmail === userEmail;
    });
    if (existingUser) {
      alert("Email Already Registered!");
      return;
    }

    if (password.length < 6) {
      alert("password must be at least 6 characters");
      return;
    }
    if (!/\d/.test(password)) {
      //  /\d/ ka matlab hai koi bhi digit (0–9).
      alert("Password must contain at least one number");
      return;
    }
    const hashedPassword = await hashPassword(password);

    users.push({
      userName: userName,
      userEmail: userEmail,
      password: hashedPassword,
    });

    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "login.html";

    alert("user Registered successfully");
    console.log("user Registered successfully");
  });
}
// Login page

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userEmail = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // localStorage.setItem("users", JSON.stringify(users));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user) => {
      console.log(user);
      return user.userEmail === userEmail;
    });
    const hashedPassword = await hashPassword(password);
    if (user && user.password === hashedPassword) {
      console.log("Login successful");
      localStorage.setItem("loggedInUser", user.userEmail);
      localStorage.setItem("loggedInUserName", user.userName);
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid Information!")
      console.log("Invalid username/email or password");
    }
  });
}


// Dashboard 

if (window.location.pathname.endsWith("dashboard.html")) {
   const logoutBtn = document.getElementById("logoutBtn")

    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        window.location.href = "login.html";
    }
    const userName = localStorage.getItem("loggedInUserName")
    document.getElementById("userName").textContent = userName
    if(logoutBtn){
    logoutBtn.addEventListener("click", () =>{
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    })
  }


}