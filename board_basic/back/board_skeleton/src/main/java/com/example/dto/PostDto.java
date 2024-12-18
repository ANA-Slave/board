package com.example.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    @NotBlank
    private String title;

    @NotBlank
    private String writer;

    @NotBlank
    private String content;
}
