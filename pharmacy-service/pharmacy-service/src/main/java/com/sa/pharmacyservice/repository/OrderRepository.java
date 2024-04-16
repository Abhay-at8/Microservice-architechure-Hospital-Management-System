package com.sa.pharmacyservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.sa.pharmacyservice.model.PharmacyOrder;

public interface OrderRepository extends JpaRepository<PharmacyOrder,Long>  {

}
