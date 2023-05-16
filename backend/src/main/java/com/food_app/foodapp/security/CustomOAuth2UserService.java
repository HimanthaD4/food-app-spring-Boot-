package com.food_app.foodapp.security;

import org.springframework.security.oauth2.core.user.OAuth2User;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.stereotype.Service;

import com.food_app.foodapp.model.User;
import com.food_app.foodapp.principals.CustomUserPrincipal;
import com.food_app.foodapp.repositaries.UserRepository;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Extract user information from oAuth2User
        String email = oAuth2User.getAttribute("email");
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");

        // Save or update user in your database
        User user = userRepository.findByEmail(email).orElse(new User());
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        userRepository.save(user);

        // Create a custom user principal with your own domain User object and return it
        CustomUserPrincipal customUserPrincipal = new CustomUserPrincipal(user, oAuth2User.getAuthorities());
        return customUserPrincipal;
    }
}
