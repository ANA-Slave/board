package com.example.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;



@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30)
    @Size(max = 30, message = "제목은 30자 이하로 작성해야 합니다.")
    private String title;

    @Column(nullable = false)
    private String writer;

    @Column(nullable = false, length = 1000)
    @Size(max = 1000, message = "내용은 1000자 이하로 작성해야 합니다.")
    private String content;

    @Column(nullable = false)
    private LocalDateTime createdDate;

    @Column(nullable = false)
    private LocalDateTime modifiedDate;

}
