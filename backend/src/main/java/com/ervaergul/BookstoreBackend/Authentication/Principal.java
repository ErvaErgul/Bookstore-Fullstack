package com.ervaergul.BookstoreBackend.Authentication;

import com.ervaergul.BookstoreBackend.User.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/* Spring Security requires a "UserDetails" object to work with */
/* This Wrapper class takes in our "User" entity and provides necessary methods for Spring Security */
public class Principal implements UserDetails {

    private User user;

    public Principal(User user){
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority(this.user.getAuthority()));
        return authorityList;
    }

    @Override
    public String getPassword() {
        return this.user.getPassword();
    }

    @Override
    public String getUsername() {
        return this.user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.user.isAccountActive();
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.user.isAccountActive();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.user.isAccountActive();
    }

    @Override
    public boolean isEnabled() {
        return this.user.isAccountActive();
    }

}