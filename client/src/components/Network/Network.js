function Network(endPoint, { body, ...customConfig } = {}) {

    const headers = {
        "Content-Type": "application/json;charset=utf-8'"
        // 'Content-Type': 'application/x-www-form-urlencoded'
        // 'content-type': 'foo/bar'
    };

    const url = `/${endPoint}`;

    const config = {
        method: body ? "POST" : "GET",
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    };

    console.log(`Sending ${config.method} to ${url} with data:`, body);

    return fetch(url, config).then(async (response) => {
        // if (response.status === 401) {
        //   logout();
        //   location.assign(location);
        //   return;
        // }
        const data = await response.json();
        if (response.ok) {
            // console.log(`Got response ${response.status}`, data);
            return data;
        } else {
            console.error(`${response.status} : '${data.message}'`);
            return Promise.reject(`${response.status} : '${data.message}'`);
        }
    });
}

Network.get = (endPoint) => Network(endPoint, { method: "GET" });
Network.post = (endPoint, body) => Network(endPoint, { method: "POST", ...body });
Network.put = (endPoint, body) => Network(endPoint, { method: "PUT", ...body });
Network.delete = (endPoint) => Network(endPoint, { method: "DELETE" });

export default Network;

// function logout() {
//   localStorage.removeItem(localStorageKey);
// }