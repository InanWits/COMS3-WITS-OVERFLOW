//configs the webpage to use json requests
const configWTOApi = () => {
    $.ajaxSetup({
        headers: {
            dataType: 'json'
        },
    });
};

//for sending data to the server
const sendPostRequest = (endPoint, data = {}) => {
    return requestHandler(POST, endPoint, data);
};

//for requesting data from the server
const sendGetRequest = (endPoint, data = {}) => {
    return requestHandler(GET, endPoint, data);
};

//for updating data on the server
const sendPutRequest = (endPoint, data = {}) => {
    return requestHandler(PUT, endPoint, data);
};

//for deleting data on the server
const sendDeleteRequest = (endPoint, data = {}) => {
    return requestHandler(DELETE, endPoint, data);
};

//data - NonNull, data can be empty
//responsible for sending the actual request to the server
const requestHandler = (requestType, endPoint, data) => {
    return new Promise((resolve, reject) => {
        $.ajax( {
            type: requestType,
            url: BASE_URL + endPoint,
            data: JSON.stringify(data),
            crossDomain: true,
            contentType: 'application/json',

            success: (result, textStatus, xhr) => {
                const code = xhr.status;
                if (code === 200){
                    resolve(result);
                }
                else{
                    reject("an unknown error occurred");
                }
            },

            error: (msg) => {
                reject(msg);
            }
        });
    });

};
