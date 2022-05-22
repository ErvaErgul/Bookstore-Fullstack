package com.ervaergul.BookstoreBackend.Book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book,Long> {

    List<Book> findByNameIgnoreCase(String name);

    List<Book> findByNameContainsIgnoreCase(String name);

    List<Book> findByAuthorIgnoreCase(String author);

    List<Book> findByAuthorContainsIgnoreCase(String author);

    List<Book> findByTypeIgnoreCase(String author);

}