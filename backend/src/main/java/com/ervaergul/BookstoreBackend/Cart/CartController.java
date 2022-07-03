package com.ervaergul.BookstoreBackend.Cart;

import com.ervaergul.BookstoreBackend.Exception.CustomExceptions.ForbiddenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/{username}/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    public void confirmAuthenticatedUser(String username) {
        String authenticatedUser = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!authenticatedUser.equalsIgnoreCase(username)) {
            throw new ForbiddenException("You are not allowed to update other people's carts");
        }
    }

    @PostMapping(value = {"/{bookId}", "/{bookId}/x{amount}"})
    public ResponseEntity<Object> addBookToCart(@PathVariable String username, @PathVariable Long bookId, @PathVariable(required = false) Long amount) {
        confirmAuthenticatedUser(username);
        return new ResponseEntity<>(cartService.addBookToCart(username, bookId, amount), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Object> listBooksInCart(@PathVariable String username) {
        confirmAuthenticatedUser(username);
        return new ResponseEntity<>(cartService.listCartContent(username), HttpStatus.OK);
    }

    @GetMapping("/total")
    public ResponseEntity<?> calculateCartTotal(@PathVariable String username) {
        confirmAuthenticatedUser(username);
        return new ResponseEntity<>(cartService.calculateCartTotal(username), HttpStatus.OK);
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<Object> removeBookFromCart(@PathVariable String username, @PathVariable Long bookId) {
        confirmAuthenticatedUser(username);
        return new ResponseEntity<>(cartService.removeBookFromCart(username, bookId), HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<Object> removeAllBooksFromCart(@PathVariable String username) {
        confirmAuthenticatedUser(username);
        return new ResponseEntity<>(cartService.removeAllBooksFromCart(username), HttpStatus.OK);
    }

}