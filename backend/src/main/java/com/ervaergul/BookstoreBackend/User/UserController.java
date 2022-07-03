package com.ervaergul.BookstoreBackend.User;

import com.ervaergul.BookstoreBackend.User.DTOs.RegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@RestController
@RequestMapping("/users")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Object> createUser(@Valid @RequestBody RegisterDTO registerDTO) {
        return new ResponseEntity<>(userService.createUser(registerDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{username}/password={newPassword}")
    public ResponseEntity<Object> updateUserPassword(@PathVariable @NotBlank String username,
                                                     @PathVariable @NotBlank String newPassword) {
        String authenticatedUser = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!authenticatedUser.equalsIgnoreCase(username)) {
            return new ResponseEntity<>("You can't change another user's password", HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(userService.updateUserPassword(username, newPassword), HttpStatus.OK);
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Object> deleteUser(@PathVariable @NotBlank String username) {
        String authenticatedUser = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!authenticatedUser.equalsIgnoreCase(username)) {
            return new ResponseEntity<>("You can't delete another user's account", HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(userService.deleteUser(username), HttpStatus.OK);
    }

}