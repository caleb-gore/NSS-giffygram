/* <===> <===> IMPORTS <===> <===> */
import { getUsers, saveUser, setCurrentUser } from "../data/provider.js";

// query selector -> main element -> id 'container' //
const mainContainer = document.querySelector("#container");

/* <===> <===> FUNCTIONS <===> <===> */

// function -> build HTML for Login & Sign Up page -> exported to main.js //
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

// function -> set login status to 'authenticated' -> dispatch 'authenticated' event //
const loginUser = (userObj) => {
  localStorage.setItem("loginStatus", "authenticated");
  localStorage.setItem("user", userObj.email)
  mainContainer.dispatchEvent(new CustomEvent("authenticated"));
};
/* END */

/* <===> <===> EVENT LISTENERS <===> <===> */

// event listener -> click -> 'Create Account' -> check if user exists ->save user to API //
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "signUp") {
    // get data from application state //
    const users = getUsers();

    // assign input values to variables //
    const userName = document.querySelector("#signup-name").value;
    const userEmail = document.querySelector("#signup-email").value;
    const userPassword = document.querySelector("#signup-password").value;

    // find current user
    const currentUser = users.find((user) => user.email === userEmail);

    // if current user is in the database...//
    if (currentUser) {
      document.querySelector("#signup-incomplete-text").innerHTML =
        "<p style='color: red'>Someone is already registered with this email address</p>";

      // if current user leaves field(s) blank...//
    } else if (userName === "" || userEmail === "" || userPassword === "") {
      document.querySelector("#signup-incomplete-text").innerHTML =
        "<p style='color: red'>Please complete all fields</p>";

      // if current user is NOT in the database (aka new user)...//
    } else {
      // create new user object...//
      const sendUserToAPI = {
        name: userName,
        email: userEmail,
        password: userPassword,
      };

      // ...send object to the database... //
      saveUser(sendUserToAPI);
      // ...and notify user of successful account creation //
      window.alert("User Account Created Successfully! Please Login.");
    }
  }
});

// event listener -> click -> 'Login' -> check user input against API data //
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "login-btn") {
    // get data from application state //
    const users = getUsers();

    // assign input values to variables //
    const userEmail = document.querySelector("#login-email").value;
    const userPassword = document.querySelector("#login-password").value;

    // find current user //
    const currentUser = users.find(
      (user) => user.email === userEmail && user.password === userPassword
    );

    // if current user is in the database... //
    if (currentUser) {
      setCurrentUser(currentUser);
      loginUser(currentUser);

      // if current user is NOT in the database... //
    } else {
      document.querySelector("#login-incomplete-text").innerHTML =
        "<p style='color: red'>incorrect email or password</p>";
    }
  }
});
