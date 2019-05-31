// Unit testing breaks with HTTP REQUESTS
// Hence mockAxios

const mockAxios = {
    post: jest.fn((endpoint, reqBody) => {
        if (endpoint == '/api/channels') return Promise.resolve({ data: [
            {
                channel_id: 1,
                channel_name: 'slackin'
            }, {
                channel_id: 2,
                channel_name: 'bob the builder'
            }, {
                channel_id: 3,
                channel_name: 'dunder mifflin'
            }
        ] })
        if (endpoint == '/api/addusertochannel' && reqBody.user_id >= 0 && reqBody.channel_id >= 0 ) return Promise.resolve({ data: { message: 'user has been added to the channel'} })
    })
}


it(`calls axios and grabs users channels`, async () => {
    const data = await mockAxios.post(`/api/channels`, { user_id: 1 }).then(res => res.data)
    expect(data).toEqual([
        {
            channel_id: 1,
            channel_name: 'slackin'
        }, {
            channel_id: 2,
            channel_name: 'bob the builder'
        }, {
            channel_id: 3,
            channel_name: 'dunder mifflin'
        }
    ])
})

it(`calls axios and adds certain user to channel`, async () => {
    const data = await mockAxios.post(`/api/addusertochannel`, { user_id: 3, channel_id: 3 }).then(res => res.data)
    expect(data).toEqual({ message: 'user has been added to the channel' })
})



