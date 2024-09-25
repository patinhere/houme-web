import moment from "moment";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  const userProfileId = req.query.userId;

  if (!token) return res.status(401).json("Not Logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = userProfileId
      ? `SELECT p.*, u.id AS userId, name, avatarHead FROM posts AS p JOIN users AS u 
      ON (u.id = p.userId) WHERE p.userId=? ORDER BY p.createdTime DESC`
      : `SELECT p.*, u.id AS userId, name, avatarHead FROM posts AS p   
      ORDER BY p.createdTime DESC `;
    // JOIN users AS u
    // ON (u.id = p.userId) LEFT JOIN relationship AS r
    // ON (p.userId = r.followedUserId)  WHERE (r.followerUserId = ? OR p.userId = ?)

    const values = userProfileId ? [userProfileId] : [];
    //userInfo.id, userInfo.id
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not Logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts (`desc`,`pic`,`userId`,`createdTime`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.pic,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created!");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not Logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "DELETE FROM posts WHERE `userId` = ? AND `id` = ?";

    db.query(q, [userInfo.id, req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.status(200).json("Post Deleted!");
      return res.status(403).json("You can delete only your post!");
    });
  });
};
