package com.sa.patientservice.model;



import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;



@Entity
public class Patient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	String patientName;
	Integer patientAge;
	String emailId;
	String password;
	String phoneno;
	String profileType;
	
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    Address address;
	
	public Patient() {};
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public Integer getPatientAge() {
		return patientAge;
	}

	public void setPatientAge(Integer patientAge) {
		this.patientAge = patientAge;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}





	public String getEmailId() {
		return emailId;
	}


	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getPhoneno() {
		return phoneno;
	}


	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}


	public String getProfileType() {
		return profileType;
	}


	public void setProfileType(String profileType) {
		this.profileType = profileType;
	}


	public Patient(Long id, String patientName, Integer patientAge, String emailId, String password, String phoneno,
			String profileType, Address address) {
		super();
		this.id = id;
		this.patientName = patientName;
		this.patientAge = patientAge;
		this.emailId = emailId;
		this.password = password;
		this.phoneno = phoneno;
		this.profileType = profileType;
		this.address = address;
	}







	
	
	
	


}
