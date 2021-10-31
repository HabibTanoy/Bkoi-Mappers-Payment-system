import React, { Component } from 'react';
import axios from 'axios';
import DatePickerSet from './DatePicker';

class Login extends Component {
    state = { 
        login_email:'hbtonoy42@gmail.com',
        login_pass:'afterburn',
        login_token:'',
        tokenResponse:[]
     }
     //login function
      componentDidMount() {         
         this._getTokenFromAPI()
     }
    //token authorize
    AuthToken() {
        axios.get('https://admin.barikoi.xyz:8090/statistics/mapper?dateFrom=2020-11-09&dateTill=2020-11-11',{ headers: {Authorization:'Bearer' + localStorage.getItem('token')}})
        .then(res => {
            this.setState({
                tokenResponse: res.data.data
            })
        })
        .catch(err => {
            console.error(err);
        })
    }

    _getTokenFromAPI = () => {        
        const { login_email, login_pass } =  this.state
        axios.post('https://admin.barikoi.xyz:8090/auth/login', {email: login_email, password: login_pass})
         .then(res => {               
            const token = res.data.data
            localStorage.setItem('token', token)
         })
         .catch(err => {
             console.error(err)             
         })
    }

    render() { 
        const { loading } = this.state
        return ( 
            <div>
                <DatePickerSet />
            </div>
         );
    }
}

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;
 
export default Login;