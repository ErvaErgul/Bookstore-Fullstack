package com.ervaergul.BookstoreBackend.User;

import com.ervaergul.BookstoreBackend.User.Requests.RegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

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

}