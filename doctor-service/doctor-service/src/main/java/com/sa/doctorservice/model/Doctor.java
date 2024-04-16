package com.sa.doctorservice.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Doctor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	String doctorName;
	String specilization;
	BigDecimal consultancyCharges;
	String qualification;
	String hospital;
	String registrationNo;
	String clinicId;
	String emailId;
	String password;
	
	
	
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRegistrationNo() {
		return registrationNo;
	}
	public void setRegistrationNo(String registrationNo) {
		this.registrationNo = registrationNo;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDoctorName() {
		return doctorName;
	}
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}
	public String getSpecilization() {
		return specilization;
	}
	public void setSpecilization(String specilization) {
		this.specilization = specilization;
	}
	public BigDecimal getConsultancyCharges() {
		return consultancyCharges;
	}
	public void setConsultancyCharges(BigDecimal consultancyCharges) {
		this.consultancyCharges = consultancyCharges;
	}
	public String getQualification() {
		return qualification;
	}
	public void setQualification(String qualification) {
		this.qualification = qualification;
	}
	public String getHospital() {
		return hospital;
	}
	public void setHospital(String hospital) {
		this.hospital = hospital;
	}
	
	
	public String getClinicId() {
		return clinicId;
	}
	public void setClinicId(String clinicId) {
		this.clinicId = clinicId;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	

	


	public Doctor(Long id, String doctorName, String specilization, BigDecimal consultancyCharges, String qualification,
			String hospital, String registrationNo, String clinicId, String emailId, String password) {
		super();
		this.id = id;
		this.doctorName = doctorName;
		this.specilization = specilization;
		this.consultancyCharges = consultancyCharges;
		this.qualification = qualification;
		this.hospital = hospital;
		this.registrationNo = registrationNo;
		this.clinicId = clinicId;
		this.emailId = emailId;
		this.password = password;
	}
	public Doctor() {

	}
	
	




}

