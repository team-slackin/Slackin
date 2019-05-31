// Unit testing breaks with HTTP REQUESTS
// Hence mockAxios



const mockAxios = {
    post: jest.fn((endpoint, reqBody) => {
        if (endpoint == '/api/grabusersfromchannel' && reqBody.channel_id >= 0) return Promise.resolve({ data: [
            {
                user_id: 1,
                user_display_name: 'slackin'
            }, {
                user_id: 2,
                user_display_name: 'bobby bobertson'
            }, {
                user_id: 3,
                user_display_name: 'robby robertson'
            }
        ] })
    })
}


it(`calls axios and grabs users from a certain channel`, async () => {
    const data = await mockAxios.post(`/api/grabusersfromchannel`, { channel_id: 3 }).then(res => res.data)
    expect(data).toEqual([
        {
            user_id: 1,
            user_display_name: 'slackin'
        }, {
            user_id: 2,
            user_display_name: 'bobby bobertson'
        }, {
            user_id: 3,
            user_display_name: 'robby robertson'
        }
    ])
})




