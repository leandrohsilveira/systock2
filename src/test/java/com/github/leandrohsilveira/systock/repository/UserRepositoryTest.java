package com.github.leandrohsilveira.systock.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.net.URI;

import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import com.github.leandrohsilveira.systock.SystockApplication;
import com.github.leandrohsilveira.systock.domain.user.User;
import com.github.leandrohsilveira.systock.domain.user.UserRepository;
import com.github.leandrohsilveira.systock.utils.AbstractRepositoryTest;

import lombok.extern.slf4j.Slf4j;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SystockApplication.class)
@EnableAutoConfiguration
@AutoConfigureMockMvc
@Slf4j
public class UserRepositoryTest extends AbstractRepositoryTest {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private MockMvc mockMvc;
	
	@Test
	public void postTest() throws Exception {
		String username = "postTest";
		String userJson = new JSONObject() //
				.put("username", username) //
				.put("password", "123456") //
				.put("confirmPassword", "123456") //
				.toString();

		printSeparator();
		log.info("Posting user: {}", userJson);
		printSeparator();

		MockHttpServletRequestBuilder post = post(new URI("/api/users"));
		post.content(userJson);
		ResultActions result = mockMvc.perform(post);
		result.andDo(print());
		result.andExpect(status().isCreated());
	}
	
	@Test
	public void postTestUsernameConflictFailure() throws Exception {
		String username = "postTestUsernameConflictFailure";
		userRepository.save(User.builder().username(username).password("123456").build());
		
		String userJson = new JSONObject().put("username", username).put("password", "123456").put("confirmPassword", "123456")
				.toString();

		printSeparator();
		log.info("Posting user: {} forcing CONFIRMATION FAILURE (Bad request)", userJson);
		printSeparator();

		MockHttpServletRequestBuilder post = post(new URI("/api/users"));
		post.content(userJson);
		ResultActions result = mockMvc.perform(post);
		result.andDo(print());
		result.andExpect(status().isConflict());
	}
	
	@Test
	public void postTestPasswordConfirmationFailure() throws Exception {
		String username = "postTestPasswordConfirmationFailure";
		String userJson = new JSONObject().put("username", username).put("password", "123456").put("confirmPassword", "1234567")
				.toString();

		printSeparator();
		log.info("Posting user: {} forcing CONFIRMATION FAILURE (Bad request)", userJson);
		printSeparator();

		MockHttpServletRequestBuilder post = post(new URI("/api/users"));
		post.content(userJson);
		ResultActions result = mockMvc.perform(post);
		result.andDo(print());
		result.andExpect(status().isBadRequest());
	}

	@Test
	public void getTest() throws Exception {
		String username = "getTest";
		User user = User.builder().username(username).password("123456").build();
		User savedUser = saveUser(user);

		printSeparator();
		log.info("Getting user: {}", savedUser.getId());
		printSeparator();

		MockHttpServletRequestBuilder get = get(new URI("/api/users/".concat(savedUser.getId())));
		ResultActions result = mockMvc.perform(get);
		result.andDo(print());
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$").exists());
		result.andExpect(jsonPath("$.username").value(username));
		result.andExpect(jsonPath("$.password").doesNotExist());
	}

	@Test
	public void putTest() throws Exception {
		String username = "putTest";
		User user = User.builder().username(username).password("123456").build();
		User savedUser = saveUser(user);

		String userJson = new JSONObject() //
				.put("username", username) //
				.put("currentPassword", "123456") //
				.put("password", "654321") //
				.put("confirmPassword", "654321") //
				.toString();

		printSeparator();
		log.info("Putting user id {}: {}", savedUser.getId(), userJson);
		printSeparator();

		MockHttpServletRequestBuilder put = put(new URI("/api/users/".concat(savedUser.getId())));
		put.content(userJson);

		ResultActions result = mockMvc.perform(put);
		result.andDo(print());
		result.andExpect(status().isNoContent());

		User updatedUser = userRepository.findOne(savedUser.getId());
		assertThat(updatedUser).isNotNull();
		assertThat(updatedUser.getUsername()).isEqualTo(username);
		assertThat(checkPassword("123456", updatedUser)).isFalse();
		assertThat(checkPassword("654321", updatedUser)).isTrue();
	}

	@Test
	public void putTestPasswordConfirmationFailure() throws Exception {
		String username = "putTestPasswordConfirmationFailure";
		User user = User.builder().username(username).password("123456").build();
		User savedUser = saveUser(user);

		String userJson = new JSONObject() //
				.put("username", username) //
				.put("currentPassword", "123456") //
				.put("password", "1234567") //
				.put("confirmPassword", "12345678") //
				.toString();

		printSeparator();
		log.info("Putting user id {}: {}", savedUser.getId(), userJson);
		printSeparator();

		MockHttpServletRequestBuilder put = put(new URI("/api/users/".concat(savedUser.getId())));
		put.content(userJson);

		ResultActions result = mockMvc.perform(put);
		result.andDo(print());
		result.andExpect(status().isBadRequest());
	}

	@Test
	public void putTestInvalidCurrentPassword() throws Exception {
		String username = "putTestInvalidCurrentPassword";
		User user = User.builder().username(username).password("123456").build();
		User savedUser = saveUser(user);

		String userJson = new JSONObject() //
				.put("username", username) //
				.put("currentPassword", "1234567") //
				.put("password", "654321") //
				.put("confirmPassword", "654321") //
				.toString();

		printSeparator();
		log.info("Putting user id {}: {}", savedUser.getId(), userJson);
		printSeparator();

		MockHttpServletRequestBuilder put = put(new URI("/api/users/".concat(savedUser.getId())));
		put.content(userJson);

		ResultActions result = mockMvc.perform(put);
		result.andDo(print());
		result.andExpect(status().isBadRequest());
	}

	@Test
	public void patchTest() throws Exception {
		String username = "patchTest";
		User user = User.builder().username(username).password("123456").build();
		User savedUser = saveUser(user);
		assertThat(checkPassword("123456", savedUser)).isTrue();

		String id = savedUser.getId();

		String userJson = new JSONObject() //
					.put("currentPassword", "123456") //
					.put("password", "654321") //
					.put("confirmPassword", "654321") //
					.toString();

		printSeparator();
		log.info("Patching user id {}: {}", id, userJson);
		printSeparator();

		MockHttpServletRequestBuilder patch = patch(new URI("/api/users/".concat(id)));
		patch.content(userJson);
		ResultActions result = mockMvc.perform(patch);
		result.andDo(print());
		result.andExpect(status().isNoContent());

		User updatedUser = userRepository.findOne(id);
		assertThat(updatedUser).isNotNull();
		assertThat(checkPassword("123456", updatedUser)).isFalse();
		assertThat(checkPassword("654321", updatedUser)).isTrue();
	}

	private User saveUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	private boolean checkPassword(String rawPassword, User user) {
		return passwordEncoder.matches(rawPassword, user.getPassword());

	}

}
