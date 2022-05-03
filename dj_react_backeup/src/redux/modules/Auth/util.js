export const getUserIdFromToken = (token) => {
  let decodedData = decodeToken(token);

  if (decodedData && decodedData.id) {
    return decodedData.id;
  }

  return null;
};

const urlBase64Decode = function (str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0: {
      break;
    }
    case 2: {
      output += "==";
      break;
    }
    case 3: {
      output += "=";
      break;
    }
    default: {
      throw new Error("Illegal base64url string!");
    }
  }
  return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
};

const decodeToken = function (token) {
  var parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("JWT must have 3 parts");
  }

  var decoded = urlBase64Decode(parts[1]);
  if (!decoded) {
    throw new Error("Cannot decode the token");
  }

  return JSON.parse(decoded);
};
