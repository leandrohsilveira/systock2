package com.github.leandrohsilveira.systock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.github.leandrohsilveira.systock.domain.user.UserRepository;

@SpringBootApplication
public class SystockApplication {

	public static void main(String[] args) {
		SpringApplication.run(SystockApplication.class, args);
	}
}
