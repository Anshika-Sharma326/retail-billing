import React from "react";

import {
  Card,
  CardContent,
  Typography
} from "@mui/material";


function ReportCard({title,value}){

  return(

    <Card
      sx={{
        minWidth:220,
        boxShadow:3
      }}
    >

      <CardContent>

        <Typography
          color="text.secondary"
        >
          {title}
        </Typography>


        <Typography
          variant="h4"
        >
          {value}
        </Typography>


      </CardContent>


    </Card>

  )

}


export default ReportCard;