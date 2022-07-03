package com.ervaergul.BookstoreBackend.Book;

import com.ervaergul.BookstoreBackend.Book.DTOs.BookDTO;
import com.mysql.cj.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/books")
@Validated
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping
    public ResponseEntity<Object> createBook(@Valid @RequestBody BookDTO bookDTO) {
        return new ResponseEntity<>(bookService.createBook(bookDTO), HttpStatus.CREATED);
    }

    @GetMapping(value = {"", "/{attributeToSearchBy}={searchParameter}"})
    public ResponseEntity<Object> findBook(@PathVariable(required = false) String attributeToSearchBy,
                                           @PathVariable(required = false) String searchParameter) {

        boolean bothPathVariablesAreNotEmpty = (!StringUtils.isNullOrEmpty(attributeToSearchBy) && !StringUtils.isNullOrEmpty(searchParameter));

        if (bothPathVariablesAreNotEmpty) {
            return switch (attributeToSearchBy) {
                case "name" -> new ResponseEntity<>(bookService.findBookByName(searchParameter), HttpStatus.OK);
                case "author" -> new ResponseEntity<>(bookService.findBookByAuthor(searchParameter), HttpStatus.OK);
                case "type" -> new ResponseEntity<>(bookService.findBookByType(searchParameter), HttpStatus.OK);
                default ->
                        new ResponseEntity<>(attributeToSearchBy + " is not a valid attribute to search by", HttpStatus.BAD_REQUEST);
            };
        }

        return new ResponseEntity<>(bookService.findAllBooks(), HttpStatus.OK);
    }

    @PutMapping("/{bookId}/{attributeToUpdate}={newValue}")
    public ResponseEntity<Object> updateBook(@PathVariable @NotNull @Positive Long bookId,
                                             @PathVariable @NotBlank String attributeToUpdate,
                                             @PathVariable @NotNull @Positive Long newValue) {

        return switch (attributeToUpdate) {
            case "price" -> new ResponseEntity<>(bookService.setBookPrice(bookId, newValue), HttpStatus.OK);
            case "stock" -> new ResponseEntity<>(bookService.setBookStock(bookId, newValue), HttpStatus.OK);
            default ->
                    new ResponseEntity<>(attributeToUpdate + " is not a valid attribute to update", HttpStatus.BAD_REQUEST);
        };

    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<Object> deleteBook(@PathVariable @NotNull @Positive Long bookId) {
        return new ResponseEntity<>(bookService.deleteBook(bookId), HttpStatus.OK);
    }

}