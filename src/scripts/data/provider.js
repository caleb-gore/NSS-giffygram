// query selector -> main element -> id 'container' //
const mainContainer = document.querySelector("#container");

// application state //
const applicationState = {};

// API //
const API = "http://localhost:8088";

/* <===> <===> FUNCTIONS (POST) <===> <===> */

// --- save user to API-> exported --- //
export const saveUser = (userObj) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  };

  return fetch(`${API}/users`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

/* <===> <===> FUNCTIONS (FETCH) <===> <===> */

// --- fetch user from API-> exported --- //
export const fetchUsers = () => {
  return fetch(`${API}/users`)
    .then((response) => response.json())
    .then((users) => {
      applicationState.users = users;
    });
};

/* <===> <===> FUNCTIONS (GETTER) <===> <===> */

// --- get user from application state -> exported --- //
export const getUsers = () => {
  return applicationState.users.map((user) => ({ ...user }));
};

export const getCurrentUser = () => {
  return { ...applicationState.currentUser };
};

export const getPostEntryClicked = () => {
  return applicationState.postEntryClicked;
};

export const getNewMessageClicked = () => {
  return applicationState.newMessageClicked;
};
/* <===> <===> FUNCTIONS (SETTER) <===> <===> */

// --- set current user in application state -> exported --- //
export const setCurrentUser = (userObj) => {
  applicationState.currentUser = userObj;
};

export const setPostEntryClicked = (boolean) => {
  applicationState.postEntryClicked = boolean;
  mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setNewMessageClicked = (boolean) => {
  applicationState.newMessageClicked = boolean;
  mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
};
