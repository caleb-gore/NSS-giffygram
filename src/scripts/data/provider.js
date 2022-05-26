// query selector -> main element -> id 'container' //
const mainContainer = document.querySelector("#container");

// application state //
const applicationState = {};

// API //
const API = "http://localhost:8088";

/* <===> <===> FUNCTIONS (POST) <===> <===> */

// function -> save user to API-> exported //
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

// function -> save post to API (posts) -> exported //
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

// function -> save post to API (deletedPosts) -> exported //
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

// function -> save message to API -> exported //
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
/* END */

/* <===> <===> FUNCTIONS (FETCH) <===> <===> */

// function -> fetch user from API-> exported //
export const fetchUsers = () => {
  return fetch(`${API}/users`)
    .then((response) => response.json())
    .then((users) => {
      applicationState.users = users;
    });
};

// function -> fetch posts from API -> exported //
export const fetchPosts = () => {
  return fetch(`${API}/posts`)
    .then((response) => response.json())
    .then((posts) => {
      applicationState.posts = posts;
    });
};

// function -> fetch messages from API -> exported //
export const fetchMessages = () => {
  return fetch(`${API}/messages`)
    .then((response) => response.json())
    .then((messages) => {
      applicationState.messages = messages;
    });
};
/* END */

/* <===> <===> FUNCTIONS (GETTER) <===> <===> */

// function -> get user from application state -> exported //
export const getUsers = () => {
  return applicationState.users.map((user) => ({ ...user }));
};

// function -> get posts from application state -> exported //
export const getPosts = () => {
  return applicationState.posts.map((post) => ({ ...post }));
};
// function -> get currentUser from application state -> exported //
export const getCurrentUser = () => {
  return { ...applicationState.currentUser };
};

// function -> get messages from application state -> exported //
export const getMessages = () => {
  return applicationState.messages.map((message) => ({ ...message }));
};

// function -> get 'clicked' status of post entry section from application state -> exported //
export const getPostEntryClicked = () => {
  return applicationState.postEntryClicked;
};
// function -> get 'clicked' status of new message button from application state -> exported //
export const getNewMessageClicked = () => {
  return applicationState.newMessageClicked;
};

// function -> get 'clicked' status of inbox button from application state -> exported //
export const getInboxOpen = () => {
  return applicationState.inboxOpen;
};
/* END */

/* <===> <===> FUNCTIONS (SETTER) <===> <===> */

// --- set current user in application state -> exported --- //
export const setCurrentUser = (userObj) => {
  applicationState.currentUser = userObj;
};

// set 'clicked' status of post entry button in application state -> exported //
export const setPostEntryClicked = (boolean) => {
  applicationState.postEntryClicked = boolean;
  mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
};

// set 'clicked' status of new message button in application state -> exported //
export const setNewMessageClicked = (boolean) => {
  applicationState.newMessageClicked = boolean;
  mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
};

// function -> set 'clicked' status of inbox button in application state -> exported //
export const setInboxOpen = (boolean) => {
  applicationState.inboxOpen = boolean;
  if (boolean === true) {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  }
};

/* END */

/* <===> <===> FUNCTIONS (DELETE) <===> <===> */

// function -> delete post from API //
export const deletePost = (id) => {
  return fetch(`${API}/posts/${id}`, { method: "DELETE" }).then(() => {
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
  });
};
/* END */

/* <===> <===> FUNCTIONS (PATCH) <===> <===> */

// function -> patch read property from false //
export const setMessageToRead = (id) => {
  const fetchOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      read: true
    }),
  };

  return fetch(`${API}/messages/${id}`, fetchOptions)
    .then((response) => response.json())
    .then(() => {
      mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
    });
}