import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/header";
import Sidebar from "../../Components/Sidebar/sidebar";
import Post from "../../Components/Post/post";
import Suggestions from "../../Components/Suggestions/suggestions";
import Message from "../../Components/Message/message";
import PostInput from "../../Components/PostInput/postInput";
import ThemeModal from "../../Components/ThemeModal/themeModal";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#F4EFE9");
  const [textColor, setTextColor] = useState("#6B4DE6");
  const [fontSize, setFontSize] = useState(16);

  // Obter dados do usuário do localStorage
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    console.log(user);
    
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Erro ao buscar posts:", error));
  }, []);

  const handlePostSubmit = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor }}>
      <Header backgroundColor={backgroundColor} textColor={textColor} />
      <div
        className="flex flex-1 overflow-hidden"
        style={{ color: textColor, fontSize: `${fontSize}px` }}
      >
        <Sidebar
          openModal={openModal}
          backgroundColor={backgroundColor}
          textColor={textColor}
          user={user}
        />

        <div className="flex-1 flex flex-col p-4">
          <PostInput textColor={textColor} onPostSubmit={handlePostSubmit} />
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    textColor={textColor}
                    backgroundColor={backgroundColor}
                    username={post.username} // Alterado para usar o username do post
                    userId={post.userId} // Alterado para usar o userId do post
                    name={post.name} // Adicione o nome do autor aqui, se necessário
                  />
                ))
              ) : (
                <p>Nenhum post disponível.</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/4 space-y-4 p-4">
          <Message backgroundColor={backgroundColor} textColor={textColor} />
          <Suggestions
            backgroundColor={backgroundColor}
            textColor={textColor}
            loggedInUserId={user?.id}
          />
        </div>
      </div>

      <ThemeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={(bgColor, txtColor, fSize) => {
          setBackgroundColor(bgColor);
          setTextColor(txtColor);
          setFontSize(fSize);
          closeModal();
        }}
      />
    </div>
  );
}

export default Home;
