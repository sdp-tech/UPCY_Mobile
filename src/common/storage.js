import * as Keychain from 'react-native-keychain';
import axios from 'axios';

async function getSecureValue(key) {
  const result = await Keychain.getInternetCredentials(key);
  if (result) {
    return result.password;
  }
  return false;
}

// function setSecureValue(key, value) {
//   // second key can be a random string
//   Keychain.setInternetCredentials(key, key, value);
// }

function setSecureValue(key, value) {
  // key와 value가 존재하는지 확인 후 기본값 설정
  const username = key || "default_username";
  const password = value || "default_password";

  Keychain.setInternetCredentials(key, username, password)
    .then(() => {
      console.log("Credentials saved successfully");
    })
    .catch(error => {
      console.error("Failed to save credentials:", error);
    });
}

function removeSecureValue(key) {
  Keychain.resetInternetCredentials(key);
}

const nicknameKeyName = 'nickname';
const accessTokenKeyName = 'accessToken';
const refreshTokenKeyName = 'refreshToken';

export async function getNickname() {
  return await getSecureValue(nicknameKeyName);
}

export function setNickname(nickname) {
  setSecureValue(nicknameKeyName, nickname);
}

export function removeNickname() {
  removeSecureValue(nicknameKeyName);
}

export async function getAccessToken() {
  const token = await getSecureValue(accessTokenKeyName);
  console.log("Access Token: ", token); // 수정된 부분
  return token;
  // const url = 'https://upcy.co.kr/api/user/token/verify'
  // const response = await axios.get(url, {}, {})
  // console.log("Access Token: ", response.data)
  // return response.data
}

export function setAccessToken(token) {
  setSecureValue(accessTokenKeyName, token);
}

export function removeAccessToken() {
  removeSecureValue(accessTokenKeyName);
}

export async function getRefreshToken() {
  const token = await getSecureValue(refreshTokenKeyName); // refreshToken을 token으로 받아옴
  console.log("Refresh Token: ", token); // 수정된 부분
  return token;
}

export function setRefreshToken(token) {
  setSecureValue(refreshTokenKeyName, token);
}

export function removeRefreshToken() {
  removeSecureValue(refreshTokenKeyName);
}
