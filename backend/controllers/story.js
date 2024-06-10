import moment from "moment";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getStory = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not Logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT id,username,name,avatar,avatarHead,avatarFullbody
FROM (
    SELECT *,
           ROW_NUMBER() OVER (ORDER BY id) AS row_num
    FROM users
) AS all_users
JOIN (
    SELECT FLOOR(RAND() * (SELECT COUNT(*) FROM users)) + 1 AS rand_row_num
) AS RandomRow
ON all_users.row_num = RandomRow.rand_row_num; `;

    // const values = userProfileId ? [userProfileId] : [userInfo.id, userInfo.id];

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
