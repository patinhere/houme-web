import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getHistory = (req, res) => {
  const q = `SELECT h.*, COUNT(*) AS count, u.name AS aName, u.avatarHead AS aHead, p.pName AS passiveName
FROM history AS h
LEFT JOIN users AS u ON h.activeUserId = u.id
LEFT JOIN (
    SELECT h2.passiveUserId AS pId, u2.name AS pName 
    FROM history AS h2
    JOIN users AS u2 ON h2.passiveUserId = u2.id
) AS p ON h.passiveUserId = p.pId
GROUP BY h.id
HAVING COUNT(*) > 0 OR h.passiveUserId IS NULL
ORDER BY h.time DESC
LIMIT 10;`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addHistory = (req, res) => {
  const token = req.cookies.accessToken;
  const passiveUserId = req.body.userId ? req.body.userId : null;
  const log = req.body.log ? req.body.log : "";

  if (!token) return res.status(401).json("Not Logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO history (`time`,`activeUserId`,`passiveUserId`,`log`) VALUES (?)";

    const values = [
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      passiveUserId,
      log,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Add History log!");
    });
  });
};
