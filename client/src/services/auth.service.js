import axios from "axios";

const API_URL = "http://localhost:3002/v1/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", { email, password })
      .then((response) => {
        if (response.data.tokens.access) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password,
    });
  }
  
  refreshTokens(tokens) {
    const user = JSON.parse(localStorage.getItem("user"));
    user.tokens = tokens;
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export default new AuthService();