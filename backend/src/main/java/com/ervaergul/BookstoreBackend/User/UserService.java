package com.ervaergul.BookstoreBackend.User;

import com.ervaergul.BookstoreBackend.Exception.CustomExceptions.EntityAlreadyExistsException;
import com.ervaergul.BookstoreBackend.User.Requests.RegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String createUser(RegisterDTO registerDTO) {
        User userWithSameName = userRepository.findByUsernameIgnoreCase(registerDTO.getUsername());

        if(userWithSameName != null) {
            throw new EntityAlreadyExistsException("Username is taken");
        }

        User newUser = new User(registerDTO.getUsername(),registerDTO.getPassword(),registerDTO.getEmail());
        userRepository.save(newUser);
        return "Registration successful";
    }

}