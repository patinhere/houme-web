import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getAvatar = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM avatar WHERE id=?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};
