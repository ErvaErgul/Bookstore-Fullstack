package com.ervaergul.BookstoreBackend.User;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {

    @Id
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String authority;
    @Column(nullable = false, name = "account_active")
    private boolean accountActive;
    @Column(name = "refresh_token")
    private String refreshToken;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "refresh_token_expiration")
    private Date refreshTokenExpirationDate;

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;

        this.authority = "customer";
        this.accountActive = true;
        /* By default, new accounts are set to be active */
        /* This attribute can be set to false and require some kind of verification to activate (e.g. e-mail) */

        this.refreshToken = null;
        this.refreshTokenExpirationDate = null;
    }

}