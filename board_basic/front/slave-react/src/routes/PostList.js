import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/PostList.css";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/boards")
      .then((resp) => resp.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="list-container">
      <h1 className="list-title">Post List</h1>
      <ul>
        {posts.map((post) => (
          <li className="post-item" key={post.id}>
            <Link to={`/list/${post.id}`} className="post-link">
              {post.title} by {post.writer}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/write" className="write-button">Write Post</Link>
    </div>
  );
}

export default PostList;
