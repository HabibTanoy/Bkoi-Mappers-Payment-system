import React, { Component } from 'react';
import axios from "axios";
import DotLoader from "react-spinners/DotLoader"
import { css } from "@emotion/react"

class ApiDataFetch extends Component {
    state = { 
        users: [],
        loading: false
     }
     
     sortData(dates)
     {
        let users_container = [];
        dates.map((users) => {
            users.state.map((user) => {
                let exist = this.exists(user.id,users_container);

                if(exist){
                   let found_user = users_container.find((element) => {
                        return element.user_id === user.id
                    });
                    let total_added = user.p_count + user.v_count;
                    let amount = this.calculation(total_added);
                    let TaAmount = this.TaCalculation(total_added);
                    found_user.p_count += user.p_count;
                    found_user.v_count += user.v_count;
                    found_user.total_count += total_added;
                    found_user.add_history = found_user.add_history +'+'+ total_added;
                    found_user.cash_history = found_user.cash_history +'+'+ amount;
                    found_user.amount = amount;
                }else{
                    let total_added = user.p_count + user.v_count;
                    let amount = this.calculation(total_added);
                    let TaAmount = this.TaCalculation(total_added);
                    let total_Amount = amount + TaAmount;
                    // console.log(TaAmount);
                    users_container.push({
                        'user_id' : user.id,
                        'user_name' : user.name,
                        'p_count' : user.p_count,
                        'v_count' : user.v_count,
                        'total_count' : total_added,
                        'add_history' : total_added,
                        'cash_history' : amount,
                        'amount' : total_Amount
                    });
                }
            });
        });
        this.setState({users: users_container});
     }

     exists(id,users)
     {
         let response = false;
        for(let i = 0; i < users.length; i++){
            if(users[i].user_id === id){
                response = true;
            }
        }
        return response;
     }
     calculation(added_data) {
        // if(added_data > 0 && added_data <= 250){
        //     return Math.ceil(added_data * 1.20);
        // }
        // if(added_data > 250 && added_data <= 299){
        //     let data;
        //     let newData;
        //     return (
        //         data =  added_data - 250,
        //         newData = Math.ceil(data * 1.35 + 300)
        //     )
        // }
        if(added_data > 0){
            return Math.ceil(added_data * 1.50);
        }
     }
     TaCalculation(added_data) {
        if(added_data > 0) {
            return 50;
        }
     }
     
    _getFetchDataFromAPI(currentDateStart, currentDateEnd) {
       this.setState({ loading: true })
     axios.get(`https://admin.barikoi.xyz:8090/statistics/mapper?dateFrom=${currentDateStart}&dateTill=${currentDateEnd}`,{ headers: {Authorization:'Bearer' + localStorage.getItem('token')}})
      .then(res => {
          if(res.status === 200) {
            this.setState({
                users: res.data.data
            })
            this.sortData(res.data.data);
            this.setState({ loading: false })
          } else {
              console.log('Something went Wrong')
              this.setState({ loading: false })
          }
        
      })
      .catch(err => {
        console.error(err);
      })
    }
    
    render() { 
    const startSelect = this.props.startDateSelect;
    const endSelect = this.props.EndDateSelect;
    const currentDateStart = startSelect.current;
    const currentDateEnd = endSelect.current;
    const { loading } = this.state

    const data = this.state.users.map((item,index) => {
        return(
        <tr key={index}>
            <td>{item.user_id}</td>
            <td>{item.user_name}</td>
            <td>{item.p_count}</td>
            <td>{item.v_count}</td>
            <td>{item.total_count}</td>
            <td>{item.add_history}</td>
            <td>{item.cash_history}</td>
            <td>{item.amount}</td>
         </tr>   
        )
    })
    
    const spinner = (
        <tr>
            <td colSpan={8}>
                <DotLoader css={override} loading={ loading } size={80} color={"#198754"} />
            </td>
        </tr>  
    )
        return ( 
            <div>
                <button type="button" className="btn btn-success my-2" onClick={()=>this._getFetchDataFromAPI(currentDateStart, currentDateEnd)}>Set Date</button>
                <table className="table table-bordered text-center">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Place Added</th>
                        <th scope="col">Vault Added</th>
                        <th scope="col">Total Added</th>
                        <th scope="col">Add History</th>
                        <th scope="col">Without Ta Cash</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                {
                    loading ?
                    spinner
                    :
                    data
                }                    
                </tbody>
                </table>
                
            </div>
         );
    }
}
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
 
export default ApiDataFetch;