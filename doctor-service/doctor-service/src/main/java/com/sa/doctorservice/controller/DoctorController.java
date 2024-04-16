package com.sa.doctorservice.controller;

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

import com.sa.doctorservice.model.Doctor;
import com.sa.doctorservice.service.DoctorService;

@RequestMapping(value = "/doctor-api")
@RestController
public class DoctorController {
	
	@Autowired
	DoctorService docService;
	

	
	@GetMapping("/getDoctor")
    public List<Doctor> fetchDoctors(){
        return  docService.fetchDoctors();
	}
	
	@GetMapping("/getDoctorbySpecialization/{specialization}")
    public List<Doctor> getDoctorbySpecialization(@PathVariable("specialization") String specialization){
        return  docService.getDoctorbySpecialization(specialization);
	}
	
	@GetMapping("/getDoctorById/{id}")
    public Optional<Doctor> getDoctorById(@PathVariable("id") Long id){
        return  docService.getDoctorById(id);
	}
	
	
	
	@PostMapping("/addDoctor")
    public String addDoctor(@RequestBody Doctor doctor){
         docService.addDoctor(doctor);
         return "Sucessfully Added";
    }
	
	@DeleteMapping("/deleteDoctor/{id}")
	public String deleteDoctorById(@PathVariable("id") Long id) {
		boolean deleted=docService.deleteDoctorById(id);
		if(deleted) {
			return "Delete Sucessfull";
		}
		return "Error during delete ";
		 
	 }
	@PutMapping("/updateDoctor/{id}")
	public String updateDoctor(@PathVariable Long id,@RequestBody Doctor doctor) {
		boolean update=docService.updateDoctor(id,doctor);
		if(update) {
			return "Update Sucessfull";
		}
		return "Error during update ";
		 
	 }
	
	@PostMapping("/auth")
    public Doctor validateUser(@RequestBody Doctor doctor){
		return docService.validateUser(doctor);
		 
    }
	
	@GetMapping("/getDoctorbyEmailId/{emailId}")
    public Doctor getDoctorbyEmailId(@PathVariable("emailId") String emailId){
        return  docService.getDoctorbyEmailId(emailId);
	}
}
