import { useRouter } from 'next/router';
import { useEffect } from 'react'
import { prisma } from '../db';
import PageNotFound from './PageNotFound';

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
            window.location.href = redirectedUrl; // Redirect to the original url
        } else {
            // Redirect to 404 page
            router.push('/PageNotFound');
        }
    } , [redirectedUrl, router]);
    return null;
}

export default ShortUrlHash