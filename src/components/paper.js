import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CountUp from 'react-countup';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:60,
    paddingLeft:50,
    paddingRight:50,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    color:"white"
  },
  totalCases:{
    // backgroundColor:"red"
    backgroundColor:"#8a0303"

  },
  activeCases:{
    backgroundColor:"#fcba03"
  },
  totalDeaths:{
      backgroundColor:'skyblue'
  },
  recovered:{
      backgroundColor:"#20fc03"
  },
  newCases:{
      backgroundColor:"#031cfc"
  },
  critical:{
    backgroundColor:"#fc9003"
},
newDeaths:{
    backgroundColor:"#ff1303"

}



}));

export default function PaperList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        {console.log("props",props.data.cases.total)}
      <Grid container justify='center' spacing={3}>
        <Demo heading={"Total Cases"} data={props.data.cases.total ||"00"} classes={classes} bg={classes.totalCases} />
        <Demo heading={"Active Cases"} data={props.data.cases.active ||"00"} classes={classes} bg={classes.activeCases} />
        <Demo heading={"Recovered"} data={props.data.cases.recovered ||"00"} classes={classes} bg={classes.recovered} />
        <Demo heading={"New Cases"} data={props.data.cases.new ||"00"} classes={classes} bg={classes.newCases} />
        <Demo heading={"Total Deaths"} data={props.data.deaths.total ||"00"} classes={classes} bg={classes.totalDeaths} />
        <Demo heading={"New Deaths"} data={props.data.deaths.new ||"00"} classes={classes} bg={classes.newDeaths} />
        <Demo heading={"Critical Cases"} data={props.data.cases.critical ||"00"} classes={classes} bg={classes.critical} />
      </Grid>
    </div>
  );
}
const Demo=(props)=>{
    const count=()=>{
        var data=parseInt(props.data)
          return  data;
    }
    return(
        
        <>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper justify='center' elevation={1} className={`${props.classes.paper} ${props.bg}`}>
              <p className={'cardheading'} style={{fontSize:20,marginBottom:8}}>{props.heading}</p>
              <h1 className='number'>{typeof(props.data)=='string'?'+':null}<CountUp end={count()} duration={1} /></h1>
          </Paper>
        </Grid>
        </>
    )
}
