package com.sa.doctorservice.service;

import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.processing.Find;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.sa.doctorservice.model.Doctor;
import com.sa.doctorservice.repository.DoctorRepository;

@Service
public class DoctorService {
	
	@Autowired
	DoctorRepository docRepository;

	public List<Doctor> fetchDoctors() {
		//Doctor doc=new Doctor(0, "Abhay", "Cancer", (float) 1000, "MD","Apollo" );
		
		return docRepository.findAll();
	}

	public void addDoctor(Doctor doctor) {

		docRepository.save(doctor);
	}

	public boolean deleteDoctorById(Long id) {
		Optional<Doctor> docOpt = docRepository.findById(id);
		if(docOpt.isPresent()) {
			docRepository.deleteById(id);
			return true;
		}
		else {
			return false;
		}
	}

	public boolean updateDoctor(Long id, Doctor updatedDoctor) {
		Optional<Doctor> docOpt = docRepository.findById(id);
		
		if(docOpt.isPresent()) {
			Doctor doc=docOpt.get();
			doc.setDoctorName(updatedDoctor.getDoctorName());
			doc.setHospital(updatedDoctor.getHospital());
			doc.setConsultancyCharges(updatedDoctor.getConsultancyCharges());
			doc.setQualification(updatedDoctor.getQualification());
			doc.setSpecilization(updatedDoctor.getSpecilization());
			doc.setRegistrationNo(updatedDoctor.getRegistrationNo());
			docRepository.save(doc);
			return true;
		}
		return false;
	}

	public Optional<Doctor> getDoctorById(Long id) {
		
		return docRepository.findById(id);
	}

	public List<Doctor> getDoctorbySpecialization(String specialization) {
		return docRepository.findBySpecilization(specialization);
	}

	public Doctor getDoctorbyEmailId(String emailId) {
		
		return docRepository.findByEmailId(emailId);
	}

	public Doctor validateUser(Doctor doctorReq) {
		// TODO Auto-generated method stub
		Doctor doctor=docRepository.findByEmailId(doctorReq.getEmailId());
		if(doctor.getPassword().equals(doctorReq.getPassword())) return doctor;
		return null;
		
		
	}

}
