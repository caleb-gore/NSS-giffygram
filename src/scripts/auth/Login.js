/* <===> <===> IMPORTS <===> <===> */
import { getUsers, saveUser, setCurrentUser } from "../data/provider.js";

// query selector -> main element -> id 'container' //
const mainContainer = document.querySelector("#container");

/* <===> <===> FUNCTIONS <===> <===> */

// function -> build HTML for Login & Sign Up page -> exported to main.js //
export const Login = () => {
  return `<h1 class="text-center">GiffyGram</h1>
    <div class="container border">
        <h3>Login</h3>
        <form>
            <div class="form-group mb-3">
                <label for="login-email">Email:</label>
                <input class="form-control" type="email" name="login-email" id="login-email" placeholder="jake@statefarm.com">
            </div>
                
            <div class="form-group mb-3">
                <label for="login-password">Password:</label>
                <input class="form-control" type="password" name="login-password" id="login-password" placeholder="password">
            </div>
            <div id="login-incomplete-text"></div>
            <button class="btn btn-primary mb-3" id="login-btn">Login</button>
        </form>
    </div>
    <h5 class="text-center">- or -</h5>
    <div class="container border">
        <h3>Sign Up</h3>
        <form>
            <div class="form-group mb-3">
                <label for="signup-name">Name</label>
                <input class="form-control" type="text" name="signup-name" id="signup-name" placeholder="Jake from State Farm">    
            </div>
            <div class="form-group mb-3">
                <label for="signup-email">Email:</label>
                <input class="form-control" type="email" name="signup-email" id="signup-email" placeholder="jake@statefarm.com">
            </div>
            <div class="form-group mb-3">
                <label for="signup-password">Password:</label>
                <input class="form-control" type="password" name="signup-password" id="signup-password" placeholder="password">
            </div>
            <div id="signup-incomplete-text"></div>
            <button class="btn btn-primary mb-3" id="signUp">Create Account</button>
        </form>
    </div>`;
};

// function -> set login status to 'authenticated' -> dispatch 'authenticated' event //
const loginUser = (userObj) => {
  localStorage.setItem("loginStatus", "authenticated");
  localStorage.setItem("user", userObj.email);
  mainContainer.dispatchEvent(new CustomEvent("login"));
};
/* END */

/* <===> <===> EVENT LISTENERS <===> <===> */

// event listener -> click -> 'Create Account' -> check if user exists ->save user to API //
document.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "signUp") {
    // prevent form submission //
    clickEvent.preventDefault();

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
    // prevent form submission //
    clickEvent.preventDefault();

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
/* END */