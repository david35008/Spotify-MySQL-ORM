function Network(endPoint, { body, ...customConfig } = {}) {

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        var allcookies = decodedCookie.split(';');
        for (let i = 0; i < allcookies.length; i++) {
            let cookie = allcookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }

    const headers = {
        "Content-Type": "application/json;charset=utf-8'",
        "Authorization": `${getCookie('token')}`
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

    // console.log(`Sending ${config.method} to ${url} with data:`, body);

    return fetch(url, config).then(async (response,reject) => {
        const data = await response.json();
        if (response.ok) {
            // console.log(`Got response ${response.status}`, data);
            return data
        } else {
            // console.error(`${response.status} : '${data.message}'`);
            // return Promise.reject(`${response.status} : '${data.json()}'`);
            throw data
        }
    });
}

Network.get = (endPoint) => Network(endPoint, { method: "GET" });
Network.post = (endPoint, body) => Network(endPoint, { method: "POST", ...body });
Network.put = (endPoint, body) => Network(endPoint, { method: "PUT", ...body });
Network.delete = (endPoint) => Network(endPoint, { method: "DELETE" });

export default Network;
