import React, { useState, useEffect } from "react";
import { FaComments, FaHeart } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";

function Post({ post, textColor, backgroundColor, username, userId }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || 0);
  const [shares, setShares] = useState(post.shares || 0);
  const [loggedInUsername, setLoggedInUsername] = useState(username || "");
  const [loggedInName, setLoggedInName] = useState("");

  useEffect(() => {
    if (!username) {
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      if (storedUserData && storedUserData.username) {
        setLoggedInUsername(storedUserData.username);
        fetchUserData(storedUserData.username);
      }
    } else {
      fetchUserData(username);
    }
  }, [username]);

  const fetchUserData = async (username) => {
    try {
      const response = await fetch("http://localhost:3000/usuarios");
      const users = await response.json();
      const user = users.find((user) => user.username || user.nameGitHub === username);
      if (user) {
        setLoggedInName(user.name || user.nameGitHub);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  const updatePostInDb = async (updatedPost) => {
    try {
      await fetch(`http://localhost:3000/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });
    } catch (error) {
      console.error("Erro ao atualizar o post:", error);
    }
  };

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    const updatedPost = {
      ...post,
      likes: newLikes,
      name: loggedInName,
      username: loggedInUsername,
    };
    updatePostInDb(updatedPost);
  };

  const handleComment = () => {
    const newComments = comments + 1;
    setComments(newComments);
    const updatedPost = {
      ...post,
      comments: newComments,
      name: loggedInName,
      username: loggedInUsername,
    };
    updatePostInDb(updatedPost);
  };

  const handleShare = () => {
    const newShares = shares + 1;
    setShares(newShares);
    const updatedPost = {
      ...post,
      shares: newShares,
      name: loggedInName,
      username: loggedInUsername,
    };
    updatePostInDb(updatedPost);
  };

  const isVideoFile = (filePath) => {
    const videoExtensions = [".mp4", ".webm", ".ogg"];
    return videoExtensions.some((ext) => filePath.endsWith(ext));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
      <div className="flex items-center mb-4">
        <img
          src={post.profileImage}
          alt={loggedInName || "Usuário Desconhecido" }
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <span className="font-semibold">
            {loggedInName || "Usuário Desconhecido"}
          </span>
          <span className="mx-1">&nbsp;</span>
          <span className="text-gray-600">
            @
            {loggedInUsername
              ? loggedInUsername.toLowerCase().replace(" ", "")
              : "usuariodesconhecido"}
          </span>
        </div>
      </div>
      <div>
        {post.postImage && (
          <>
            {isVideoFile(post.postImage) ? (
              <video controls className="w-full rounded-lg mb-4">
                <source
                  src={`http://localhost:4000${post.postImage}`}
                  type="video/mp4"
                />
                Seu navegador não suporta a tag de vídeo.
              </video>
            ) : (
              <img
                src={`http://localhost:4000${post.postImage}`}
                alt="Post content"
                className="w-full rounded-lg mb-4"
              />
            )}
          </>
        )}
        <p className="mb-2">{post.content}</p>
        <div className="mt-4 text-blue-500">{post.hashtags}</div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <div className="flex items-center">
          <FaHeart
            style={{ color: textColor }}
            className="w-6 h-6 cursor-pointer"
            onClick={handleLike}
          />
          <span className="ml-2">{likes}</span>
        </div>
        <div className="flex items-center">
          <FaComments
            style={{ color: textColor }}
            className="w-6 h-6 cursor-pointer"
            onClick={handleComment}
          />
          <span className="ml-2">{comments}</span>
        </div>
        <div className="flex items-center">
          <IoShareSocialSharp
            style={{ color: textColor }}
            className="w-6 h-6 cursor-pointer"
            onClick={handleShare}
          />
          <span className="ml-2">{shares}</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
