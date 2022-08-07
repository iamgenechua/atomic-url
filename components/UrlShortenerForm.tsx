import React from 'react'
import { URL_SHORTENER_ENDPOINT } from '../routes/';

interface UrlShortenerFormProps {
    setShortenedUrl: (shortenedUrl: string) => void
}

const UrlShortenerForm = ({ setShortenedUrl }: UrlShortenerFormProps): JSX.Element => {
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Stop the form from submitting

        const form = event.target as HTMLFormElement;
        
        // get form data
        const data = {
            url: form.url.value
        };

        // send data to server in json format
        const jsonData = JSON.stringify(data);

        // API endpoint where we send form data
        const endpoint = URL_SHORTENER_ENDPOINT;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        }

        const response = await fetch(endpoint, options);

        const result = await response.json();

        setShortenedUrl(result);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="url" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default UrlShortenerForm