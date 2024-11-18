import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/PostDetail.css";

function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/boards/${id}`)
            .then((resp) => {
                if (!resp.ok) throw new Error("게시글 불러오기에 실패했습니다.");
                return resp.json();
            })
            .then((data) => {
                setPost(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        if (!window.confirm("정말로 삭제하시겠습니까?")) return;

        fetch(`http://localhost:8080/boards/${id}`, {
            method: "DELETE",
        })
            .then((resp) => {
                if (!resp.ok) throw new Error("게시글 삭제에 실패했습니다.");
                alert("게시글이 성공적으로 삭제되었습니다.");
                navigate("/list");
            })
            .catch((err) => {
                console.error(err);
                alert("게시글 삭제 중 오류가 발생했습니다.");
            });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="detail-container">
            <h1 className="detail-title">{post.title}</h1>
            <p className="detail-info">작성자: {post.writer}</p>
            <p className="detail-info">작성일: {new Date(post.createdDate).toLocaleString()}</p>
            <div className="detail-content">{post.content}</div>
            <button className="delete-button" onClick={handleDelete}>삭제</button>
        </div>
    );
}

export default PostDetail;
