import connector from "./Handler";
export function APIPostCall(endpoint ,payload, config = {}) {
    return new Promise((resolve, reject) => {
        try {
            connector
                .post(endpoint, payload, config)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
}

export function APIGetCall(endpoint ,payload) {
    return new Promise((resolve, reject) => {
        try {
            connector
                .get(endpoint, {
                    params:payload
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
}
