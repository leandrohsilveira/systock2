package com.github.leandrohsilveira.systock.domain.user;

import org.springframework.data.mongodb.core.mapping.Document;

import com.github.leandrohsilveira.systock.domain.AbstractDomain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder(toBuilder = true)
@Document
public class Profile extends AbstractDomain {

	private static final long serialVersionUID = 1090977124222031039L;

	@NonNull
	private String firstName;

	private String lastName;

	@NonNull
	private String email;

}
