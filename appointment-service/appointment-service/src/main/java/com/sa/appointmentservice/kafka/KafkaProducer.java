package com.sa.appointmentservice.kafka;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import com.sa.appointmentservice.model.Diagnosis;


@Service
public class KafkaProducer {
	
	 @Value("${spring.kafka.topic.name}")
	 private String topicName;
	 
	 private KafkaTemplate<String, Diagnosis> kafkaTemplate;

	 public KafkaProducer(KafkaTemplate<String, Diagnosis> kafkaTemplate) {
	        this.kafkaTemplate = kafkaTemplate;
	 }

	 public void sendMessage(Diagnosis diagnosis){

//	       System.out.println(String.format("Message sent -> %s", diagnosis.toString()));

	        Message<Diagnosis> message = MessageBuilder
	                .withPayload(diagnosis)
	                .setHeader(KafkaHeaders.TOPIC, topicName)
	                .build();

	        kafkaTemplate.send(message);
	    }

}
