function getLocalRefreshToken() {
  return JSON.parse(localStorage.getItem("student-refresh-token"));
}

function getLocalAccessToken() {
  return JSON.parse(localStorage.getItem("student-access-token"));
}

function updateLocalAccessToken(token) {
  localStorage.setItem("student-access-token", JSON.stringify(token));
}

function updateLocalRefreshToken(token) {
  localStorage.setItem("student-refresh-token", JSON.stringify(token));
}

function getUser() {
  return JSON.parse(localStorage.getItem("student"));
}

function setUser(user) {
  localStorage.setItem("student", JSON.stringify(user));
}

function removeUser() {
  localStorage.removeItem("student");
  localStorage.removeItem("student-access-token");
  localStorage.removeItem("student-refresh-token");
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
