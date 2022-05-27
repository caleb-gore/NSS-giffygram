/* <===> <===> OUTSIDE CONNECTIONS <===> <===> */

// function imports //
import { getUsers, saveUser, setCurrentUser, loginUser } from "../data/provider.js";

// query selector -> main element -> id 'container' //
const mainContainer = document.querySelector("#container");

/* <===> <===> LOGIN PAGE <===> <===> */

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
    <div id="signUpHTML" class="text-center">
    ${signUpButton()}
    </div>
    `;
};

// function -> create sign up button //
const signUpButton = () => {
  return `<button id="signUpButton" class=" btn btn-primary mb-3" >Click Here To Sign Up</button>`;
};

// function -> create sign up form
const signUpForm = () => {
  return `
  <h1 class="text-center">GiffyGram</h1>
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
// event listener -> click 'Sign Up' button -> opens sign up form
mainContainer.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "signUpButton")
    mainContainer.innerHTML = `${signUpForm()}`;
});

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
      mainContainer.innerHTML = `
      <h1 class="text-center">GiffyGram</h1>
      <h3 class="text-center">
      Sign Up Successfull!</h3>
      <p class ="text-center"> If page does not reload in 5 seconds, refresh your browser.</p>`;
      setTimeout(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
      }, 5000);
    }
  }
});


/* END */

/* <===> <===> EVENT LISTENERS <===> <===> */

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
      setCurrentUser(currentUser); // updates applicationState
      loginUser(currentUser); // updates localStorage

      // if current user is NOT in the database... //
    } else {
      document.querySelector("#login-incomplete-text").innerHTML =
        "<p style='color: red'>incorrect email or password</p>";
    }
  }
});
/* END */
