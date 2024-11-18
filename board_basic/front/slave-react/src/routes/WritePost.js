import React, { useState } from 'react';
import '../css/WritePost.css';

function WritePost() {
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            title: title,
            writer: writer,
            content: content,
        };
        fetch("http://localhost:8080/boards", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        }).then(() => {
            window.location.href = '/list';
        }).catch((e) => console.error("Error:", e));
    };

    return (
        <div className="write-container">
            <h2 className="write-title">글쓰기 페이지</h2>
            <form className="write-form">
                <input type="text" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
                <input type="text" placeholder="작성자를 입력하세요" value={writer} onChange={(e) => setWriter(e.target.value)} /><br />
                <textarea placeholder="내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)} /><br />
                <button type="submit" className="write-button" onClick={handleSubmit}>글쓰기</button>
            </form>
        </div>
    );
}

export default WritePost;
