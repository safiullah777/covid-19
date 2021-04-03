import React ,{useState,useEffect}from 'react'
import {Line} from 'react-chartjs-2'
import Grid from '@material-ui/core/Grid';
import ActivityIndicator from "react-activity-indicator";
import "react-activity-indicator/src/activityindicator.css";
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import useWindowSize from './windowsize'
const Chart=(props)=>{
    const [loading ,setLoading]=useState(false);
    const [history ,setHistory]=useState();
    const [day,setDay]=useState([]);
    const [cases,setCases]=useState([]);
    const [activeCase,setActiveCase]=useState([]);
    const [criticalcases,setCriticalCases]=useState([]);
    const [recoverdCases,setRecoverdCases]=useState([]);
    const [totalDeaths,setTotalDeaths]=useState([]);
    useEffect(() => {
            setLoading(true)

        const getData = async () => {
            setLoading(true)
            if(props.country=="WorldWide"){
          var data = await fetch(`https://covid-193.p.rapidapi.com/history?country=all`, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "covid-193.p.rapidapi.com",
              "x-rapidapi-key": "af3582343amsh6fd18af3e3d29ddp172e9ejsn9f78ff5d80ff"
            }
          })
        }
        else{
            data = await fetch(`https://covid-193.p.rapidapi.com/history?country=${props.country}`, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "covid-193.p.rapidapi.com",
              "x-rapidapi-key": "af3582343amsh6fd18af3e3d29ddp172e9ejsn9f78ff5d80ff"
            }
          })
        }
          const response = await data.json()
          setHistory(response)
          var arr=response.response;
        //   console.log('statistics ',arr)
          var date=[]
          var totalCases=[]
          var activeCases=[]
          var critical=[]
          var recoverd=[]
          var totalDeath=[]
          var dayy=""
          for(let i = 0; i < arr.length; i++) {
              if(dayy!==arr[i].day){
              date.push(arr[i].day);
              totalCases.push(arr[i].cases.total)
              activeCases.push(arr[i].cases.active)
              critical.push(arr[i].cases.critical)
              recoverd.push(arr[i].cases.recovered)
              totalDeath.push(arr[i].deaths.total)
              dayy=arr[i].day
            }
          }
          console.log("date",date)
          date=date.reverse()
          totalCases=totalCases.reverse()
          activeCases=activeCases.reverse()
          critical=critical.reverse()
          recoverd=recoverd.reverse()
          totalDeath=totalDeath.reverse()
          setDay([...date])
          setCases([...totalCases])
          setActiveCase([...activeCases])
          setCriticalCases([...critical])
          setRecoverdCases([...recoverd])
          setTotalDeaths([...totalDeath])
          setLoading(false)
          return data
        }
        getData()
        },[])
   
    const data = {
        labels: [...day],
        datasets: [
          {
            label: 'Total Cases',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [...cases]
          },
          {
            label: 'Active Cases',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgb(168,50,123,0.4)',
            borderColor: '#a8327b',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#a8327b',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#a8327b',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [...activeCase]
          },
          {
            label: 'Total Deaths',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgb(138,3,3,0.4)',
            borderColor: '#8a0303',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#8a0303',
            pointBackgroundColor: '#8a0303',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#8a0303',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [...totalDeaths]
          },
          {
            label: 'Critical Cases',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgb(242,87,48,0.4)',
            borderColor: '#f25730',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#f25730',
            pointBackgroundColor: '#f25730',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#f25730',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [...criticalcases]
          },
          {
            label: 'Recoverd',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgb(32,252,3,0.4)',
            borderColor: '#20fc03',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#20fc03',
            pointBackgroundColor: '#20fc03',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#20fc03',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [...recoverdCases]
          },
          
        ]
      };
    //   const { width } = useWindowSize();
    const size = useWindowSize();

    return(
        <>
            {!loading ?
            <Grid container justify='center' style={{marginTop:70}}>
            <Grid className="chart" item sm={10} xs={12}>
                <Line 
                 height={size.height}
                options={{ responsive: true }} data={data}/>
            </Grid>
            </Grid>:
            <div
            style={{
                width:"100vw",
                height: "50vh",
                justifyContent: "center",
                alignItem: "center",
                // backgroundColor: "gray",
                opacity: 0.4,
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
  
            }
        </>
    )
}
export default Chart;