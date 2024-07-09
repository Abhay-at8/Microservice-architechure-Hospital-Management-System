package com.sa.appointmentservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sa.appointmentservice.model.Diagnosis;

public interface DiagnosisRepository  extends JpaRepository<Diagnosis,Long>{

	List<Diagnosis> findByPatientId(Long patientId);

	Diagnosis findByAppointmentId(Long id);

	

}
