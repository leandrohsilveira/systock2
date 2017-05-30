package com.github.leandrohsilveira.systock.domain.user.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "The provided current password is invalid")
public class InvalidCurrentPasswordException extends RuntimeException {

	private static final long serialVersionUID = -705760900855946378L;

}
