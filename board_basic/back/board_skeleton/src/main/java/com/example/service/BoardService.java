package com.example.service;


import com.example.dto.PostDto;
import com.example.entity.Post;
import com.example.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public List<Post> getAllPosts() {
        return boardRepository.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        return boardRepository.findById(id);
    }


    /**
     * post를 추가합니다.
     * @param postDto
     * @return
     */
    public Post createPost(PostDto postDto) {
        Post post = Post.builder()
                .title(postDto.getTitle())
                .writer(postDto.getWriter())
                .content(postDto.getContent())
                .createdDate(LocalDateTime.now())
                .modifiedDate(LocalDateTime.now())
                .build();
        return boardRepository.save(post);
    }


    /**
     * post를 수정합니다.
     * @param id
     * @param postDto
     * @return
     */

    public boolean updatePost(Long id, PostDto postDto) {
        Optional<Post> postOptional = boardRepository.findById(id);
        if(postOptional.isPresent()) {
            Post exitingPost = postOptional.get();
            exitingPost.setTitle(postDto.getTitle());
            exitingPost.setContent(postDto.getContent());
            exitingPost.setModifiedDate(LocalDateTime.now());
            boardRepository.save(exitingPost);
            return true;
        }
        return false;
    }


    /**
     * post를 삭제합니다.
     * @param id
     * @return
     */
    public boolean deletePost(Long id) {
        if(boardRepository.existsById(id)) {
            boardRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
