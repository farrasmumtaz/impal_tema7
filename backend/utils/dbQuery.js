const db = require("../config/db");

async function safeQuery(sql, params = []) {
  try {
    return await db.execute(sql, params);
  } catch (err) {
    console.error("DB ERROR:", err.code);

    if (
      err.code === "PROTOCOL_CONNECTION_LOST" ||
      err.code === "ECONNRESET" ||
      err.code === "ETIMEDOUT"
    ) {
      console.log("Retrying query...");
      return await db.execute(sql, params);
    }

    throw err;
  }
}

module.exports = safeQuery;