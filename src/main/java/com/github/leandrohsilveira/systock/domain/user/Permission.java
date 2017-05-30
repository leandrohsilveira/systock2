package com.github.leandrohsilveira.systock.domain.user;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Permission {

						SEE_USERS("can_see_users"),
						EDIT_USERS("can_edit_users"),
						CREATE_USERS("can_create_users"),
						DELETE_USER("can_delete_users");

	@NonNull
	private String text;

	@Override
	public String toString() {
		return getText();
	}

}