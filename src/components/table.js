import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

// function createData(name, totalCases,test, newCases,activeCases, critical, recovered,totalDeath,newDeath,population) {
//   return { name, totalCases,test, newCases,activeCases, critical, recovered,totalDeath,newDeath,population };
// }

// const rows = [
//   createData(countrys[0], totalcasess[0], tests[0], newcasess[0], activecasess[0],criticals[0],recovereds[0],totaldeaths[0],newdeaths[0],populations[0]), 
//   createData('bangladesh', 32, 33, 67, 4,80,32,0,123,93839), 
//   createData('azerbaijan', 15, 1, 15, 9,80,10,10,12,73837), 

// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
// name, totalCases,test, newCases,activeCases, critical, recovered,totalDeath,newDeath 
const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Country/Region' },
  { id: 'totalCases', numeric: true, disablePadding: false, label: 'totalCases' },
  { id: 'test', numeric: true, disablePadding: false, label: 'test' },
  { id: 'newCases', numeric: true, disablePadding: false, label: 'newCases' },
  { id: 'activeCases', numeric: true, disablePadding: false, label: 'activeCases' },
  { id: 'critical', numeric: true, disablePadding: false, label: 'critical' },
  { id: 'recovered', numeric: true, disablePadding: false, label: 'recovered' },
  { id: 'totalDeath', numeric: true, disablePadding: false, label: 'totalDeath' },
  { id: 'newDeath', numeric: true, disablePadding: false, label: 'newDeath' },
  { id: 'population', numeric: true, disablePadding: false, label: 'Population' },


];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    marginTop:50
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function CovidTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [stats,setStates]=useState([])
  const [countrys,setCountry]=useState([]);
  const [totalcasess,settotalcases]=useState([]);
  const [tests,settest]=useState([]);
  const [newcasess,setnewcases]=useState([]);
  const [activecasess,setactivecases]=useState([]);
  const [criticals,setcritical]=useState([]);
  const [recovereds,setrecovered]=useState([]);
  const [totaldeaths,settotaldeath]=useState([]);
  const [newdeaths,setnewdeath]=useState([]);
  const [populations,setpopulation]=useState([]);
  const [loading,setLoading]=useState()
  useEffect(() => {

      const fetchData=async ()=>{
          setLoading(true)
        const api = await fetch(`https://covid-193.p.rapidapi.com/statistics`, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "covid-193.p.rapidapi.com",
              "x-rapidapi-key": "af3582343amsh6fd18af3e3d29ddp172e9ejsn9f78ff5d80ff"
            }
          })
       {/* name, totalCases,test, newCases,activeCases, critical, recovered,totalDeath,newDeath,population */}
          var country=[]
          var totalCases=[]
          var test=[] 
          var newCases=[]
          var activeCases=[] 
          var critical=[] 
          var recovered=[]
          var totalDeath=[]
          var newDeath=[] 
          var population=[];
          const response1 = await api.json()
          for(var i=0;i<response1.response.length;i++){
            country[i]=response1.response[i].country;
            totalCases[i]=response1.response[i].cases.total;
            test[i]=response1.response[i].tests.total;
            newCases[i]=response1.response[i].cases.new;
            activeCases[i]=response1.response[i].cases.active;
            critical[i]=response1.response[i].cases.critical;
            recovered[i]=response1.response[i].cases.recovered;
            totalDeath[i]=response1.response[i].deaths.total;
            newDeath[i]=response1.response[i].deaths.new;
            population[i]=response1.response[i].population;
          }
          setCountry([...country])
          settotalcases([...totalCases])
          settest([...test])
          setnewcases([...newCases])
          setactivecases([...activeCases])
          setcritical([...critical])
          setrecovered([...recovered])
          settotaldeath([...totalDeath])
          setnewdeath([...newDeath])
          setpopulation([...population])

          console.log( "for table",response1.response[0])



          setStates(response1)
          setLoading(false)
          return api
      }
      fetchData();
  }, [])

  
  function createData(name, totalCases,test, newCases,activeCases, critical, recovered,totalDeath,newDeath,population) {
    return { name, totalCases,test, newCases,activeCases, critical, recovered,totalDeath,newDeath,population };
  }

  const rows = [
      
  ];
  function done(){
  for(var i=0;i<countrys.length;i++){
      console.log('hello world')
    // rows[i]=createData(0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 )

    rows[i]=createData(countrys[i] || 0 , totalcasess[i] || 0 , tests[i] || 0 , newcasess[i] || 0 , activecasess[i] || 0 ,criticals[i] || 0 ,recovereds[i] || 0 ,totaldeaths[i] || 0 ,newdeaths[i] || 0 ,populations[i] || 0 )
    }
    return rows
  }
  done();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
      <>
      {loading ? false :
    <div className={classes.root}>
      <Paper className={classes.paper}>

        
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                       
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.totalCases}</TableCell>
                      <TableCell align="right">{row.test}</TableCell>
                      <TableCell align="right">{row.newCases}</TableCell>
                      <TableCell align="right">{row.activeCases}</TableCell>
                      <TableCell align="right">{row.critical}</TableCell>
                      <TableCell align="right">{row.recovered}</TableCell>
                      <TableCell align="right">{row.totalDeath}</TableCell>
                      <TableCell align="right">{row.newDeath}</TableCell>
                      <TableCell align="right">{row.population}</TableCell>


                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
     
    </div>}</>
  );
}





















