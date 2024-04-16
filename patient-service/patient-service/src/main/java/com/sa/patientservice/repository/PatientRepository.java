package com.sa.patientservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.sa.patientservice.model.Patient;

public interface PatientRepository extends JpaRepository<Patient,Long> {

	Patient findByEmailId(String emailId);

}
