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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import com.github.leandrohsilveira.systock.SystockApplication;
import com.github.leandrohsilveira.systock.domain.user.User;
import com.github.leandrohsilveira.systock.domain.user.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SystockApplication.class)
@EnableAutoConfiguration
@AutoConfigureMockMvc
public class UserRepositoryTest {

	private static final Logger logger = LoggerFactory.getLogger(UserRepositoryTest.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private MockMvc mockMvc;

	private static final Authentication AUTH = new UsernamePasswordAuthenticationToken("silveira", "silveira");

	@Test
	public void postTest() throws Exception {
		String userJson = new JSONObject().put("username", "silveira").put("password", "silveira").put("confirmPassword", "silveira")
				.toString();

		printSeparator();
		logger.info("Posting user: {}", userJson);
		printSeparator();

		MockHttpServletRequestBuilder post = post(new URI("/api/users"));
		post.content(userJson);
		ResultActions result = mockMvc.perform(post);
		result.andDo(print());
		result.andExpect(status().isCreated());
	}

	@Test
	public void postTestPasswordConfirmationFailure() throws Exception {
		String userJson = new JSONObject().put("username", "silveira").put("password", "silveira").put("confirmPassword", "silveira2")
				.toString();

		printSeparator();
		logger.info("Posting user: {} forcing CONFIRMATION FAILURE (Bad request)", userJson);
		printSeparator();

		MockHttpServletRequestBuilder post = post(new URI("/api/users"));
		post.content(userJson);
		ResultActions result = mockMvc.perform(post);
		result.andDo(print());
		result.andExpect(status().isBadRequest());
	}

	@Test
	public void getTest() throws Exception {
		User user = User.builder().username("silveira").password("silveira").build();
		User savedUser = saveUser(user);

		printSeparator();
		logger.info("Getting user: {}", savedUser.getId());
		printSeparator();

		MockHttpServletRequestBuilder get = get(new URI("/api/users/".concat(savedUser.getId())));
		ResultActions result = mockMvc.perform(get);
		result.andDo(print());
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$").exists());
		result.andExpect(jsonPath("$.username").value(savedUser.getUsername()));
		result.andExpect(jsonPath("$.password").doesNotExist());
	}

	@Test
	public void putTest() throws Exception {
		User user = User.builder().username("silveira").password("silveira").build();
		User savedUser = saveUser(user);

		String userJson = new JSONObject() //
				.put("username", "silveira") //
				.put("currentPassword", "silveira") //
				.put("password", "silveira2") //
				.put("confirmPassword", "silveira2") //
				.toString();

		printSeparator();
		logger.info("Putting user id {}: {}", savedUser.getId(), userJson);
		printSeparator();

		MockHttpServletRequestBuilder put = put(new URI("/api/users/".concat(savedUser.getId())));
		put.content(userJson);

		ResultActions result = mockMvc.perform(put);
		result.andDo(print());
		result.andExpect(status().isNoContent());

		User updatedUser = userRepository.findOne(savedUser.getId());
		assertThat(updatedUser).isNotNull();
		assertThat(updatedUser.getUsername()).isEqualTo("silveira");
		assertThat(checkPassword("silveira", updatedUser)).isFalse();
		assertThat(checkPassword("silveira2", updatedUser)).isTrue();
	}

	@Test
	public void putTestPasswordConfirmationFailure() throws Exception {
		User user = User.builder().username("silveira").password("silveira").build();
		User savedUser = saveUser(user);

		String userJson = new JSONObject() //
				.put("username", "silveira") //
				.put("currentPassword", "silveira") //
				.put("password", "silveira2") //
				.put("confirmPassword", "silveira3") //
				.toString();

		printSeparator();
		logger.info("Putting user id {}: {}", savedUser.getId(), userJson);
		printSeparator();

		MockHttpServletRequestBuilder put = put(new URI("/api/users/".concat(savedUser.getId())));
		put.content(userJson);

		ResultActions result = mockMvc.perform(put);
		result.andDo(print());
		result.andExpect(status().isBadRequest());
	}

	@Test
	public void putTestInvalidCurrentPassword() throws Exception {
		User user = User.builder().username("silveira").password("silveira").build();
		User savedUser = saveUser(user);

		String userJson = new JSONObject() //
				.put("username", "silveira") //
				.put("currentPassword", "silveira3") //
				.put("password", "silveira2") //
				.put("confirmPassword", "silveira2") //
				.toString();

		printSeparator();
		logger.info("Putting user id {}: {}", savedUser.getId(), userJson);
		printSeparator();

		MockHttpServletRequestBuilder put = put(new URI("/api/users/".concat(savedUser.getId())));
		put.content(userJson);

		ResultActions result = mockMvc.perform(put);
		result.andDo(print());
		result.andExpect(status().isBadRequest());
	}

	@Test
	public void putTestBadRequest() throws Exception {
		User user = User.builder().username("silveira").password("silveira").build();
		User savedUser = saveUser(user);

		String id = savedUser.getId();

		String userJson = new JSONObject().put("username", "silveira2").toString();

		printSeparator();
		logger.info("Putting user id {} forcing BAD REQUEST: {}", id, userJson);
		printSeparator();

		MockHttpServletRequestBuilder put = put(new URI("/api/users/".concat(id)));
		put.content(userJson);
		ResultActions result = mockMvc.perform(put);
		result.andDo(print());
		result.andExpect(status().isBadRequest());

		User updatedUser = userRepository.findOne(id);
		assertThat(updatedUser).isNotNull();
		assertThat(updatedUser.getUsername()).isEqualTo("silveira");
		assertThat(checkPassword("silveira", updatedUser)).isTrue();
	}

	@Test
	public void patchTest() throws Exception {
		User user = User.builder().username("silveira").password("silveira").build();
		User savedUser = saveUser(user);
		assertThat(checkPassword("silveira", savedUser)).isTrue();

		String id = savedUser.getId();

		String userJson = new JSONObject().put("username", "silveira2").toString();

		printSeparator();
		logger.info("Patching user id {}: {}", id, userJson);
		printSeparator();

		MockHttpServletRequestBuilder patch = patch(new URI("/api/users/".concat(id)));
		patch.content(userJson);
		ResultActions result = mockMvc.perform(patch);
		result.andDo(print());
		result.andExpect(status().isNoContent());

		User updatedUser = userRepository.findOne(id);
		assertThat(updatedUser).isNotNull();
		assertThat(checkPassword("silveira", updatedUser)).isTrue();
		assertThat(updatedUser.getPassword()).isEqualTo(savedUser.getPassword());
	}

	private User saveUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	private boolean checkPassword(String rawPassword, User user) {
		return passwordEncoder.matches(rawPassword, user.getPassword());

	}

	private void printSeparator() {
		logger.info("****************************************************************************");
	}

}
