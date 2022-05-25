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

export const savePost = (postObj) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObj),
  };

  return fetch(`${API}/posts`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
};

export const archivePost = (postObj) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postObj),
  };

  return fetch(`${API}/deletedPosts`, fetchOptions).then((response) =>
    response.json()
  );
};

export const sendMessageToAPI = (messageObj) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageObj),
  };

  return fetch(`${API}/messages`, fetchOptions)
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

// fetch posts from API -> exported //
export const fetchPosts = () => {
  return fetch(`${API}/posts`)
    .then((response) => response.json())
    .then((posts) => {
      applicationState.posts = posts;
    });
};

/* <===> <===> FUNCTIONS (GETTER) <===> <===> */

// --- get user from application state -> exported --- //
export const getUsers = () => {
  return applicationState.users.map((user) => ({ ...user }));
};

// get posts from application state -> exported //
export const getPosts = () => {
  return applicationState.posts.map((post) => ({ ...post }));
};
// get currentUser from application state -> exported //
export const getCurrentUser = () => {
  return { ...applicationState.currentUser };
};

// get 'clicked' status of post entry section from application state -> exported //
export const getPostEntryClicked = () => {
  return applicationState.postEntryClicked;
};
// get 'clicked' status of new message button from application state -> exported //
export const getNewMessageClicked = () => {
  return applicationState.newMessageClicked;
};
/* END */

/* <===> <===> FUNCTIONS (SETTER) <===> <===> */

// --- set current user in application state -> exported --- //
export const setCurrentUser = (userObj) => {
  applicationState.currentUser = userObj;
};

// set 'clicked' status of post entry section in application state -> exported //
export const setPostEntryClicked = (boolean) => {
  applicationState.postEntryClicked = boolean;
  mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
};

// set 'clicked' status of new message button from application state -> exported //
export const setNewMessageClicked = (boolean) => {
  applicationState.newMessageClicked = boolean;
  mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
};
/* END */

/* <===> <===> FUNCTIONS (DELETE) <===> <===> */

// function -> delete post from API //
export const deletePost = (id) => {
  return fetch(`${API}/posts/${id}`, { method: "DELETE" }).then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  });
};
