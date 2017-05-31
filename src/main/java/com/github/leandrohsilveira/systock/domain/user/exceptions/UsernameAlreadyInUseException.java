package com.github.leandrohsilveira.systock.domain.user.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code=HttpStatus.CONFLICT, reason="The provided username is already in use")
public class UsernameAlreadyInUseException extends RuntimeException {

	private static final long serialVersionUID = -6476964363613724279L;

}
