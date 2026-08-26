package com.retail.billing.controller;

import com.retail.billing.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {


    @Autowired
    private InvoiceService invoiceService;



    @GetMapping("/{billId}")
    public ResponseEntity<byte[]> generateInvoice(
            @PathVariable Long billId) {


        byte[] pdf = invoiceService.generateInvoice(billId);


        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=invoice_" + billId + ".pdf"
                )
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);

    }

}