import React, { useEffect } from 'react'
import { URL_SHORTENER_ENDPOINT } from '../routes/';
import { CustomSearch } from '../styles/styled-components';
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
    }, []);

    const handleSubmit = async (value: string) => {

        const url = value;

        // Check if the url is valid
        if (!isValidUrl(url)) {
            setShortenedUrl('Invalid URL. Did you forget to add http(s)://?');
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
        <>
            <CustomSearch
                placeholder='Enter your full URL. (E.g: https://www.google.com)'
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSubmit}
            />
        </>

    )
}

export default UrlShortenerForm