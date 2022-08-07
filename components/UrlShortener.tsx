import React from 'react'
import UrlShortenerForm from './UrlShortenerForm';

const UrlShortener = () => {
    const [shortenedUrl, setShortenedUrl] = React.useState<string>('');
    return (
        <UrlShortenerForm setShortenedUrl={setShortenedUrl}/>
    )
}

export default UrlShortener