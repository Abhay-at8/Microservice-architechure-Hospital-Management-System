package com.sa.pharmacyservice.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

@Entity
public class PharmacyOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	Long patientId;
	Long doctorId;
	Long prescriptionId;
	Boolean doDelivery;
	BigDecimal deliveryCharges;
	BigDecimal totalCharges;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    Set<OrderlineItem> orderlineItems = new HashSet<>();
	
	

	
	public PharmacyOrder() {}




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




	public Long getPrescriptionId() {
		return prescriptionId;
	}




	public void setPrescriptionId(Long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}




	public Boolean getDoDelivery() {
		return doDelivery;
	}




	public void setDoDelivery(Boolean doDelivery) {
		this.doDelivery = doDelivery;
	}




	public BigDecimal getDeliveryCharges() {
		return deliveryCharges;
	}




	public void setDeliveryCharges(BigDecimal deliveryCharges) {
		this.deliveryCharges = deliveryCharges;
	}




	public BigDecimal getTotalCharges() {
		return totalCharges;
	}




	public void setTotalCharges(BigDecimal totalCharges) {
		this.totalCharges = totalCharges;
	}




	public Set<OrderlineItem> getOrderlineItems() {
		return orderlineItems;
	}




	public void setOrderlineItems(Set<OrderlineItem> orderlineItems) {
		this.orderlineItems = orderlineItems;
	}




	public Long getDoctorId() {
		return doctorId;
	}




	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}




	public PharmacyOrder(Long id, Long patientId, Long doctorId, Long prescriptionId, Boolean doDelivery,
			BigDecimal deliveryCharges, BigDecimal totalCharges, Set<OrderlineItem> orderlineItems) {
		super();
		this.id = id;
		this.patientId = patientId;
		this.doctorId = doctorId;
		this.prescriptionId = prescriptionId;
		this.doDelivery = doDelivery;
		this.deliveryCharges = deliveryCharges;
		this.totalCharges = totalCharges;
		this.orderlineItems = orderlineItems;
	}





	
	
	
	
}
