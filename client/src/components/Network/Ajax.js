import Network from './Network';

export function read(endPoint) {
    return Network.get(endPoint);
}

export function create(endPoint, body = {}) {
    return Network.post(endPoint, { body });
}

export function update(endPoint, body = {}) {
    return Network.put(endPoint, { body });
}

export function remove(endPoint) {
    return Network.delete(endPoint);
}
