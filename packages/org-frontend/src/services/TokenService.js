function getLocalRefreshToken() {
  return JSON.parse(localStorage.getItem("org-refresh-token"));
}

function getLocalAccessToken() {
  return JSON.parse(localStorage.getItem("org-access-token"));
}

function updateLocalAccessToken(token) {
  localStorage.setItem("org-access-token", JSON.stringify(token));
}

function updateLocalRefreshToken(token) {
  localStorage.setItem("org-refresh-token", JSON.stringify(token));
}

function getUser() {
  return JSON.parse(localStorage.getItem("org"));
}

function setUser(user) {
  localStorage.setItem("org", JSON.stringify(user));
}

function removeUser() {
  localStorage.removeItem("org");
  localStorage.removeItem("org-access-token");
  localStorage.removeItem("org-refresh-token");
}

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  updateLocalRefreshToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenService;
