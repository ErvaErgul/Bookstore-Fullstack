package com.ervaergul.BookstoreBackend.Cart;

import com.ervaergul.BookstoreBackend.Book.Book;
import com.ervaergul.BookstoreBackend.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartItemId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(nullable = false)
    private Long amount;

    public CartItem(User user, Book book, Long amount) {
        this.user = user;
        this.book = book;
        this.amount = amount;
    }

}