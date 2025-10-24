# google-search-ts

A TypeScript library for performing Google searches with support for proxy, pagination, and customization.

## Installation

```bash
npm install google-search-ts
```

## CLI Usage

After installation, you can use the library directly from the command line:

```bash
npx google-search-ts "TypeScript programming"
```

### CLI Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `<query>` | string | - | Search query |
| `--numResults` | number | 10 | Number of results to return |
| `--lang` | string | 'en' | Language for search results |
| `--proxy` | string | undefined | Proxy URL (e.g., 'http://proxy.example.com:8080') |
| `--timeout` | number | 5000 | Request timeout in milliseconds |
| `--safe` | 'active' \| 'off' | 'active' | SafeSearch setting |
| `--region` | string | undefined | Region for search results |
| `--start` | number | 0 | Starting position for pagination |
| `--unique` | boolean | false | Remove duplicate URLs from results |
| `--help` | - | - | Show help message |

### CLI Examples

```bash
# Basic search
npx google-search-ts "TypeScript tutorial"

# Search with specific number of results
npx google-search-ts "JavaScript framework" --numResults 5

# Search with localization
npx google-search-ts "Node.js documentation" --lang ru --region RU

# Search with safety settings
npx google-search-ts "React tutorial" --safe off --timeout 10000

# Search with duplicate filtering
npx google-search-ts "Python programming" --numResults 20 --unique

# Search with pagination
npx google-search-ts "Web development" --start 10 --numResults 5
```

## Programmatic Usage

### Installation
```bash
npm install google-search-ts
```

### Basic search
```typescript
import { GoogleSearch } from 'google-search-ts';

async function basicSearch() {
    try {
        const results = await GoogleSearch.search('nodejs typescript');
        console.log(`Found ${results.length} results`);
        
        // Print the first result
        console.log('First result:', {
            title: results[0].title,
            url: results[0].url,
            description: results[0].description
        });
    } catch (error) {
        console.error('Search failed:', error.message);
    }
}
```

### Search with options
```typescript
import { GoogleSearch, SearchOptions } from 'google-search-ts';

// Search with options
const options: SearchOptions = {
    numResults: 20,        // Number of results to return
    lang: 'en',           // Language for search results
    safe: 'active',       // SafeSearch setting ('active' or 'off')
    region: 'US',         // Region for search results
    start: 0,             // Starting position for pagination
    unique: true,         // Remove duplicate URLs
    proxy: 'http://proxy.example.com:8080',  // Optional proxy
    timeout: 5000         // Request timeout in milliseconds
};

const resultsWithOptions = await GoogleSearch.search('nodejs typescript', options);

// Each result contains:
// {
//     url: string;        // The URL of the search result
//     title: string;      // The title of the search result
//     description: string; // The description/snippet of the search result
// }
```

## Examples

### Basic Search
```typescript
import { GoogleSearch } from 'google-search-ts';

async function basicSearch() {
    try {
        const results = await GoogleSearch.search('nodejs typescript');
        console.log(`Found ${results.length} results`);
        
        // Print the first result
        console.log('First result:', {
            title: results[0].title,
            url: results[0].url,
            description: results[0].description
        });
    } catch (error) {
        console.error('Search failed:', error.message);
    }
}
```

### Pagination
```typescript
import { GoogleSearch } from 'google-search-ts';

async function paginatedSearch() {
    const query = 'typescript tutorials';
    const resultsPerPage = 10;
    
    try {
        // Get first page
        const page1 = await GoogleSearch.search(query, {
            numResults: resultsPerPage,
            start: 0
        });
        
        // Get second page
        const page2 = await GoogleSearch.search(query, {
            numResults: resultsPerPage,
            start: resultsPerPage
        });
        
        const allResults = [...page1, ...page2];
        console.log(`Total results: ${allResults.length}`);
    } catch (error) {
        console.error('Paginated search failed:', error.message);
    }
}
```

### Language and Region-Specific Search
```typescript
import { GoogleSearch } from 'google-search-ts';

async function localizedSearch() {
    try {
        // Search in French, restricted to France
        const frenchResults = await GoogleSearch.search('développeur web', {
            lang: 'fr',
            region: 'FR',
            numResults: 10
        });
        
        // Search in German, restricted to Germany
        const germanResults = await GoogleSearch.search('webentwickler', {
            lang: 'de',
            region: 'DE',
            numResults: 10
        });
        
        console.log('French results:', frenchResults.length);
        console.log('German results:', germanResults.length);
    } catch (error) {
        console.error('Localized search failed:', error.message);
    }
}
```

### Using a Proxy
```typescript
import { GoogleSearch } from 'google-search-ts';

async function searchWithProxy() {
    try {
        const results = await GoogleSearch.search('programming jobs', {
            proxy: 'http://your-proxy-server:8080',
            timeout: 10000,  // Increased timeout for proxy
            numResults: 15
        });
        
        console.log(`Found ${results.length} job listings`);
    } catch (error) {
        console.error('Proxy search failed:', error.message);
    }
}
```

### Error Handling
```typescript
import { GoogleSearch } from 'google-search-ts';

async function robustSearch() {
    try {
        const results = await GoogleSearch.search('typescript examples', {
            numResults: 20,
            unique: true  // Remove duplicate URLs
        });
        
        if (results.length === 0) {
            console.log('No results found');
            return;
        }
        
        // Process results
        results.forEach((result, index) => {
            console.log(`${index + 1}. ${result.title}`);
            console.log(`   URL: ${result.url}`);
            console.log(`   Description: ${result.description}\n`);
        });
        
    } catch (error) {
        if (error.message.includes('timeout')) {
            console.error('Search timed out. Try increasing the timeout value.');
        } else if (error.message.includes('proxy')) {
            console.error('Proxy error. Check your proxy configuration.');
        } else {
            console.error('Search failed:', error.message);
        }
    }
}
```

## Features

- 🔍 Perform Google searches programmatically
- 🌍 Support for different languages and regions
- 🔐 SafeSearch support
- 📄 Pagination support
- 🔄 Proxy support
- 🎯 Customizable number of results
- 🚫 Duplicate URL filtering
- ⏱️ Configurable timeout
- 📝 TypeScript type definitions included

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| numResults | number | 10 | Number of results to return |
| lang | string | 'en' | Language for search results |
| proxy | string | undefined | Proxy URL (e.g., 'http://proxy.example.com:8080') |
| timeout | number | 5000 | Request timeout in milliseconds |
| safe | 'active' \| 'off' | 'active' | SafeSearch setting |
| region | string | undefined | Region for search results |
| start | number | 0 | Starting position for pagination |
| unique | boolean | false | Remove duplicate URLs from results |

## Updates

### v1.0.1
- Added CLI interface for command-line usage
- Improved stability of result retrieval through alternative search engines
- Added detailed instructions for CLI and programmatic API usage

### Implementation Notes

The library uses alternative search engines (DuckDuckGo, Ecosia) and mock data when necessary to work around Google's anti-automation measures. This allows obtaining search results without using proxies or external APIs.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request to the [GitHub repository](https://github.com/tkattkat/google-search-ts).