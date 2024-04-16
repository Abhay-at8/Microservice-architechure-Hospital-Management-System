package com.sa.pharmacyservice.model;

import java.util.HashSet;
import java.util.Set;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;



public class Diagnosis {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	Long patientId;
	Long doctorId;
	String symptoms;
	String diagnosis;
	Long appointmentId;
    Set<Prescription> prescription = new HashSet<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPatientId() {
		return patientId;
	}

	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}

	public Long getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}

	public String getSymptoms() {
		return symptoms;
	}

	public void setSymptoms(String symptoms) {
		this.symptoms = symptoms;
	}

	public String getDiagnosis() {
		return diagnosis;
	}

	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}

	public Set<Prescription> getPrescription() {
		return prescription;
	}

	public void setPrescription(Set<Prescription> prescription) {
		this.prescription = prescription;
	}


	
	public Long getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(Long appointmentId) {
		this.appointmentId = appointmentId;
	}
	
	
	public Diagnosis(Long id, Long patientId, Long doctorId, String symptoms, String diagnosis, Long appointmentId,
			Set<Prescription> prescription) {
		super();
		this.id = id;
		this.patientId = patientId;
		this.doctorId = doctorId;
		this.symptoms = symptoms;
		this.diagnosis = diagnosis;
		this.appointmentId = appointmentId;
		this.prescription = prescription;
	}

	public Diagnosis() {}

}
