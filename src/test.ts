import { GoogleSearch } from './googleSearch';

async function test() {
    try {
        // Basic search with default options
        const results = await GoogleSearch.search('TypeScript programming', {
            numResults: 10,
            lang: 'en',
            safe: 'active',
            unique: true  // Only get unique results
        });

        console.log('Results:\n');
        console.log(results);
    } catch (error) {
        console.error('Search failed:', error);
    }
}

test(); 