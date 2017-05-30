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

@Component
@RepositoryEventHandler(User.class)
public class UserEventHandler {

	private static final Logger logger = LoggerFactory.getLogger(UserEventHandler.class);

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@HandleBeforeCreate
	public void handleUserCreate(User user) {
		if (Objects.equals(user.getPassword(), user.getConfirmPassword())) {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		} else {
			throw new PasswordConfirmationException();
		}
	}

	@HandleBeforeSave
	public void handleUserUpdate(User user) {
		User storedUser = userRepository.findOne(user.getId());
		if (user.getCurrentPassword() == null && user.getConfirmPassword() == null) {
			// keeps the last password
			user.setPassword(storedUser.getPassword());
		} else if (!Objects.equals(storedUser.getPassword(), user.getPassword())) {
			// password change request
			logger.debug("{}", user);
			if (user.getCurrentPassword() != null && user.getConfirmPassword() != null) {
				if (passwordEncoder.matches(user.getCurrentPassword(), storedUser.getPassword())) {
					handleUserCreate(user);
				} else {
					throw new InvalidCurrentPasswordException();
				}
			}
		}
	}
}