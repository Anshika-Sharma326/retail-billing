import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";


function RecentBills(){

  const bills = [
    {
      id:1,
      customer:"Rahul Sharma",
      amount:"$500",
      date:"25 July 2026"
    },
    {
      id:2,
      customer:"Ankit Verma",
      amount:"$1200",
      date:"25 July 2026"
    },
    {
      id:3,
      customer:"Priya Singh",
      amount:"$800",
      date:"24 July 2026"
    }
  ];


  return(
    <TableContainer component={Paper} sx={{marginTop:4}}>

      <Table>

        <TableHead>
          <TableRow>

            <TableCell>Bill ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>

          </TableRow>
        </TableHead>


        <TableBody>

          {
            bills.map((bill)=>(
              <TableRow key={bill.id}>

                <TableCell>
                  {bill.id}
                </TableCell>

                <TableCell>
                  {bill.customer}
                </TableCell>

                <TableCell>
                  {bill.amount}
                </TableCell>

                <TableCell>
                  {bill.date}
                </TableCell>

              </TableRow>
            ))
          }

        </TableBody>

      </Table>

    </TableContainer>
  )
}


export default RecentBills;