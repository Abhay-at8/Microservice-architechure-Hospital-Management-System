package com.sa.patientservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.sa.patientservice.model.Patient;
import com.sa.patientservice.repository.PatientRepository;

@Service
public class PatientService {
	
	@Autowired
	PatientRepository patientRepository;
	
	public List<Patient> fetchPatients() {
		return patientRepository.findAll();
	}
	
	public void addPatient(Patient patient) {
		patientRepository.save(patient);
	}

	public Boolean updatePatient(Long id, Patient updatedPatient) {
			Optional<Patient> patientOpt = patientRepository.findById(id);
		
		if(patientOpt.isPresent()) {
			Patient patient =patientOpt.get();
			patient.setAddress(updatedPatient.getAddress());
			patient.setPatientAge(updatedPatient.getPatientAge());
			patient.setPatientName(updatedPatient.getPatientName());
			patientRepository.save(patient);
			return true;
		}
		return false;
		
	}

	public boolean deletePatientById(Long id) {
		Optional<Patient> patientOpt = patientRepository.findById(id);
		if(patientOpt.isPresent()) {
			patientRepository.deleteById(id);
			return true;
		}
		else {
			return false;
		}
	}

	public Optional<Patient> getPatientbyId(Long id) {
		return patientRepository.findById(id);
		
	}

	public Patient validateUser(Patient patientReq) {
		Patient patient=patientRepository.findByEmailId(patientReq.getEmailId());
		if(patient.getPassword().equals(patientReq.getPassword())) return patient;
		return null;
	}
	
	

}
