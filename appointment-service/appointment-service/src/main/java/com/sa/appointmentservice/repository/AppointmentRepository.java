package com.sa.appointmentservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sa.appointmentservice.model.Appointment;
import com.sa.appointmentservice.model.Diagnosis;

public interface AppointmentRepository extends JpaRepository<Appointment,Long>{


	List<Appointment> findByDoctorId(Long doctorId);

	List<Appointment> findByPatientId(Long patientId);

}
