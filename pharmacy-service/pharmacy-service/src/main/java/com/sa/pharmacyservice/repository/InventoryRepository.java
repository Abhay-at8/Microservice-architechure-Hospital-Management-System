package com.sa.pharmacyservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sa.pharmacyservice.model.Inventory;



public interface InventoryRepository extends JpaRepository<Inventory,Long> {

	Inventory findByMedicineName(String medicineName);

}
