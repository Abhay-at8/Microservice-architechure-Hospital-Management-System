package com.sa.pharmacyservice.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sa.pharmacyservice.model.Diagnosis;
import com.sa.pharmacyservice.model.Inventory;
import com.sa.pharmacyservice.model.OrderlineItem;
import com.sa.pharmacyservice.model.PharmacyOrder;
import com.sa.pharmacyservice.model.Prescription;
import com.sa.pharmacyservice.repository.InventoryRepository;
import com.sa.pharmacyservice.repository.OrderRepository;

@Service
public class PharmacyService {
	
	@Autowired
	InventoryRepository inventoryRepository;
	
	@Autowired
	OrderRepository orderRepository;
	

    private RestTemplate restTemplate;

	public String createOrder(Long diagnosisId) {
		
		restTemplate=new RestTemplate();
		 String diagnosisApiUrl = "http://localhost:8080/appointment-api/getDiagnosis/"+diagnosisId;
	     Diagnosis diagnosis = restTemplate.getForObject(diagnosisApiUrl, Diagnosis.class);
	     PharmacyOrder order=new PharmacyOrder();
	     order.setTotalCharges(BigDecimal.valueOf(0, 0));
	     order.setPatientId(diagnosis.getPatientId());
	     order.setPrescriptionId(diagnosis.getId());
	     Set<OrderlineItem> orderlineItems = new HashSet<>();
	     for (Prescription prescription : diagnosis.getPrescription()) {
	    	 OrderlineItem ordLineItm=new OrderlineItem();
	    	 ordLineItm.setMedicineName(prescription.getMedicineName());
	    	 
	    	 Inventory inv=inventoryRepository.findByMedicineName(prescription.getMedicineName());
	    	 if(inv!=null) {
		    	 if(inv.getQuantity()>=prescription.getQuantity()) {
		    		 ordLineItm.setUnitPrice(inv.getUnitPrice());
		    		 ordLineItm.setQuantity(prescription.getQuantity());
		    		 BigDecimal itemTotalCost=inv.getUnitPrice().multiply(BigDecimal.valueOf(prescription.getQuantity()));
		    		 order.setTotalCharges(order.getTotalCharges().add(itemTotalCost));
		    		 ordLineItm.setTotalPrice(itemTotalCost);
		    		 inv.setQuantity(inv.getQuantity()-prescription.getQuantity());
		    		 ordLineItm.setStatus("In Stock");
		    		 
		    	 }
		    	 else {
			    	 BigDecimal zero=new BigDecimal(0);
			    	 ordLineItm.setUnitPrice(zero);
			    	 ordLineItm.setQuantity(0);
			    	 ordLineItm.setTotalPrice(zero);
			    	 ordLineItm.setStatus("Out of Stock");
			    }
	    	 }
	    	 else {
		    	 BigDecimal zero=new BigDecimal(0);
		    	 ordLineItm.setUnitPrice(zero);
		    	 ordLineItm.setQuantity(0);
		    	 ordLineItm.setTotalPrice(zero);
		    	 ordLineItm.setStatus("Out of Stock");
	    	 }
	    	 
	    	 orderlineItems.add(ordLineItm);
	    	 
		}
	     order.setOrderlineItems(orderlineItems);
	     orderRepository.save(order);
	     return "Order Created Sucessfully";
		
		
	}

	public void addInventory(Inventory inventory) {
		
		Inventory existingInventory= inventoryRepository.findByMedicineName(inventory.getMedicineName());
		if(existingInventory!=null) {
			System.out.println("already exist hence adding more");
			existingInventory.setQuantity(existingInventory.getQuantity()+inventory.getQuantity());
			inventoryRepository.save(existingInventory);
		}
		else {
			System.out.println("Adding new inventory");
			inventoryRepository.save(inventory);
		}
	}

	public List<Inventory> getInventoryItems() {
		
		return inventoryRepository.findAll();
	}

	public List<PharmacyOrder> getPharmacyOrders() {
		return orderRepository.findAll();
		
	}

	public List<String> getInventoryMedicines() {
		List<String> medicines =new ArrayList<>();
		for (Inventory inv:inventoryRepository.findAll()) {
			if(inv.getQuantity()>0) {
				medicines.add(inv.getMedicineName());
			}
			
		}
		return medicines;
	}

	


	

}
