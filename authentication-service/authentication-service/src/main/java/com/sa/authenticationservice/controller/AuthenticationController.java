package com.sa.authenticationservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sa.authenticationservice.model.AuthenticationRequest;
import com.sa.authenticationservice.model.AuthenticationResponse;
import com.sa.authenticationservice.model.User;
import com.sa.authenticationservice.service.AuthService;
import com.sa.authenticationservice.service.JwtService;
import com.sa.authenticationservice.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        final String jwt = jwtService.createJwtToken(authenticationRequest);
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }
        userService.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }
	@Autowired
	AuthService authService;
	
	@GetMapping("/")
    public List<User> getUsers(){
        return  authService.getUsers();
	}
	
	@GetMapping("/validate")
    public String validateUser(@RequestParam String token){
		
		System.out.println("requet for validation");
		return jwtService.validate(token);
		 
    }
	
	@PostMapping("/validateUser")
    public Boolean validateUser(@RequestBody User user){
		return authService.validateUser(user);
		 
    }
	
	@PostMapping("/createUser")
    public String createUser(@RequestBody User user){
		 return authService.createUser(user);
		 
		 
    }

	
}

