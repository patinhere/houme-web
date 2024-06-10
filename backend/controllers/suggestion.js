import moment from "moment";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getSuggestion = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not Logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const getTotalUnFollowedQuery = `
      SELECT COUNT(*) as total
      FROM users AS u
      LEFT JOIN relationship AS r ON u.id = r.followedUserId AND r.followerUserId = ?
      WHERE r.followerUserId IS NULL AND u.id != ?
    `;

    db.query(
      getTotalUnFollowedQuery,
      [userInfo.id, userInfo.id],
      (err, result) => {
        if (err) return res.status(500).json(err);

        const totalUnFollowed = result[0].total;
        const randomNum = Math.max(
          0,
          Math.floor(Math.random() * (totalUnFollowed - 6))
        );

        const getSuggestionsQuery = `
        SELECT u.id, u.name, u.avatarHead
        FROM users AS u
        LEFT JOIN relationship AS r ON u.id = r.followedUserId AND r.followerUserId = ?
        WHERE r.followerUserId IS NULL AND u.id != ?
        LIMIT ?, 6
      `;

        db.query(
          getSuggestionsQuery,
          [userInfo.id, userInfo.id, randomNum],
          (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
          }
        );
      }
    );
  });
};
