package com.github.leandrohsilveira.systock.domain.user;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "users", itemResourceRel="user", path = "/users")
public interface UserRepository extends MongoRepository<User, String> {

	Optional<User> findOneByUsername(String username);

}
