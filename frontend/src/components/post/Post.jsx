import { Link } from "react-router-dom";
import "./post.scss";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Comments from "../comments/Comments";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => {
        return res.data;
      }),
  });

  const {
    isLoading: isLoadingC,
    error: errorC,
    data: dataC,
  } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + post.id).then((res) => {
        return res.data;
      }),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["likes"]);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleClick = async () => {
    try {
      if (data.includes(currentUser.id)) {
        await makeRequest.post("/history", {
          userId: post.userId,
          log: "UnLike post of",
        });
      } else
        await makeRequest.post("/history", {
          userId: post.userId,
          log: "Like post of",
        });
    } catch (err) {
      console.log(err);
    }

    mutation.mutate(data.includes(currentUser.id));
  };

  const handlePost = () => {
    deletePostMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <Link
              to={`/profile/${post.userId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={post.avatarHead} alt="" />
            </Link>
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdTime).fromNow()}</span>
            </div>
          </div>
          <div className="menu">
            {post.userId === currentUser.id && (
              <MoreHorizOutlinedIcon onClick={() => setMenuOpen(!menuOpen)} />
            )}
            {menuOpen && (
              <button className="deletePost" onClick={handlePost}>
                <DeleteForeverIcon onClick={handlePost} /> delete
              </button>
            )}
          </div>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.pic} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "Loading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleClick}
              />
            ) : (
              <FavoriteBorderIcon onClick={handleClick} />
            )}
            {isLoading ? "loading" : `${data.length}`} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <ChatBubbleOutlineOutlinedIcon />
            {isLoadingC ? "loading" : `${dataC.length}`} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        <div className="comment">
          {commentOpen && <Comments postId={post.id} />}
        </div>
      </div>
    </div>
  );
};

export default Post;
