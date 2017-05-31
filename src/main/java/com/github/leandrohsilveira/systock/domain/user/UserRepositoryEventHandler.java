package com.github.leandrohsilveira.systock.domain.user;

import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.github.leandrohsilveira.systock.domain.user.exceptions.InvalidCurrentPasswordException;
import com.github.leandrohsilveira.systock.domain.user.exceptions.PasswordConfirmationException;
import com.github.leandrohsilveira.systock.domain.user.exceptions.UsernameAlreadyInUseException;

@Component
@RepositoryEventHandler(User.class)
public class UserRepositoryEventHandler {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@HandleBeforeCreate
	public void handleUserCreate(User user) {
		if(userRepository.findOneByUsername(user.getUsername()).isPresent()) {
			throw new UsernameAlreadyInUseException();
		}
		confirmPassword(user);
	}


	@HandleBeforeSave
	public void handleUserUpdate(User user) {
		User storedUser = userRepository.findOne(user.getId());
		user.setUsername(storedUser.getUsername());
		if(!Objects.equals(storedUser.getPassword(), user.getPassword())) {
			if (user.getCurrentPassword() != null && user.getConfirmPassword() != null) {
				// password change request
				validateCurrentPassword(user, storedUser);
			} else {
				// keeps the last password
				user.setPassword(storedUser.getPassword());
			}
		}
	}

	private void validateCurrentPassword(User user, User storedUser) {
		if (user.getCurrentPassword() != null) {
			if (passwordEncoder.matches(user.getCurrentPassword(), storedUser.getPassword())) {
				confirmPassword(user);
			} else {
				throw new InvalidCurrentPasswordException();
			}
		}
	}
	
	private void confirmPassword(User user) {
		if (Objects.equals(user.getPassword(), user.getConfirmPassword())) {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		} else {
			throw new PasswordConfirmationException();
		}
	}
}