function getLocalRefreshToken() {
  return JSON.parse(localStorage.getItem("school-refresh-token"));
}

function getLocalAccessToken() {
  return JSON.parse(localStorage.getItem("school-access-token"));
}

function updateLocalAccessToken(token) {
  localStorage.setItem("school-access-token", JSON.stringify(token));
}

function updateLocalRefreshToken(token) {
  localStorage.setItem("school-refresh-token", JSON.stringify(token));
}

function getUser() {
  return JSON.parse(localStorage.getItem("school"));
}

function setUser(user) {
  localStorage.setItem("school", JSON.stringify(user));
}

function removeUser() {
  localStorage.removeItem("school");
  localStorage.removeItem("school-access-token");
  localStorage.removeItem("school-refresh-token");
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
