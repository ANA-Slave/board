package com.example.controller;

import com.example.dto.PostDto;
import com.example.entity.Post;
import com.example.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequiredArgsConstructor
public class BoardController {


    private final BoardService boardService;

    /**
     * 게시글 목록 조회
     * @return
     */
    @GetMapping("/boards")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = boardService.getAllPosts();
        return ResponseEntity.status(HttpStatus.OK).body(posts);
    }

    @GetMapping("/boards/{number}")
    public ResponseEntity<?> getPostById(@PathVariable Long number) {
        Optional<Post> optionalPost = boardService.getPostById(number);
        if(optionalPost.isPresent()) {
            Post post = optionalPost.get();
            return ResponseEntity.status(HttpStatus.OK).body(post);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
     }


    /**
     * 게시글 작성
     * @param postDto
     * @return
     */
    @PostMapping("/boards")
    public ResponseEntity<String> writePost(@Valid @RequestBody PostDto postDto) {
        boardService.createPost(postDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("게시글을 작성하였습니다.");
    }

    /**
     * 게시글 수정
     * @param number
     * @param postDto
     * @return
     */
    @PutMapping("/boards/{number}")
    public ResponseEntity<String> modifyPost(@PathVariable Long number, @RequestBody PostDto postDto) {
        boolean updated = boardService.updatePost(number, postDto);
        if(updated) {
            return ResponseEntity.status(HttpStatus.OK).body("게시글을 수정하였습니다.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
    }

    /**
     * 게시글 삭제
     * @param number
     * @return
     */
    @DeleteMapping("/boards/{number}")
    public ResponseEntity<?> deletePost(@PathVariable Long number) {
        boolean deleted = boardService.deletePost(number);
        if(deleted) {
            return ResponseEntity.status(HttpStatus.OK).body("게시글을 삭제하였습니다.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다.");
    }






















}
