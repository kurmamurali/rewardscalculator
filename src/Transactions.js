import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from "moment";
function Transactions({userData,transactions}) {
  const renderPoints = (amount) =>{
    let points =0 ;
    if(amount > 100){
      points = ((amount -100) *2 ) + (50*1); 
    } else if ( amount > 50 ){
      points= (amount - 50) * 1;
    } else {
      points = 0;
    }
    return points;
  }
  const  renderEachTransaction= (row,userid)=>{
    const recs = transactions.filter(item=>moment(item.date,'DD/MM/YYYY').format('MM')=== row.monthkey.replace("m-","") && userid === item.userid);
    if(recs.length>0){
    return recs.map(item=>{
      return (
        <TableRow >
                   <TableCell align="right"> </TableCell>
                   <TableCell align="center"></TableCell>
                   <TableCell align="center">{item.date}</TableCell>
                   <TableCell align="center">{item.title}</TableCell>                   
                   <TableCell align="right">${item.amount}</TableCell>                   
                   <TableCell align="right">{renderPoints(item.amount)}</TableCell>
                   
       </TableRow>);
    })
  } else {
     return null;
  }
    
  }
  
  const renderTransactionRows = (rows,userid,username)=>{
    let monthwise =[];
    let grandtotal = 0;
    let totalspend = 0;
    rows.forEach(item=>{
      const points =renderPoints(item.amount);
      const month ="m-"+ moment(item.date,'DD/MM/YYYY').format('MM');
      const monthdata = monthwise.find(item=>item.monthkey === month);
      if(monthdata){
        monthdata.value= monthdata.value + points;
        monthdata.amount = item.amount + monthdata.amount;
              }else{
        monthwise.push({monthkey : month, value: points,amount :item.amount});
      }
    });
    const output = (monthwise.map(item=>{
      grandtotal = grandtotal + item.value;
      totalspend = totalspend + item.amount;
      return (
           <>
           <TableRow key={userid + item.monthkey} style={{backgroundColor:'#d3e6ff'}}>
                      <TableCell align="center">{username}</TableCell>
                      <TableCell align="center">{moment(item.monthkey.replace('m-',''),'MM').format('MMMM')}</TableCell>         
                      <TableCell > </TableCell>
                      <TableCell > </TableCell>
                      <TableCell align="right">${item.amount}</TableCell>
                      <TableCell align="right">{item.value}</TableCell>
                      
          </TableRow>
          {renderEachTransaction(item,userid)}
          </>
           );  
      })
    );
    
    return (
      <>
      {output}
      <TableRow key={userid + '-total'}  style={{backgroundColor:'#6d9ad6'}}>
                      <TableCell align="center">{username}</TableCell>
                      <TableCell align="right"> </TableCell>                      
                      <TableCell align="center"></TableCell>                   
                      <TableCell align="center"><strong>Total</strong></TableCell>
                      <TableCell align ="right"><strong>${totalspend}</strong></TableCell>
                      <TableCell align="right"><strong>{grandtotal}</strong></TableCell>
                      
          </TableRow>
      </>);
  }
 return (<TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor:'#2065bf'}}>          
            <TableCell align="center">User Name</TableCell>            
            <TableCell align="center">Month</TableCell>            
            <TableCell align="center">Expense Date</TableCell>            
            <TableCell align="center">Expense Title</TableCell>
            <TableCell align="right">ExpenseAmount</TableCell>
            <TableCell align="right">Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {userData.map((row)=>{
          const trans = transactions.filter(item=>item.userid===row.id);
          const records = renderTransactionRows(trans,row.id,row.name);
          return records;         
          
        })
      }
        </TableBody>
      </Table>
      
    </TableContainer>
      );
}

export default Transactions;