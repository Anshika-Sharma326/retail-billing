package com.retail.billing.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import com.retail.billing.entity.Bill;
import com.retail.billing.entity.BillItem;
import com.retail.billing.repository.BillRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import com.retail.billing.exception.BillNotFoundException;


@Service
public class InvoiceService {


    @Autowired
    private BillRepository billRepository;


    public byte[] generateInvoice(Long billId) {




        Bill bill = billRepository.findById(billId)
                .orElseThrow(() ->
                        new BillNotFoundException("Bill not found with id: " + billId));

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();


        try {

            Document document = new Document();

            PdfWriter.getInstance(
                    document,
                    outputStream
            );


            document.open();


            // Title
            Font titleFont = new Font(
                    Font.FontFamily.HELVETICA,
                    18,
                    Font.BOLD
            );


            Paragraph title = new Paragraph(
                    "Retail Billing Invoice",
                    titleFont
            );

            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);

            document.add(new Paragraph(" "));


            // Customer Details

            document.add(
                    new Paragraph(
                            "Customer Name : "
                                    + bill.getCustomer().getName()
                    )
            );

            document.add(
                    new Paragraph(
                            "Mobile : "
                                    + bill.getCustomer().getMobile()
                    )
            );

            document.add(
                    new Paragraph(
                            "Email : "
                                    + bill.getCustomer().getEmail()
                    )
            );


            document.add(new Paragraph(" "));


            // Bill Details

            document.add(
                    new Paragraph(
                            "Bill ID : "
                                    + bill.getId()
                    )
            );

            document.add(
                    new Paragraph(
                            "Date : "
                                    + bill.getBillDate()
                    )
            );


            document.add(new Paragraph(" "));


            // Product Table

            PdfPTable table = new PdfPTable(5);

            table.setWidthPercentage(100);


            table.addCell("Product");
            table.addCell("Category");
            table.addCell("Price");
            table.addCell("Quantity");
            table.addCell("Total");


            for(BillItem item : bill.getItems()) {


                table.addCell(
                        item.getProduct()
                                .getProductName()
                );


                table.addCell(
                        item.getProduct()
                                .getCategory()
                );


                table.addCell(
                        String.valueOf(
                                item.getPrice()
                        )
                );


                table.addCell(
                        String.valueOf(
                                item.getQuantity()
                        )
                );


                table.addCell(
                        String.valueOf(
                                item.getTotalPrice()
                        )
                );

            }


            document.add(table);


            document.add(new Paragraph(" "));


            document.add(
                    new Paragraph(
                            "Total Amount : "
                                    + bill.getTotalAmount()
                    )
            );


            document.close();


        } catch(Exception e) {

            throw new RuntimeException(
                    "Error generating invoice"
            );
        }


        return outputStream.toByteArray();

    }

}