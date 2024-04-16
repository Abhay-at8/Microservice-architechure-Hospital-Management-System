package com.sa.patientservice.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.sa.patientservice.model.Patient;
import com.sa.patientservice.service.PatientService;

@RequestMapping(value = "/patient-api")
@RestController
public class PatientController {
	
	@Autowired
	PatientService patientService;
	

	@GetMapping("/getPatients")
    public List<Patient> getPatients(){
        return  patientService.fetchPatients();
	}
	
	@GetMapping("/getPatientbyId/{id}")
    public Optional<Patient> getPatientbyId(@PathVariable("id") Long id){
        return  patientService.getPatientbyId(id);
	}
	
	@PostMapping("/addPatient")
    public String addPatient(@RequestBody Patient patient){
		patientService.addPatient(patient);
		return "Patient added Successfully";
    }
	
	@PutMapping("/updatePatient/{id}")
    public String updatePatient(@PathVariable("id") Long id,@RequestBody Patient patient){
		Boolean update=patientService.updatePatient(id,patient);
		
		if(update) {
			return "Patient updatePatient Successfully";
	    }
		return "Error during update ";
		}
	
	
	@DeleteMapping("/deletePatient/{id}")
	public String deleteDoctorById(@PathVariable("id") Long id) {
		boolean deleted=patientService.deletePatientById(id);
		if(deleted) {
			return "Delete Successfull";
		}
		return "Error during delete ";
	}
	

	@PostMapping("/auth")
    public Patient validateUser(@RequestBody Patient patient){
		return patientService.validateUser(patient);
		 
    }
		

}
