package com.ervaergul.BookstoreBackend.Book;

import com.ervaergul.BookstoreBackend.Book.Requests.BookDTO;
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

    @GetMapping(value= {"", "/{attributeToSearchBy}={search}"})
    public ResponseEntity<Object> findBook(@PathVariable(required = false) String attributeToSearchBy,
                                           @PathVariable(required = false) String search) {

        if (!StringUtils.isNullOrEmpty(attributeToSearchBy) && !StringUtils.isNullOrEmpty(search)) {
            switch(attributeToSearchBy) {
                case "name":
                    return new ResponseEntity<>(bookService.findByName(search), HttpStatus.OK);
                case "author":
                    return new ResponseEntity<>(bookService.findByAuthor(search), HttpStatus.OK);
                case "type":
                    return new ResponseEntity<>(bookService.findByType(search), HttpStatus.OK);
                default:
                    return new ResponseEntity<>(attributeToSearchBy + " is not a valid attribute to search by", HttpStatus.BAD_REQUEST);
            }
        }

        return new ResponseEntity<>(bookService.findAll(), HttpStatus.OK);
    }

    @PutMapping("/{id}/{attributeToUpdate}={newValue}")
    public ResponseEntity<Object> updateBook(@PathVariable @NotNull @Positive Long id,
                                             @PathVariable @NotBlank String attributeToUpdate,
                                             @PathVariable @NotNull @Positive Long newValue) {

        switch (attributeToUpdate) {
            case "price":
                return new ResponseEntity<>(bookService.setPrice(id,newValue), HttpStatus.OK);
            case "stock":
                return new ResponseEntity<>(bookService.setStock(id,newValue), HttpStatus.OK);
            default:
                return new ResponseEntity<>(attributeToUpdate + " is not a valid attribute to update", HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteBook(@PathVariable @NotNull @Positive Long id) {
        return new ResponseEntity<>(bookService.deleteBook(id), HttpStatus.OK);
    }

}