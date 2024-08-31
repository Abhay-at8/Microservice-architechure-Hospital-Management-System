package com.sa.pharmacyservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.sa.pharmacyservice.model.Diagnosis;
import com.sa.pharmacyservice.model.Inventory;
import com.sa.pharmacyservice.model.PharmacyOrder;
import com.sa.pharmacyservice.service.PharmacyService;


@RequestMapping(value = "/pharmacy-api")
@RestController
public class PharmacyController {
	
	@Autowired
	PharmacyService pharmacyService;

	@GetMapping("/")
    public String hello(){
        return  "hello  pharmacy";
	}
	
	
	@GetMapping("/createOrder/{diagnosisId}")
    public String createOrder(@PathVariable("diagnosisId") Long diagnosisId, @RequestHeader (name="Authorization") String token){
		System.out.println("YO "+token);
		return pharmacyService.createOrder(diagnosisId);
       // return  "Order Created Successfully";
	}
	
	@PostMapping("/addInventory")
    public String addInventory(@RequestBody Inventory inventory){
		
		pharmacyService.addInventory(inventory);
        return "Inventory added Successfully ";
    }
	
	@GetMapping("/getInventoryItems")
	 public List<Inventory> getInventoryItems() {
		
		return pharmacyService.getInventoryItems();
	}
	
	@GetMapping("/getPharmacyOrders")
	 public List<PharmacyOrder> getPharmacyOrders() {
		
		return pharmacyService.getPharmacyOrders();
	}
	
	@GetMapping("/getInventoryMedicines")
	 public List<String> getInventoryMedicines() {
		
		return pharmacyService.getInventoryMedicines();
	}
	
}
