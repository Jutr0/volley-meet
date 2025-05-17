import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

const InfoItem = ({label, value}) => (
    <Grid container spacing={2} sx={{mb: 1}}>
        <Grid item xs={12} sm={3}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">
                {label}:
            </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
            <Typography variant="body1">
                {value}
            </Typography>
        </Grid>
    </Grid>
);


export default InfoItem;