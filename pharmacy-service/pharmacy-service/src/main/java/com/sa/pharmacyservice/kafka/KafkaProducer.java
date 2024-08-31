package com.sa.pharmacyservice.kafka;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import com.sa.pharmacyservice.model.PharmacyOrder;

@Service
public class KafkaProducer {
	
	 @Value("${spring.kafka.topic.name}")
	 private String topicName;
	 
	 private KafkaTemplate<String, PharmacyOrder> kafkaTemplate;

	 public KafkaProducer(KafkaTemplate<String, PharmacyOrder> kafkaTemplate) {
	        this.kafkaTemplate = kafkaTemplate;
	 }

	 public void sendMessage(PharmacyOrder order){

	       System.out.println(String.format("Message sent -> %s", order.toString()));

	        Message<PharmacyOrder> message = MessageBuilder
	                .withPayload(order)
	                .setHeader(KafkaHeaders.TOPIC, topicName)
	                .build();

	        kafkaTemplate.send(message);
	    }

}
