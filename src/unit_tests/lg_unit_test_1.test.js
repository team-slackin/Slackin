// import React from 'react';
// import ReactDOM from 'react-dom';
// import { shallow } from 'enzyme'
// import Login from './../Components/Login/Login'
// import mockAxios from './mocks/mockAxios'
// import RegisterForm from './../Components/Login/RegisterForm'
// import axios from 'axios;'
// import MockAdapter from 'axios-mock-adapter'

// describe('User Controller', ()=>{
//     test('axios post register request', ()=>{
//         expect(2 + 2).toBe(4);
//     })
// })

// Unit testing breaks with HTTP REQUESTS
// Hence mockAxios

const mockAxios = {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn((endpoint, reqBody) => {
        if (endpoint == '/api/login') return Promise.resolve({ data: { message: "Incorrect password" }})
        if (endpoint == '/api/register') return Promise.resolve({ data: { message: 'You are already registered' }})
    })
}


it(`calls axios and returns incorrect password on purpose`, async () => {
    const data = await mockAxios.post(`/api/login`, { email: 'bb', password: 'hopefully this password works' }).then(res => res.data);
    expect(data).toEqual({ message: "Incorrect password" })
})

it(`calls axios and returns already registered on purpose`, async () => {
    const data = await mockAxios.post(`/api/register`, { email: 'slackin', password: 'slackin', user_display_name: 'slackin', first_name: 'slackin', last_name: 'slackin' }).then(res => res.data);
    expect(data).toEqual({ message: 'You are already registered' })
})

 