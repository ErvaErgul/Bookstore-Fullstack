package com.ervaergul.BookstoreBackend.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    User findByUsernameIgnoreCase(String username);

    User findByRefreshToken(String refreshToken);

}