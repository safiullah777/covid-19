import React ,{useEffect,useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ActivityIndicator from "react-activity-indicator";
import "react-activity-indicator/src/activityindicator.css";
import PaperList from './paper'
import Chart from './chart'
import CovidTable from './table'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        // width:window.innerWidth
        // height:"100%",
        // backgroundColor:"red"
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
      formControl:{
          width:"90%"
      },
}));

export default function SpacingGrid() {

  const classes = useStyles();
  const [countries, setCountries] = useState();
  const [country,setCountry]=useState('WorldWide')
  const [query ,setQuery]=useState();
  const [loading ,setLoading]=useState(true)
  useEffect(() => {
    const getData = async () => {
        console.log("checking country",country)
        setLoading(true)
      const data = await fetch("https://covid-193.p.rapidapi.com/countries", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
          "x-rapidapi-key": "af3582343amsh6fd18af3e3d29ddp172e9ejsn9f78ff5d80ff"
        }
      })

      const response = await data.json()
      setCountries(response.response);
        if(country=='WorldWide') {

      const api = await fetch(`https://covid-193.p.rapidapi.com/statistics?country=all`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
          "x-rapidapi-key": "af3582343amsh6fd18af3e3d29ddp172e9ejsn9f78ff5d80ff"
        }
      })

            const response1 = await api.json()
            // console.log(response1)
            setQuery(response1)
            setLoading(false)
            return api
    }
    else{
            const api = await fetch(`https://covid-193.p.rapidapi.com/statistics?country=${country}`, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "covid-193.p.rapidapi.com",
              "x-rapidapi-key": "af3582343amsh6fd18af3e3d29ddp172e9ejsn9f78ff5d80ff"
            }
          })
    
          const response1 = await api.json()
          console.log(response1)
          setQuery(response1)
          setLoading(false)
          return api;
    }


}
            getData()
  }, [country])
  const handleChange = (event) => {
    setCountry(event.target.value);
    setLoading(true)
  };


  return (
    <>

    {!loading  ?
    <div className={classes.root}>
    <Grid container>
        {/* {console.log(countries)} */}
         
            <AppBar position="static">
        <Toolbar>
            <Grid justify='center' style={{marginTop:10,marginBottom:10}} spacing={2} container>
                <Grid item >
          <Typography  variant="h6" noWrap>
            Covid-19 Tracker
          </Typography>
          </Grid></Grid>
          </Toolbar>
          </AppBar>

          <Grid container style={{marginTop:20}} justify='center'>
              <Grid item xs={10} sm={8} lg={6}>
          <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Region
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={country}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="WorldWide">
            <em>WorldWide</em>
          </MenuItem>
          {countries.map((value,key)=>{
            return <MenuItem key={key} value={value}>{value}</MenuItem>
        })}
        </Select>
        <FormHelperText>select countries</FormHelperText>
      </FormControl>
            </Grid>
          </Grid>
           
    </Grid>
        {/* <Grid container><h3>Last Update</h3></Grid> */}
    <PaperList data={query.response[0]} />
    {/* {console.log(parseInt(query.response[0].cases.new))} */}
        <Chart data={query.response[0]} country={country}/>
        <CovidTable />




    </div>
  
    :
         
          <div
          style={{
              height: "100vh",
              justifyContent: "center",
              alignItem: "center",
              backgroundColor: "black",
              opacity: 0.8,
          }}
      >
          <ActivityIndicator
              number={5}
              diameter={40}
              borderWidth={1}
              duration={100}
              activeColor="#66D9EF"
              borderColor="white"
              borderWidth={2}
              borderRadius="10%"
          />
      </div>

      







          }</>
  );
}
