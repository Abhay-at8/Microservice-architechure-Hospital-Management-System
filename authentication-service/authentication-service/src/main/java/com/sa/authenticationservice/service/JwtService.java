package com.sa.authenticationservice.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.sa.authenticationservice.model.AuthenticationRequest;
import com.sa.authenticationservice.util.JwtUtil;

@Service
public class JwtService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    public String createJwtToken(AuthenticationRequest authenticationRequest) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationRequest.getUsername(), authenticationRequest.getPassword()));

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        return jwtUtil.generateToken(userDetails);
    }

	public String validate(String token) {
		// TODO Auto-generated method stub
		
		UserDetails userDetails = userDetailsService.loadUserByUsername(jwtUtil.extractUsername(token));
		if(jwtUtil.validateToken(token, userDetails)) {
			return "Authenticated";
		}
		return "Not Authenticated";
	}
}