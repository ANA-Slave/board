import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/PostDetail.css";

function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/boards/${id}`)
            .then((resp) => {
                if (!resp.ok) throw new Error("게시글 불러오기에 실패했습니다.");
                return resp.json();
            })
            .then((data) => {
                setPost(data);
                setEditedTitle(data.title);
                setEditedContent(data.content);
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

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        const updatedPost = {
            ...post,
            title: editedTitle,
            content: editedContent,
        };

        fetch(`http://localhost:8080/boards/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPost),
        })
            .then((resp) => {
                if (!resp.ok) throw new Error("게시글 수정에 실패했습니다.");
                alert("게시글이 성공적으로 수정되었습니다.");
                setPost(updatedPost);
                setIsEditing(false);
            })
            .catch((err) => {
                console.error(err);
                alert("게시글 수정 중 오류가 발생했습니다.");
            });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="detail-container">
            {isEditing ? (
                <div>
                    <input
                        className="edit-input"
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        className="edit-textarea"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button className="save-button" onClick={handleSave}>
                        저장
                    </button>
                    <button className="cancel-button" onClick={() => setIsEditing(false)}>
                        취소
                    </button>
                </div>
            ) : (
                <div>
                    <h1 className="detail-title">{post.title}</h1>
                    <p className="detail-info">작성자: {post.writer}</p>
                    <p className="detail-info">작성일: {new Date(post.createdDate).toLocaleString()}</p>
                    <div className="detail-content">{post.content}</div>
                    <div className="button-container">
                        <button className="edit-button" onClick={handleEdit}>
                            수정
                        </button>
                        <button className="delete-button" onClick={handleDelete}>
                            삭제
                        </button>
                        <button
                            className="return-button"
                            onClick={() => navigate("/list")}
                        >
                            돌아가기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostDetail;
