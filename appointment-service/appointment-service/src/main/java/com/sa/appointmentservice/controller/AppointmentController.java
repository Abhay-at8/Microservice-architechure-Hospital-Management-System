package com.sa.appointmentservice.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sa.appointmentservice.model.Appointment;
import com.sa.appointmentservice.model.Diagnosis;
import com.sa.appointmentservice.service.AppointmentService;



@RequestMapping(value = "/appointment-api")
@RestController
public class AppointmentController {
	
	@Autowired
	AppointmentService appointmentService;
	
	@GetMapping("/getDiagnosis")
	public List<Diagnosis> getDiagnosis() {
		return appointmentService.getDiagnosis();
	}
	
	@GetMapping("/getDiagnosisofPatient/{patientId}")
	public List<Diagnosis> getDiagnosisByPatientId(@PathVariable("patientId") Long patientId) {
		return appointmentService.getDiagnosisByPatientId(patientId);
	}
	
	@GetMapping("/getDiagnosis/{id}")
	public Optional<Diagnosis> getDiagnosisById(@PathVariable("id") Long id) {
		return appointmentService.getDiagnosisById(id);
	}
	
	
	@PostMapping("/addDiagnosis")
    public String addDoctor(@RequestBody Diagnosis diagnosis){
		appointmentService.addDiagnosis(diagnosis);
		return "Diagnosis added Successfully";
    }
	

	@PostMapping("/addAppointment")
    public String addDoctor(@RequestBody Appointment appointment){
		appointmentService.addAppointment(appointment);
		return "appointment added Successfully";
    }
	
	@GetMapping("/getAppointmentbyDoctor/{doctorId}")
	public List<Appointment> getAppointmentbyDoctor(@PathVariable("doctorId") Long doctorId){
		return appointmentService.getAppointmentbyDoctor(doctorId);
		
    }
	
	@GetMapping("/getAppointmentbyPatient/{patientId}")
	public List<Appointment> getAppointmentbyPatient(@PathVariable("patientId") Long patientId){
		return appointmentService.getAppointmentbyPatient(patientId);
		
    }
	
	@PutMapping("/updateAppointment/{id}")
    public String updateAppointment(@PathVariable("id") Long id ,@RequestBody Appointment appointment){
		Boolean update=appointmentService.updateAppointment(id,appointment);
		if(update) {
			return "Update Sucessfull";
		}
		return "Error during update ";
    }
}
