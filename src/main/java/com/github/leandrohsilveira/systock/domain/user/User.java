package com.github.leandrohsilveira.systock.domain.user;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.leandrohsilveira.systock.domain.AbstractDomain;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper=true)
@Builder(toBuilder=true)
@Document
public class User extends AbstractDomain {

	private static final long serialVersionUID = -2502492981030986956L;
	
	@NonNull
	private String username;
	
	@NonNull
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)    
	private String password;
	
	public UserDetails toUserDetails() {
		return new UserDetails() {
			
			@Override
			public boolean isEnabled() {
				return true;
			}
			
			@Override
			public boolean isCredentialsNonExpired() {
				return true;
			}
			
			@Override
			public boolean isAccountNonLocked() {
				return true;
			}
			
			@Override
			public boolean isAccountNonExpired() {
				return true;
			}
			
			@Override
			public String getUsername() {
				return username;
			}
			
			@Override
			public String getPassword() {
				return password;
			}
			
			@Override
			public Collection<? extends GrantedAuthority> getAuthorities() {
				return Arrays.asList();
			}
		};
	}
	
}