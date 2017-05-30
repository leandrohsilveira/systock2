package com.github.leandrohsilveira.systock.domain.user.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "The provided password and password confirmation don't match each other")
public class PasswordConfirmationException extends RuntimeException {

	private static final long serialVersionUID = -247530854767415422L;

}
