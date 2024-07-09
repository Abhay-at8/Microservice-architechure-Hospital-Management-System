package com.sa.appointmentservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Prescription {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	String medicineName;
	String time;
	Boolean beforeMeal;
	Integer quantity;
	Integer days;
	
	@Column(name = "diagnosis_id")
    Long diagnosisId;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getMedicineName() {
		return medicineName;
	}


	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}


	public String getTime() {
		return time;
	}


	public void setTime(String time) {
		this.time = time;
	}


	public Boolean getBeforeMeal() {
		return beforeMeal;
	}


	public void setBeforeMeal(Boolean beforeMeal) {
		this.beforeMeal = beforeMeal;
	}


	public Long getDiagnosisId() {
		return diagnosisId;
	}


	public void setDiagnosisId(Long diagnosisId) {
		this.diagnosisId = diagnosisId;
	}

	
	
	public Integer getQuantity() {
		return quantity;
	}


	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}


	public Integer getDays() {
		return days;
	}


	public void setDays(Integer days) {
		this.days = days;
	}


	public Prescription() {}


	public Prescription(Long id, String medicineName, String time, Boolean beforeMeal, Integer quantity, Integer days,
			Long diagnosisId) {
		super();
		this.id = id;
		this.medicineName = medicineName;
		this.time = time;
		this.beforeMeal = beforeMeal;
		this.quantity = quantity;
		this.days = days;
		this.diagnosisId = diagnosisId;
	}
	


	
	
}
