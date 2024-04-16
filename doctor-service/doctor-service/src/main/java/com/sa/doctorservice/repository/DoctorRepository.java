package com.sa.doctorservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sa.doctorservice.model.Doctor;

public interface DoctorRepository  extends JpaRepository<Doctor,Long>{

	List<Doctor> findBySpecilization(String specialization);

	Doctor findByEmailId(String emailId);

}
