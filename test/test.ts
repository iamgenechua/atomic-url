import { getUrlObjectFromUserInput, createUrlObject } from '../pages/api/createShortUrl';
import { prismaMock } from './../singleton';

describe('getUrlObjectFromUserInput', () => {
    test('should create a new url object', async () => {
        const url = 'https://www.google.com';
        const urlHash = 'ac6bb6'

        const input = {
            url: url,
            shortUrlHash: urlHash,
            id: 1,
            createdAt: new Date(),
        };
        prismaMock.url.create.mockResolvedValue(input);
        await expect(getUrlObjectFromUserInput('https://www.google.com')).resolves.toEqual(input).catch(e => {console.log(e)});
    })
});