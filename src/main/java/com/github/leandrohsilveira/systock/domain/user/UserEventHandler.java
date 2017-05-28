package com.github.leandrohsilveira.systock.domain.user;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler(User.class)
public class UserEventHandler {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepository;

	@HandleBeforeCreate
	public void handleUserCreate(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
	}

	@HandleBeforeSave
	public void handleUserUpdate(User user) {
		User storedUser = userRepository.findOne(user.getId());
		if (user.getPassword() == null || user.getPassword().equals("")) {
			// keeps the last password
			user.setPassword(storedUser.getPassword());
		} else if(!Objects.equals(storedUser.getPassword(), user.getPassword())) {
			// password change request
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		}
	}
}