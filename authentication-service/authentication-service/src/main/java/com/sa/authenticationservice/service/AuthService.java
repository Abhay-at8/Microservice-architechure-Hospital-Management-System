package com.sa.authenticationservice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.sa.authenticationservice.model.User;
import com.sa.authenticationservice.repository.AuthRepository;

@Service
public class AuthService {
	
	@Autowired
	AuthRepository authRepository;

	public List<User> getUsers() {
	
		return authRepository.findAll();
	}
	
	public Boolean validateUser(User userRequested) {
		
//		User user= authRepository.findByLoginId(userRequested.getLoginId());
//		if(user.getPassword().equals(userRequested.getPassword())) return true;
		return false;
	}

	public String createUser(User userRequested) {
//		User user= authRepository.findByLoginId(userRequested.getLoginId());
//		if(user!=null) return "User Already exist";
//		authRepository.save(userRequested);
		return "User Created";
	}

}
