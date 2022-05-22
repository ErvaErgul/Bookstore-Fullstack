package com.ervaergul.BookstoreBackend.Book.Requests;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class BookDTO {

    @NotBlank(message = "Name must be specified")
    private String name;

    @NotBlank(message = "Author must be specified")
    private String author;

    @NotBlank(message = "Type must be specified")
    private String type;

    @NotNull(message = "Price must be specified")
    @Positive(message = "Price must be a positive number")
    private Long price;

    @NotNull(message = "Stock must be specified")
    @Positive(message = "Stock must be a positive number")
    private Long stock;

}

