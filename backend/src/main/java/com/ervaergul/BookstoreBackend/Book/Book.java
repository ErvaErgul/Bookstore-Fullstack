package com.ervaergul.BookstoreBackend.Book;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String author;
    @Column(nullable = false)
    private String type;
    @Column(nullable = false)
    private Long price;
    @Column(nullable = false)
    private Long stock;

    public Book(String name, String author, String type, Long price, Long stock) {
        this.name = name;
        this.author = author;
        this.type = type;
        this.price = price;
        this.stock = stock;
    }

}