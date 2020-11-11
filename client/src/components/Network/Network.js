import Cookies from 'js-cookie';
import { removeTokents } from '../Services/globalVariables';

function Network(endPoint, { body, ...customConfig } = {}) {

    const headers = {
        "Content-Type": "application/json;charset=utf-8'",
        "Authorization": `${Cookies.get('token')}`
    };

    const url = `${endPoint}`

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

    return fetch(url, config).then(async (response, reject) => {
        const data = await response.json();
        if (response.ok) {
            // console.log(`Got response ${response.status}`, data);
            return data
        }
        // else if (response.status === 403) {
        //     removeTokents()
        //     return window.location.assign('/')
        // }
        else {
            console.error(`${response.status} : '${data.message}'`);
            throw data
        }
    });
}

Network.get = (endPoint) => Network(endPoint, { method: "GET" });
Network.post = (endPoint, body) => Network(endPoint, { method: "POST", ...body });
Network.put = (endPoint, body) => Network(endPoint, { method: "PUT", ...body });
Network.delete = (endPoint) => Network(endPoint, { method: "DELETE" });

export default Network;
