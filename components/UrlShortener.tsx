import React from 'react'
import UrlShortenerForm from './UrlShortenerForm';
import { Result } from 'antd';
import { isValidUrl } from '../utils/';

const UrlShortener = () => {
    const [shortenedUrl, setShortenedUrl] = React.useState<string>('');
    return (
        <>
            <UrlShortenerForm setShortenedUrl={setShortenedUrl} />
            {
                shortenedUrl && <Result
                    status={isValidUrl(shortenedUrl) ? 'success' : 'warning'}
                    title={shortenedUrl}
                />
            }
        </>
    )
}

export default UrlShortener