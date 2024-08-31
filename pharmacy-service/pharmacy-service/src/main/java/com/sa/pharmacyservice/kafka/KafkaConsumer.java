package com.sa.pharmacyservice.kafka;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sa.pharmacyservice.model.Diagnosis;
import com.sa.pharmacyservice.service.PharmacyService;

@Service
public class KafkaConsumer {
	
	@Autowired
	PharmacyService pharmacyService;

	 @KafkaListener(topics = "${spring.kafka.topic-consume.name}", groupId = "${spring.kafka.consumer.group-id}")
	    public void consume(String diagnosis) throws JsonMappingException, JsonProcessingException{
//	        LOGGER.info(String.format("Json message recieved -> %s", diagnosis.toString()));
//		 pharmacyService.createOrder(diagnosis);
		 ObjectMapper mapper = new ObjectMapper();
		 Diagnosis diag=mapper.readValue(diagnosis, Diagnosis.class);
		 pharmacyService.createOrder1(diag);
		 System.out.println("Diagnosis is "+diagnosis+"\nobj is"+diag);
		 
	  	}
	
}
