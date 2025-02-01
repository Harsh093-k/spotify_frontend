
import { backendUrl } from "./config";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    try {
        const response = await fetch(backendUrl + route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Ensure the header is correct
            },
            body: JSON.stringify(body),
        });

        // Check if the response status is ok (status code 200-299)
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const formattedResponse = await response.json();
        return formattedResponse;
    } catch (error) {
        console.error("Error making POST request:", error);
        return { error: error.message };  // You can return a custom error message if needed
    }
};


export const makeAuthenticatedPOSTRequest = async (route, body) => {
    try {
        // Retrieve token from somewhere (localStorage, context, etc.)
        const token = getToken();
        if (!token) {
            throw new Error("No token found. User is not authenticated.");
        }

        const response = await fetch(backendUrl + route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Correct header for JSON content type
                "Authorization": `Bearer ${token}`, // Bearer token in the header
            },
            body: JSON.stringify(body),
        });

        // Check if the response is OK (status code 2xx)
        if (!response.ok) {
            const errorResponse = await response.json();
            if (response.status === 401) {
                throw new Error('Token expired or unauthorized. Please log in again.');
            }
            throw new Error(errorResponse.error || 'Failed to make request');
        }

        // Parse and return the JSON response from the backend
        const formattedResponse = await response.json();
        return formattedResponse;

    } catch (error) {
        console.error("Request failed:", error.message);
        throw error;  // Re-throw the error so that the caller can handle it
    }
};




export const makeAuthenticatedGETRequest = async (route) => {
    const token = getToken();
   
    const response = await fetch(backendUrl + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",  // Corrected typo here  
            "Authorization": `Bearer ${token}`,  // Fixed the typo here  
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);  // Handle errors appropriately  
    }

    const formattedResponse = await response.json();
    return formattedResponse;
};


const getToken = () => {
    // Match the token cookie with a regular expression
    const match = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/);

    // If the token is found, return it, otherwise return null
    // return match ? match[2] : null;
    return match[2];
};




