import axios from "axios";

export async function loginUser(username, password) {
  console.log("making call");
  return axios.post("/api/v1/auth/login", {
    email: username,
    password: password,
  });
}

// export async function getUserByToken(accessToken: string) {
//   return axios.post(
//     `http://openloyalty.dns.army/api/customer/${accessToken}`,
//     {}
//   );
// }

export async function signupUser({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  agreement1,
  agreement2,
}) {
  return axios.post("/api/v1/auth/register", {
    firstName,
    lastName,
    email,
    agreement1,
    agreement2,
    phone: phoneNumber,
    password,
  });
}

export async function getUserDetails(userId) {
  return axios.get(`/api/customer/${userId}`);
}

export async function getUserStatus(userId) {
  return axios.get(`/api/customer/${userId}/status`);
}

export async function activateUserByToken(token) {
  return axios.get(`/api/v1/auth/verifyEmail`, {
    params: {
      token,
    },
  });
}

export async function requestResetPassword(email) {
  const res = await axios.post(`/api/customer/password/reset/request`, {
    username: email,
  });
  return res.data;
}

export async function forgotPassword(email) {
  return axios.post("/api/v1/auth/password/recover", {
    email,
  });
}

export async function resetPassword(password, token) {
  return axios.post("/api/v1/auth/password/recover/reset", {
    password,
    token,
  });
}
