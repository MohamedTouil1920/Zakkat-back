const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/event(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      `${api}/users/login`,
      `${api}/users/register`,
      `${api}/users/verify-email`,
      `${api}/users/reset-password`,
      `${api}/users/forgot-password`,
      `${api}/users/verify`,
    ],
  });
}
async function isRevoked(req, jwt) {
  const payload = jwt.payload;
  //TODO:
  if (payload.role === "Admin") {
    if (
      req.path==="/api/v1/feedbacks/admin") {
        return false
      }
      else if (req.path.startsWith("/api/v1/feedbacks"))
    {
      return true;
    }
    return false;
  }

  if (payload.role === "entreprise") {
    if (
      (req.method === "POST" && req.path === "/api/v1/event")||
      
      {url: /\/api\/v1\/feedbacks(.*)/}

      ) {
      return false;
    }
    return true;
  }
  if (payload.role === "client") {
    if (
      (req.method === "POST" && req.path === "/api/v1/calculate") ||
      (req.method === "PUT" && req.path === "/api/v1/calculate") ||
      req.path === "/api/v1/feedbacks/" ||
      (req.method === "GET" && req.path === "/api/v1/calculate") || {
        url: /\/api\/v1\/feedbacks(.*)/,
      }
    ) {
      return false;
    }
    return true;
  }
  return true;
}

module.exports = authJwt;
