import axios from 'axios';


const pokemonApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
});

// Create request, response & error handlers
const requestHandler = request => {
    // Token will be dynamic so we can use any app-specific way to always   
    // fetch the new token before making the call
    return request;
};
const responseHandler = response => {
    if (response.status === 401) {
        window.location = '/login';
    }

    return response?.data ?? response;
};

const errorHandler = error => {
    return Promise.reject(error);
};

pokemonApi.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

pokemonApi.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);

export default pokemonApi;