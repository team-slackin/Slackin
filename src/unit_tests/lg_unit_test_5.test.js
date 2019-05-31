// Unit testing breaks with HTTP REQUESTS
// Hence mockAxios

let initState = {
    selectedSubChannel: null
}

const mockAxios = {
    post: jest.fn((endpoint, reqBody) => {
        if (endpoint == '/api/userselectedchannel' && reqBody.subchannel_id >= 0) {
            initState.selectedSubChannel = reqBody.subchannel_id
            return Promise.resolve({ data: initState.selectedSubChannel })}
    })
}


it(`calls axios and returns selected subChannel by user`, async () => {
    const data = await mockAxios.post(`/api/userselectedchannel`, { subchannel_id: 3 }).then(res => res.data)
    expect(data).toEqual(initState.selectedSubChannel)
})




