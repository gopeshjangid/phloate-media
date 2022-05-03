import axios from "axios";
var FormData = require("form-data");

export async function uploadSong(file) {
  console.log("making call");
  let formaData = new FormData();
  formaData.append("file", file);
  return axios.post("/api/v1/file/media", formaData, {
    "Content-Type": "multipart/form-data",
  });
}

export async function uploadImage(file) {
  console.log("making call");
  let formaData = new FormData();
  formaData.append("file", file);
  return axios.post("/api/v1/file/image", formaData, {
    "Content-Type": "multipart/form-data",
  });
}

export async function getPaymentSession() {
  return axios.post("/api/v1/payment/session", {
    quantity: 1,
  });
}

export async function submitContest(contestDetails) {
  return axios.post("/api/v1/contest/submit", { contestDetails });
}

export async function getSubmittedSongs() {
  const { data } = await axios.get("/api/v1/contest/submissions");
  return data;
}
