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

// function -> set 'loginStatus' and 'user' in local storage -> dispatch 'login' event //
export const loginUser = (userObj) => {
  localStorage.setItem("loginStatus", "authenticated");
  localStorage.setItem("user", userObj.email);
  mainContainer.dispatchEvent(new CustomEvent("login"));
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

// function -> get 'clicked' status of inbox button from application state -> exported //
export const getInboxIsOpen = () => {
  return applicationState.inboxIsOpen;
};
/* END */

/* <===> <===> FUNCTIONS (SETTER) <===> <===> */

// --- set current user in application state -> exported --- //
export const setCurrentUser = (userObj) => {
  applicationState.currentUser = userObj;
};

export const setInboxToOpen = (boolean) => {
  applicationState.inboxIsOpen = boolean
}




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