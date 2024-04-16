package com.sa.patientservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;



@Entity
public class Address {
		
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    Long id;
	    private String street;
	    private String city;
	    private String state;
	    private String country;
	    private String zipCode;
	    @JsonIgnore
	    @OneToOne(mappedBy = "address")
	    Patient patient;
	    
	    
	    public Address() {};
	    
	    public Address(String street, String city, String state, String country, String zipCode, Patient patient) {
			super();
			this.street = street;
			this.city = city;
			this.state = state;
			this.country = country;
			this.zipCode = zipCode;
			this.patient = patient;
		}
		// getters and setters
		public String getStreet() {
			return street;
		}
		public void setStreet(String street) {
			this.street = street;
		}
		public String getCity() {
			return city;
		}
		public void setCity(String city) {
			this.city = city;
		}
		public String getState() {
			return state;
		}
		public void setState(String state) {
			this.state = state;
		}
		public String getCountry() {
			return country;
		}
		public void setCountry(String country) {
			this.country = country;
		}
		public String getZipCode() {
			return zipCode;
		}
		public void setZipCode(String zipCode) {
			this.zipCode = zipCode;
		}
		public Patient getPatient() {
			return patient;
		}
		public void setPatient(Patient patient) {
			this.patient = patient;
		}
	    

	   
	    
	
}
