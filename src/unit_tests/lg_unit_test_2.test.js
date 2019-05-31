// Unit testing breaks with HTTP REQUESTS
// Hence mockAxios

const mockAxios = {
    get: jest.fn((endpoint) => {
        if (endpoint == '/api/grabfriends') return Promise.resolve({ data: [
        {
            user_id: 2,
            user_display_name: 'Tony Soprano'
        }, {
            user_id: 3,
            user_display_name: 'Phil Leotardo'
        }, {
            user_id: 4,
            user_display_name: 'Carmine Lupertazzi'
        }
    ] })})
}


it(`calls axios and grabs a list of friends`, async () => {
    const data = await mockAxios.get(`/api/grabfriends`).then(res => res.data)
    expect(data).toEqual([
        {
            user_id: 2,
            user_display_name: 'Tony Soprano'
        }, {
            user_id: 3,
            user_display_name: 'Phil Leotardo'
        }, {
            user_id: 4,
            user_display_name: 'Carmine Lupertazzi'
        }
    ])
})






 