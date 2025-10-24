interface SearchOptions {
    numResults?: number;
    lang?: string;
    proxy?: string;
    timeout?: number;
    safe?: 'active' | 'off';
    region?: string;
    start?: number;
    unique?: boolean;
}
interface SearchResult {
    url: string;
    title: string;
    description: string;
}
declare class GoogleSearch {
    private static getRandomUserAgent;
    private static makeRequest;
    private static tryAlternativeSearch;
    private static parseResults;
    static search(term: string, options?: SearchOptions): Promise<SearchResult[]>;
}
export { GoogleSearch, SearchOptions, SearchResult };
//# sourceMappingURL=googleSearch.d.ts.map