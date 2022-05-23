import { getUsers, saveUser } from "../data/provider.js";

export const Login = () => {
  return `<h1>GiffyGram</h1>
    <div>
        <h3>Login</h3>
        <div>
            <div>
                <label for="login-email">Email:</label>
                <input type="email" name="login-email" id="login-email" placeholder="jake@statefarm.com">
            </div>
            <div>
                <label for="login-password">Password:</label>
                <input type="password" name="login-password" id="login-password" placeholder="password">
            </div>
            <div id="login-incomplete-text"></div>
        </div>
        <button id="login-btn">Login</button>
    </div>
    <p>or</p>
    <div class="border">
        <h3>Sign Up</h3>
        <div>
            <div>
                <label for="signup-name">Name</label>
                <input type="text" name="signup-name" id="signup-name" placeholder="Jake from State Farm">
                
            </div>
            <div>
                <label for="signup-email">Email:</label>
                <input type="email" name="signup-email" id="signup-email" placeholder="jake@statefarm.com">
            </div>
            <div>
                <label for="signup-password">Password:</label>
                <input type="password" name="signup-password" id="signup-password" placeholder="password">
            </div>
            <div id="signup-incomplete-text"></div>
        </div>
        <button id="signUp">Create Account</button>
    </div>`;
};
/* <===> <===> EVENT LISTENERS <===> <===> */

// click -> 'Create Account' -> check if user exists ->save user to API //
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "signUp") {
    const users = getUsers();
    const userName = document.querySelector("#signup-name").value;
    const userEmail = document.querySelector("#signup-email").value;
    const userPassword = document.querySelector("#signup-password").value;

    const currentUser = users.find((user) => user.email === userEmail);
    if (currentUser) {
        document.querySelector('#signup-incomplete-text').innerHTML = "<p style='color: red'>Someone is already registered with this email address</p>"
    } else if (userName === "" || userEmail === "" || userPassword === "") {
        document.querySelector('#signup-incomplete-text').innerHTML = "<p style='color: red'>Please complete all fields</p>"
    } else {
      const sendUserToAPI = {
        name: userName,
        email: userEmail,
        password: userPassword,
      };
      saveUser(sendUserToAPI);
    }
  }
});

// click -> 'Login' -> check user input against API data //
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "login-btn") {
    const users = getUsers();
    const userEmail = document.querySelector("#login-email").value;
    const userPassword = document.querySelector("#login-password").value;

    // check if user data is in the users array
    const currentUser = users.find(
      (user) => user.email === userEmail && user.password === userPassword
    );
    if (currentUser) {
      window.alert("Login Successful");
    } else {
        document.querySelector('#login-incomplete-text').innerHTML = "<p style='color: red'>incorrect email or password</p>"
    }
  }
});
