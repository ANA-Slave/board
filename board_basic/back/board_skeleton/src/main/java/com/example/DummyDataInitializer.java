package com.example;


import com.example.entity.Post;
import com.example.repository.BoardRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DummyDataInitializer {


    /**
     * 더미 데이터 추가합니다.
     * 실행하면 자동으로 됩니당
     * @param boardRepository
     * @return
     */
    @Bean
    public CommandLineRunner initDummyData(BoardRepository boardRepository) {
        return args -> {


            boardRepository.deleteAll();

            Post post1 = Post.builder()
                    .title("양영우의 글")
                    .writer("Yang Young Woo")
                    .content("흠 머가 있지 머기있징...파 파이팅 공부 열심히 하려는 친구 동아리 델꼬와서 같이 공부해요...")
                    .createdDate(LocalDateTime.now())
                    .modifiedDate(LocalDateTime.now())
                    .build();
            Post post2 = Post.builder()
                    .title("정민용의 글")
                    .writer("Jeong min yong")
                    .content("ANA Slave 모집중입니다. 언제든 환영")
                    .createdDate(LocalDateTime.now())
                    .modifiedDate(LocalDateTime.now())
                    .build();

            boardRepository.save(post1);
            boardRepository.save(post2);

            System.out.println("더미 데이터 추가 완료");
        };
    }
}
