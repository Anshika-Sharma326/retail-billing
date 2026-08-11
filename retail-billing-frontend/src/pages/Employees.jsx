import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from "@mui/material";
function Employees(){
const [employees, setEmployees] = useState([]);
const [search, setSearch] = useState("");
useEffect(() => {
    loadEmployees();
}, []);

const loadEmployees = async () => {

    try {

        const response = await api.get("/admin/employees");

        setEmployees(response.data);

    } catch (error) {

        console.log(error);

    }

};
const filteredEmployees = employees.filter((employee) =>
    employee.fullName.toLowerCase().includes(search.toLowerCase()) ||
    employee.username.toLowerCase().includes(search.toLowerCase())
);
const disableEmployee = async (id) => {

    try {

        await api.put(`/admin/disable/${id}`);

        loadEmployees();

    } catch (error) {

        console.log(error);

    }

};
const enableEmployee = async (id) => {

    try {

        await api.put(`/admin/enable/${id}`);

        loadEmployees();

    } catch (error) {

        console.log(error);

    }

};
const deleteEmployee = async (id) => {

    if (!window.confirm("Delete Employee?"))
        return;
    try {
        await api.delete(`/admin/delete/${id}`);
        loadEmployees();

    } catch (error) {

        console.log(error);
    }
};
return (
  <Box sx={{ p: 3 }}>

    <Typography
      variant="h4"
      fontWeight="bold"
      mb={3}
    >
      Employees Management
    </Typography>

    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
        boxShadow: "0 3px 12px rgba(0,0,0,.08)",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          Total Employees
        </Typography>

        <Typography
          variant="h3"
          color="primary"
          fontWeight="bold"
        >
          {employees.length}
        </Typography>
      </CardContent>
    </Card>

    <TextField
      fullWidth
      label="Search Employee"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ mb: 3 }}
    />

    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: "0 3px 12px rgba(0,0,0,.08)",
      }}
    >
      <Table>

        <TableHead>
          <TableRow
            sx={{
              background: "#F8FAFC",
            }}
          >
            <TableCell>
              <b>Name</b>
            </TableCell>

            <TableCell>
              <b>Username</b>
            </TableCell>

            <TableCell>
              <b>Role</b>
            </TableCell>

            <TableCell>
              <b>Status</b>
            </TableCell>

            <TableCell align="center">
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {filteredEmployees.length > 0 ? (

            filteredEmployees.map((employee) => (

              <TableRow key={employee.id} hover>

                <TableCell>
                  {employee.fullName}
                </TableCell>

                <TableCell>
                  {employee.username}
                </TableCell>

                <TableCell>
                  {employee.role}
                </TableCell>

                <TableCell>

                  <Chip
                    label={employee.status}
                    color={
                      employee.status === "ACTIVE"
                        ? "success"
                        : "error"
                    }
                    sx={{
                      fontWeight: "bold",
                    }}
                  />

                </TableCell>

                <TableCell align="center">

                  {employee.status === "ACTIVE" ? (

                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() =>
                        disableEmployee(employee.id)
                      }
                      sx={{ mr: 1 }}
                    >
                      Disable
                    </Button>

                  ) : (

                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() =>
                        enableEmployee(employee.id)
                      }
                      sx={{ mr: 1 }}
                    >
                      Enable
                    </Button>

                  )}

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() =>
                      deleteEmployee(employee.id)
                    }
                  >
                    Delete
                  </Button>

                </TableCell>

              </TableRow>

            ))

          ) : (

            <TableRow>

              <TableCell
                colSpan={5}
                align="center"
              >
                No Employees Found
              </TableCell>

            </TableRow>

          )}

        </TableBody>

      </Table>
    </TableContainer>

  </Box>
);
}
export default Employees;