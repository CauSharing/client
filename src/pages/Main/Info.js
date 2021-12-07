import React from "react";
import {Box, Typography} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    notebook : {
        display: "flex",
        flexDirection:"column",
        [theme.breakpoints.down('sm')]:{
          display: "none",
        }
    },
    phone : {
        display: "none",
        [theme.breakpoints.down('sm')]:{
            display: "flex",
            flexDirection:"column",
        }
    },
  }));

function Info(){
    const classes = useStyles();

    return(
        <Box sx={{width: "100vw", height: "80vh", display:"flex", flexDirection:"column",justifyContent:"center",
        paddingLeft: "30px", paddingRight:"30px"}}>
            <Box sx={{marginBottom:'5vh'}} className={classes.notebook}>
                <Typography variant="h1" color="primary">Cau x Cau</Typography>
                <Typography variant="h1" color="primary">Country x Country</Typography>
            </Box>
            <Box sx={{marginBottom:'5vh'}} className={classes.phone}>
                <Typography variant="h2" color="primary">Cau x Cau</Typography>
                <Typography variant="h2" color="primary">Country x Country</Typography>
            </Box>
            <Box sx={{marginLeft:"5px"}}>
                <Typography variant="body1" color="#838383">We connect Chungang univ. students.</Typography>
                <Typography variant="body1" color="#838383">With CxC, you can be friends with people from different countries.</Typography>
            </Box>
        </Box>
    );
}

export default Info;