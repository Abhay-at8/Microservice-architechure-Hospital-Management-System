package com.sa.apigateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {
	
	@Autowired
	private RouteValidator validator;
	
	@Autowired
	private RestTemplate template;
	
	public AuthenticationFilter() {
		super(Config.class);
	}
	
	@Override
	public GatewayFilter apply(Config config) {
		return ((exchange,chain)->{
			if(validator.isSecured.test(exchange.getRequest())) {
				if(!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
					throw new RuntimeException("missing Authorization Headers");
				}
				String authHeader=exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
				if(authHeader!=null && authHeader.startsWith("Bearer ")) {
					authHeader=authHeader.substring(7);
					System.out.println(" AUTH HEADER IS "+authHeader+ "\n len "+authHeader.length());
				}
				
				try {
					String res=template.getForObject("http://localhost:8080/auth/validate?token="+authHeader, String.class);
//					String res=template.getForObject("http://localhost:8080/auth/", String.class);
						System.out.println("Rest template output is "+res);
				} catch (Exception e) {
					System.out.println(e);
					throw new RuntimeException("error in validation");
				}
				
			}
			return chain.filter(exchange);
		});
	}
	
	public static class Config {

	}

}
