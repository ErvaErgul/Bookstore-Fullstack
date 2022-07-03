package com.ervaergul.BookstoreBackend.User;

import com.ervaergul.BookstoreBackend.Exception.CustomExceptions.NotFoundException;
import com.ervaergul.BookstoreBackend.Exception.CustomExceptions.UnprocessableEntityException;
import com.ervaergul.BookstoreBackend.User.DTOs.RegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String createUser(RegisterDTO registerDTO) {
        User userWithSameName = userRepository.findByUsernameIgnoreCase(registerDTO.getUsername());

        if (userWithSameName != null) {
            throw new UnprocessableEntityException("Username is taken");
        }

        User newUser = new User(registerDTO.getUsername(), registerDTO.getPassword(), registerDTO.getEmail());
        userRepository.save(newUser);
        return "Registration successful";
    }

    public String updateUserPassword(String username, String newPassword) {
        User userToUpdate = userRepository.findByUsernameIgnoreCase(username);

        if (userToUpdate == null) {
            throw new NotFoundException("There is no user with the username: " + username);
        }

        userToUpdate.setPassword(newPassword);
        userRepository.save(userToUpdate);
        return "Password updated successfully";
    }

    public String deleteUser(String username) {
        User userToDelete = userRepository.findByUsernameIgnoreCase(username);

        if (userToDelete == null) {
            throw new NotFoundException("There is no user with the username: " + username);
        }

        userRepository.delete(userToDelete);
        return "User deleted successfully";
    }

}