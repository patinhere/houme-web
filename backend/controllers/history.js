import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getHistory = (req, res) => {
  const q = `SELECT TOP 10 * FROM history`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addHistory = (req, res) => {
  const token = req.cookies.accessToken;
  const passiveUserId = req.body.userId ? req.body.userId : NULL;
  const log = req.body.log ? req.body.log : NULL;

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
