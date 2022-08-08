import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { prisma } from '../db';

export async function getServerSideProps(context: any) {
    const { ShortUrlHash } = context.params;
    const existingUrlObject = await prisma.url.findUnique({
        where: {
            shortUrlHash: ShortUrlHash
        }
    });

    const redirectedUrl = existingUrlObject?.url;



    return {
        props: {
            redirectedUrl: redirectedUrl || null
        }
    }
}

const ShortUrlHash = ({ redirectedUrl }: { redirectedUrl: string }) => {
    const router = useRouter();
    useEffect(() => {
        if (redirectedUrl) {
            window.location.href = redirectedUrl;
        } else {
            router.push('/'); // TODO: redirect to 404 page
        }
    } , [redirectedUrl, router]);

    // get request 
    return null;
}

export default ShortUrlHash