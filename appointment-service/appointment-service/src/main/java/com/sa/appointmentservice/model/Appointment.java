package com.sa.appointmentservice.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Appointment {
	
	

	    @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    Long id;
	    
	    Long doctorId;
	    Long patientId;
	    LocalDateTime startSlot;
	    LocalDateTime endSlot;
	    String appointmentStatus;
	    String clinicId;
	    
	    Long diagnosisId;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public LocalDateTime getStartSlot() {
			return startSlot;
		}

		public void setStartSlot(LocalDateTime startSlot) {
			this.startSlot = startSlot;
		}

		public LocalDateTime getEndSlot() {
			return endSlot;
		}

		public void setEndSlot(LocalDateTime endSlot) {
			this.endSlot = endSlot;
		}

		public String getAppointmentStatus() {
			return appointmentStatus;
		}

		public void setAppointmentStatus(String appointmentStatus) {
			this.appointmentStatus = appointmentStatus;
		}

		public Long getDiagnosisId() {
			return diagnosisId;
		}

		public void setDiagnosisId(Long diagnosisId) {
			this.diagnosisId = diagnosisId;
		}

		
	    
		public Long getDoctorId() {
			return doctorId;
		}

		public void setDoctorId(Long doctorId) {
			this.doctorId = doctorId;
		}

		public Long getPatientId() {
			return patientId;
		}

		public void setPatientId(Long patientId) {
			this.patientId = patientId;
		}

		
	

		public Appointment(Long id, Long doctorId, Long patientId, LocalDateTime startSlot, LocalDateTime endSlot,
				String appointmentStatus, String clinicId, Long diagnosisId) {
			super();
			this.id = id;
			this.doctorId = doctorId;
			this.patientId = patientId;
			this.startSlot = startSlot;
			this.endSlot = endSlot;
			this.appointmentStatus = appointmentStatus;
			this.clinicId = clinicId;
			this.diagnosisId = diagnosisId;
		}

		public String getClinicId() {
			return clinicId;
		}

		public void setClinicId(String clinicId) {
			this.clinicId = clinicId;
		}

		public Appointment() {};
	    

}
