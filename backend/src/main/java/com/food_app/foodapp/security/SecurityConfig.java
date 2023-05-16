package com.food_app.foodapp.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;

    @Autowired
    private CustomOAuth2LoginSuccessHandler customOAuth2LoginSuccessHandler;

    @Autowired
    private CustomOAuth2LoginFailureHandler customOAuth2LoginFailureHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/login**", "/js/**", "/css/**").permitAll()
                .antMatchers("/", "/home", "/public-resources/**").permitAll()
                .antMatchers("/api/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login().defaultSuccessUrl("http://127.0.0.1:3000/register", true)

        // .userInfoEndpoint()

        // .userService(customOAuth2UserService)
        // .and()
        // .successHandler(customOAuth2LoginSuccessHandler)
        // .failureHandler(customOAuth2LoginFailureHandler).and()
        // .oauth2Login()
        // .loginPage("/login")
        ;
    }

    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() {
        return new DefaultOAuth2UserService();
    }
}


