package com.github.leandrohsilveira.systock.domain;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.NonFinal;

@Getter
@Setter
@EqualsAndHashCode
@NonFinal
public abstract class AbstractDomain implements Serializable {

	private static final long serialVersionUID = -218949086775706051L;

	@Id
	protected String id;
	
}
