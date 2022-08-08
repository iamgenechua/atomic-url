import React, { useEffect } from 'react'
import { URL_SHORTENER_ENDPOINT } from '../routes/';
import { isValidUrl } from '../utils/';

interface UrlShortenerFormProps {
    setShortenedUrl: (shortenedUrl: string) => void
}

const UrlShortenerForm = ({ setShortenedUrl }: UrlShortenerFormProps): JSX.Element => {

    const [href, setHref] = React.useState<string>('');

    useEffect(() => {
        // get window property to get the current href
        const { location } = window;
        setHref(location.href);
    } , []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Stop the form from submitting

        const form = event.target as HTMLFormElement;
        const url = form.url.value;

        // Check if the url is valid
        if (!isValidUrl(url)) {
            setShortenedUrl('Invalid URL');
            return;
        }

        // get form data
        const data = {
            url: url
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

        if (response.ok) {
            const shortenedUrl = `${href}${result.shortUrlHash}`;
            setShortenedUrl(shortenedUrl);
        } else {
            console.log(result.error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="url" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default UrlShortenerForm