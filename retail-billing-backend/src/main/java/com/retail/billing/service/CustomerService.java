package com.retail.billing.service;


import com.retail.billing.entity.Customer;
import com.retail.billing.exception.CustomerNotFoundException;
import com.retail.billing.repository.CustomerRepository;
import com.retail.billing.enums.CustomerStatus;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class CustomerService {


    private final CustomerRepository customerRepository;



    public CustomerService(CustomerRepository customerRepository) {

        this.customerRepository = customerRepository;

    }



    // ==========================
    // ADD CUSTOMER
    // ==========================

    public Customer addCustomer(Customer customer) {

        if (customerRepository.existsByMobile(customer.getMobile())) {
            throw new RuntimeException(
                    "Customer already exists with mobile: "
                            + customer.getMobile()
            );
        }

        // Make sure new customers are ACTIVE
        customer.setStatus(CustomerStatus.ACTIVE);

        return customerRepository.save(customer);
    }





    // ==========================
    // GET ALL CUSTOMERS
    // ==========================

    public List<Customer> getAllCustomers() {
        return customerRepository.findByStatus(CustomerStatus.ACTIVE);
    }





    // ==========================
    // GET CUSTOMER BY ID
    // ==========================

    public Customer getCustomerById(Long id) {


        return customerRepository.findById(id)

                .orElseThrow(() ->
                        new CustomerNotFoundException(
                                "Customer not found with id : " + id
                        ));

    }





    // ==========================
    // UPDATE CUSTOMER
    // ==========================

    public Customer updateCustomer(
            Long id,
            Customer updatedCustomer) {


        Customer customer = getCustomerById(id);



        if(updatedCustomer.getName() != null) {
            customer.setName(
                    updatedCustomer.getName()
            );
        }



        if(updatedCustomer.getMobile() != null) {
            customer.setMobile(
                    updatedCustomer.getMobile()
            );
        }



        if(updatedCustomer.getEmail() != null) {
            customer.setEmail(
                    updatedCustomer.getEmail()
            );
        }



        if(updatedCustomer.getAddress() != null) {
            customer.setAddress(
                    updatedCustomer.getAddress()
            );
        }



        return customerRepository.save(customer);

    }





    // ==========================
    // DELETE CUSTOMER
    // ==========================

    public String deleteCustomer(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new CustomerNotFoundException(
                                "Customer not found with id : " + id
                        ));

        customer.setStatus(CustomerStatus.INACTIVE);

        customerRepository.save(customer);

        return "Customer deleted successfully.";
    }

}