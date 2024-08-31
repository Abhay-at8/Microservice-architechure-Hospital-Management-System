package com.sa.appointmentservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sa.appointmentservice.kafka.KafkaProducer;
import com.sa.appointmentservice.model.Appointment;
import com.sa.appointmentservice.model.Diagnosis;
import com.sa.appointmentservice.repository.AppointmentRepository;
import com.sa.appointmentservice.repository.DiagnosisRepository;




@Service
public class AppointmentService {
	
	@Autowired
	DiagnosisRepository diagnosisRepository;
	
	@Autowired
	AppointmentRepository appointmentRepository;

	@Autowired
	KafkaProducer kafkaProducer;
	
	public List<Diagnosis> getDiagnosis(){
		return diagnosisRepository.findAll();
	}
	
	public void addDiagnosis(Diagnosis diagnosis) {
		
		Optional<Appointment> aptOpt = appointmentRepository.findById(diagnosis.getAppointmentId());
		diagnosisRepository.save(diagnosis);
		kafkaProducer.sendMessage(diagnosis);
		
		if(aptOpt.isPresent()) {
			
			Appointment appointment =aptOpt.get();
			Diagnosis dg=diagnosisRepository.findByAppointmentId(appointment.getId());
			appointment.setDiagnosisId(dg.getAppointmentId());
			
			appointment.setAppointmentStatus("Diagnosis Completed");
			appointmentRepository.save(appointment);
		}
		
		
		
	}

	public List<Diagnosis> getDiagnosisByPatientId(Long patientId) {
		
		return diagnosisRepository.findByPatientId(patientId);
	}

	public Optional<Diagnosis> getDiagnosisById(Long id) {
		return diagnosisRepository.findById(id);
		
	}

	public void addAppointment(Appointment appointment) {
		appointmentRepository.save(appointment);
		
	}

	public List<Appointment> getAppointmentbyDoctor(Long doctorId) {
	
		return appointmentRepository.findByDoctorId(doctorId);
	}

	public List<Appointment> getAppointmentbyPatient(Long patientId) {
		
		return appointmentRepository.findByPatientId(patientId);
	}

	public Boolean updateAppointment(Long id, Appointment updatedAppointment) {
			Optional<Appointment> aptOpt = appointmentRepository.findById(id);
		
		if(aptOpt.isPresent()) {
			Appointment appointment =aptOpt.get();
			appointment.setAppointmentStatus(updatedAppointment.getAppointmentStatus());
			appointmentRepository.save(appointment);
			return true;
		}
		return false;
	
		
	}

}
