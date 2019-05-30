// import React from 'react';
// import ReactDOM from 'react-dom';
// import RegisterForm from './../Components/Login/RegisterForm'
import axios from 'axios;'
// import MockAdapter from 'axios-mock-adapter'
// import { shallow } from 'enzyme'

describe('User Controller', ()=>{
    test('axios post register request', ()=>{
        expect(2 + 2).toBe(4);
        return axios.post('/api/register', { email:'bb', password:'bb', user_display_name:'bb', first_name:'bb', last_name:'bb'}).then((res)=>{ expect(res).toBe({ message: "You are already registered" }) }).catch(err => console.log(err))
    })

    rest()
})



 