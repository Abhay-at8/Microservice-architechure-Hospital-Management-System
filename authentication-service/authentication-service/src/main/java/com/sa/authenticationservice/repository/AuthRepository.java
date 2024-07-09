package com.sa.authenticationservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sa.authenticationservice.model.User;

public interface AuthRepository  extends JpaRepository<User, Long>{

	User findByLoginId(String loginId);

}
