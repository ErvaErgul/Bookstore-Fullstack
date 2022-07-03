package com.ervaergul.BookstoreBackend.Cart;

import com.ervaergul.BookstoreBackend.Book.Book;
import com.ervaergul.BookstoreBackend.Book.BookRepository;
import com.ervaergul.BookstoreBackend.Exception.CustomExceptions.NotFoundException;
import com.ervaergul.BookstoreBackend.User.User;
import com.ervaergul.BookstoreBackend.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartItemRepository cartItemRepository;

    public List<CartItem> addBookToCart(String username, Long bookId, Long amountSpecified) {
        Book book = bookRepository.findById(bookId).orElse(null);
        User user = userRepository.findByUsernameIgnoreCase(username);

        Long amount = 1L;

        if (amountSpecified != null) {
            amount = amountSpecified;
        }

        if (book == null || user == null) {
            throw new NotFoundException("User or book does not exist");
        }

        if (book.getStock().equals(0L) || book.getStock() < amount) {
            throw new NotFoundException("There aren't enough books in stock");
        }

        List<CartItem> userCart = cartItemRepository.findByUser(user);

        if (!userCart.isEmpty()) {
            for (CartItem cartItem : userCart) {
                if (cartItem.getBook().getId().equals(book.getId())) {
                    book.setStock(book.getStock() - amount);
                    cartItem.setAmount(cartItem.getAmount() + amount);
                    bookRepository.save(book);
                    cartItemRepository.save(cartItem);
                    return cartItemRepository.findByUser(user);
                }
            }
        }

        book.setStock(book.getStock() - amount);
        CartItem newCartItem = new CartItem(user, book, amount);
        bookRepository.save(book);
        cartItemRepository.save(newCartItem);
        return cartItemRepository.findByUser(user);
    }

    public List<CartItem> listCartContent(String username) {
        User user = userRepository.findByUsernameIgnoreCase(username);

        if (user == null) {
            throw new NotFoundException("There is no user with username:" + username);
        }

        if (cartItemRepository.findByUser(user).isEmpty()) {
            throw new NotFoundException("There are no books in the cart");
        }

        return cartItemRepository.findByUser(user);
    }

    public List<CartItem> removeBookFromCart(String username, Long bookId) {
        Book book = bookRepository.findById(bookId).orElse(null);
        User user = userRepository.findByUsernameIgnoreCase(username);

        if (book == null || user == null) {
            throw new NotFoundException("User or book does not exist");
        }

        if (cartItemRepository.findByUser(user).isEmpty()) {
            throw new NotFoundException("Cart is empty");
        }

        for (CartItem cartItem : cartItemRepository.findByUser(user)) {
            if (cartItem.getBook().getId().equals(book.getId())) {
                if (cartItem.getAmount().equals(1L)) {
                    cartItemRepository.delete(cartItem);
                } else {
                    cartItem.setAmount(cartItem.getAmount() - 1);
                    cartItemRepository.save(cartItem);
                }
                book.setStock(book.getStock() + 1);
                bookRepository.save(book);
                return cartItemRepository.findByUser(user);
            }
        }

        throw new NotFoundException("The book you want to remove is not in your cart");
    }

    public String removeAllBooksFromCart(String username) {
        User user = userRepository.findByUsernameIgnoreCase(username);

        if (user == null) {
            throw new NotFoundException("User does not exist");
        }

        if (cartItemRepository.findByUser(user).isEmpty()) {
            throw new NotFoundException("Cart is already empty");
        }

        for (CartItem cartItem : cartItemRepository.findByUser(user)) {
            cartItem.getBook().setStock(cartItem.getBook().getStock() + cartItem.getAmount());
            bookRepository.save(cartItem.getBook());
            cartItemRepository.delete(cartItem);
        }

        return "Removed all books from cart";
    }

    public int calculateCartTotal(String username) {
        User user = userRepository.findByUsernameIgnoreCase(username);
        List<CartItem> userCartItems = cartItemRepository.findByUser(user);

        if (user == null) {
            throw new NotFoundException("There is no user with the username: " + username);
        }

        if (userCartItems.isEmpty()) {
            throw new NotFoundException("There are no items in the cart");
        }

        int total = 0;

        for (CartItem cartItem : userCartItems) {
            total += cartItem.getAmount() * cartItem.getBook().getPrice();
        }

        return total;
    }

}