package com.github.leandrohsilveira.systock.domain.user;

import java.util.List;

import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.leandrohsilveira.systock.domain.AbstractDomain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Builder(toBuilder = true)
@Document
public class User extends AbstractDomain {

	private static final long serialVersionUID = -2502492981030986956L;

	@NonNull
	private String username;

	@NonNull
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;

	@Transient
	private String currentPassword;

	@Transient
	private String confirmPassword;

	private List<Permission> permissions;

	private Profile profile;

	public UserDetails toUserDetails() {
		return new UserDetailsImpl(this);
	}

}