// import React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import { lighten, makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';

// function createData(name, totalCases,test, newCases,activeCases, critical, recovered,totalDeath,newDeath) {
//   return { name, totalCases,test, newCases,activeCases, critical, recovered,totalDeath,newDeath};
// }

// const rows = [
//   createData('Cupcake',             305, 3.7,   67, 4.3,    2,  21,     1,  32),
//   createData('Donut',               452, 25.0,  51, 4.9,    6,  67,     4.3,2),
//   createData('Eclair',              262, 16.0,  24, 6.0,    1,  25.0,   51, 10),
//   createData('Frozen yoghurt',      159, 6.0,   24, 4.0,    91, 31,     94, 0.0),
//   createData('Gingerbread',         356, 16.0,  49, 3.9,    13, 63,     0.0,94),
//   createData('Honeycomb',           408, 3.2,   87, 6.5,    42, 12,     72, 92),
//   createData('Ice cream sandwich',  237, 9.0,   37, 4.3,    31, 82,     63, 26),
//   createData('Jelly Bean',          375, 0.0,   94, 0.0,    77, 0.0,    94, 0.0),
//   createData('KitKat',              518, 26.0,  65, 7.0,    29, 26,     623,52 ),
//   createData('Lollipop',            392, 0.2,   98, 0.0,    21, 62,     61, 17 ),
//   createData('Marshmallow',         318, 0,     81, 2.0,    2,  62,     42, 91),
//   createData('Nougat',              360, 19.0,  9,  37.0,   99, 52,     0,  42),
//   createData('Oreo',                437, 18.0,  63, 4.0,    53, 187,    82, 62),
// ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//     // {/* name, totalCases,test, newCases,activeCases, critical, recovered,totalDeath,newDeath */}
    
//   { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
//   { id: 'totalCases', numeric: true, disablePadding: false, label: 'Calories' },
//   { id: 'test', numeric: true, disablePadding: false, label: 'Fat (g)' },
//   { id: 'newCases', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//   { id: 'activeCases', numeric: true, disablePadding: false, label: 'Protein (g)' },
//   { id: 'critical', numeric: true, disablePadding: false, label: 'test' },
//   { id: 'recovered', numeric: true, disablePadding: false, label: 'error' },
//   { id: 'totalDeath', numeric: true, disablePadding: false, label: 'test' },
//   { id: 'newDeath', numeric: true, disablePadding: false, label: 'test' },


// ];

// function EnhancedTableHead(props) {
//   const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{ 'aria-label': 'select all desserts' }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'default'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <span className={classes.visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </span>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// const useToolbarStyles = makeStyles((theme) => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   title: {
//     flex: '1 1 100%',
//   },
// }));

// const EnhancedTableToolbar = (props) => {
//   const classes = useToolbarStyles();
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       className={clsx(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       {numSelected > 0 ? (
//         <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
//           Nutrition
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton aria-label="delete">
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton aria-label="filter list">
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   paper: {
//     width: '100%',
//     marginBottom: theme.spacing(2),
//   },
//   table: {
//     minWidth: 750,
//   },
//   visuallyHidden: {
//     border: 0,
//     clip: 'rect(0 0 0 0)',
//     height: 1,
//     margin: -1,
//     overflow: 'hidden',
//     padding: 0,
//     position: 'absolute',
//     top: 20,
//     width: 1,
//   },
// }));

// export default function CovidTable() {
//   const classes = useStyles();
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('calories');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = rows.map((n) => n.name);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//   return (
//     <div className={classes.root}>
//       <Paper className={classes.paper}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer>
//           <Table
//             className={classes.table}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//             aria-label="enhanced table"
//           >
//             <EnhancedTableHead
//               classes={classes}
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {stableSort(rows, getComparator(order, orderBy))
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => {
//                   const isItemSelected = isSelected(row.name);
//                   const labelId = `enhanced-table-checkbox-${index}`;

//                   return (
//                     <TableRow
//                       hover
//                       onClick={(event) => handleClick(event, row.name)}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       tabIndex={-1}
//                       key={row.name}
//                       selected={isItemSelected}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           checked={isItemSelected}
//                           inputProps={{ 'aria-labelledby': labelId }}
//                         />
//                       </TableCell>
//                       <TableCell component="th" id={labelId} scope="row" padding="none">
//                         {row.name}
//                       </TableCell>
//                       {/* name, totalCases,test, newCases,activeCases, critical, recovered,totalDeath,newDeath */}
//                       <TableCell align="right">{row.totalCases}</TableCell>
//                       <TableCell align="right">{row.test}</TableCell>
//                       <TableCell align="right">{row.newCases}</TableCell>
//                       <TableCell align="right">{row.activeCases}</TableCell>
//                       <TableCell align="right">{row.critical}</TableCell>
//                       <TableCell align="right">{row.recovered}</TableCell>
//                       <TableCell align="right">{row.totalDeath}</TableCell>
//                       <TableCell align="right">{row.newDeath}</TableCell>

//                     </TableRow>
//                   );
//                 })}
//               {emptyRows > 0 && (
//                 <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onChangePage={handleChangePage}
//           onChangeRowsPerPage={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label="Dense padding"
//       />
//     </div>
//   );
// }
