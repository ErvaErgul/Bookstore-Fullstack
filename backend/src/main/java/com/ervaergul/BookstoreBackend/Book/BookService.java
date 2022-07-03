package com.ervaergul.BookstoreBackend.Book;

import com.ervaergul.BookstoreBackend.Book.DTOs.BookDTO;
import com.ervaergul.BookstoreBackend.Exception.CustomExceptions.ConflictException;
import com.ervaergul.BookstoreBackend.Exception.CustomExceptions.NotFoundException;
import com.ervaergul.BookstoreBackend.Exception.CustomExceptions.UnprocessableEntityException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public String createBook(BookDTO bookDTO) {
        List<Book> booksWithSameName = bookRepository.findByNameIgnoreCase(bookDTO.getName());

        /* If there are books with the same name, check matching books to see if the author is the same as well */
        if (!booksWithSameName.isEmpty()) {
            for (Book bookToCheck : booksWithSameName) {
                if (bookToCheck.getAuthor().equalsIgnoreCase(bookDTO.getAuthor())) {
                    throw new UnprocessableEntityException(bookToCheck.getName() + " by " + bookToCheck.getAuthor() + " already exists");
                }
            }
        }

        Book newBook = new Book(bookDTO.getName(), bookDTO.getAuthor(), bookDTO.getType(), bookDTO.getPrice(), bookDTO.getStock());
        bookRepository.save(newBook);
        return newBook + " is now being sold";
    }

    public List<Book> findAllBooks() {
        List<Book> books = bookRepository.findAll();

        if (books.isEmpty()) {
            throw new NotFoundException("There are no books");
        }

        return books;
    }

    public List<Book> findBookByName(String bookName) {
        List<Book> books = bookRepository.findByNameContainsIgnoreCase(bookName);

        if (books.isEmpty()) {
            throw new NotFoundException("There are no books with name: " + bookName);
        }

        return books;
    }

    public List<Book> findBookByAuthor(String bookAuthor) {
        List<Book> books = bookRepository.findByAuthorContainsIgnoreCase(bookAuthor);

        if (books.isEmpty()) {
            throw new NotFoundException("There are no books by author: " + bookAuthor);
        }

        return books;
    }

    public List<Book> findBookByType(String bookType) {
        List<Book> books = bookRepository.findByTypeIgnoreCase(bookType);

        if (books.isEmpty()) {
            throw new NotFoundException("There are no books with type: " + bookType);
        }

        return books;
    }

    public String setBookPrice(Long bookId, Long newPrice) {
        Book bookToUpdate = bookRepository.findById(bookId).orElse(null);

        if (bookToUpdate == null) {
            throw new NotFoundException("There is no book with the id: " + bookId);
        }

        if (bookToUpdate.getPrice().equals(newPrice)) {
            throw new ConflictException(bookToUpdate.getName() + " is already being sold for " + bookToUpdate.getPrice());
        }

        bookToUpdate.setPrice(newPrice);
        bookRepository.save(bookToUpdate);
        return bookToUpdate.getName() + " is now being sold for " + bookToUpdate.getPrice();
    }

    public String setBookStock(Long bookId, Long newStock) {
        Book bookToUpdate = bookRepository.findById(bookId).orElse(null);

        if (bookToUpdate == null) {
            throw new NotFoundException("There is no book with the id: " + bookId);
        }

        if (bookToUpdate.getStock().equals(newStock)) {
            throw new ConflictException(bookToUpdate.getName() + " already has " + bookToUpdate.getStock() + " available stock");
        }

        bookToUpdate.setStock(newStock);
        bookRepository.save(bookToUpdate);
        return bookToUpdate.getName() + " now has " + bookToUpdate.getStock() + " available stock";
    }

    public String deleteBook(Long bookId) {
        Book bookToDelete = bookRepository.findById(bookId).orElse(null);

        if (bookToDelete == null) {
            throw new NotFoundException("There is no book with the id: " + bookId);
        }

        bookRepository.delete(bookToDelete);
        return bookToDelete.getName() + " by " + bookToDelete.getAuthor() + " is no longer being sold";
    }

}