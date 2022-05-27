package com.ervaergul.BookstoreBackend.Book;

import com.ervaergul.BookstoreBackend.Book.Requests.BookDTO;
import com.ervaergul.BookstoreBackend.Exception.CustomExceptions.ConflictedUpdateException;
import com.ervaergul.BookstoreBackend.Exception.CustomExceptions.EntityAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Objects;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public String createBook(BookDTO bookDTO) {
        List<Book> booksWithSameName = bookRepository.findByNameIgnoreCase(bookDTO.getName());

        if (!booksWithSameName.isEmpty()) {
            for (Book bookToCheck : booksWithSameName) {
                if (bookToCheck.getAuthor().equalsIgnoreCase(bookDTO.getAuthor())) {
                    throw new EntityAlreadyExistsException(bookToCheck.getName() + " by " + bookToCheck.getAuthor() + " already exists");
                }
            }
        }

        Book newBook = new Book(bookDTO.getName(), bookDTO.getAuthor(), bookDTO.getType(), bookDTO.getPrice(), bookDTO.getStock());
        bookRepository.save(newBook);
        return newBook + " is now being sold";
    }

    public List<Book> findAll() {
        List<Book> books = bookRepository.findAll();

        if(books.isEmpty()) {
            throw new EntityNotFoundException("There are no books");
        }

        return books;
    }

    public List<Book> findByName(String name) {
        List<Book> books = bookRepository.findByNameContainsIgnoreCase(name);

        if(books.isEmpty()) {
            throw new EntityNotFoundException("There are no books with name: " + name);
        }

        return books;
    }

    public List<Book> findByAuthor(String author) {
        List<Book> books = bookRepository.findByAuthorContainsIgnoreCase(author);

        if(books.isEmpty()) {
            throw new EntityNotFoundException("There are no books by author: " + author);
        }

        return books;
    }

    public List<Book> findByType(String type) {
        List<Book> books = bookRepository.findByTypeIgnoreCase(type);

        if(books.isEmpty()) {
            throw new EntityNotFoundException("There are no books with type: " + type);
        }

        return books;
    }

    public String setPrice(Long id, Long newValue) {
        Book bookToUpdate = bookRepository.findById(id).orElse(null);

        if(bookToUpdate == null) {
            throw new EntityNotFoundException("There is no book with the id: " + id);
        }

        if(Objects.equals(bookToUpdate.getPrice(), newValue)) {
            throw new ConflictedUpdateException(bookToUpdate.getName() + " is already being sold for " + bookToUpdate.getPrice());
        }

        bookToUpdate.setPrice(newValue);
        bookRepository.save(bookToUpdate);
        return bookToUpdate.getName() + " is now being sold for " + newValue + "$";
    }

    public String setStock(Long id, Long newValue) {
        Book bookToUpdate = bookRepository.findById(id).orElse(null);

        if(bookToUpdate == null) {
            throw new EntityNotFoundException("There is no book with the id: " + id);
        }

        if(Objects.equals(bookToUpdate.getStock(), newValue)) {
            throw new ConflictedUpdateException(bookToUpdate.getName() + " already has " + bookToUpdate.getStock() + " available stock");
        }

        bookToUpdate.setStock(newValue);
        bookRepository.save(bookToUpdate);
        return bookToUpdate.getName() + " now has " + bookToUpdate.getStock() + " available stock";
    }

    public String deleteBook(Long id) {
        Book bookToDelete = bookRepository.findById(id).orElse(null);

        if (bookToDelete == null) {
            throw new EntityNotFoundException("There is no book with the id: " + id);
        }

        bookRepository.delete(bookToDelete);
        return bookToDelete.getName() + " by " + bookToDelete.getAuthor() + " is no longer being sold";
    }

}