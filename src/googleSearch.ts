import axios from 'axios';
import * as cheerio from 'cheerio';

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

class GoogleSearch {
    private static getRandomUserAgent(): string {
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        ];
        return userAgents[Math.floor(Math.random() * userAgents.length)];
    }

    private static async makeRequest(
        term: string,
        options: SearchOptions = {}
    ): Promise<string> {
        const {
            numResults = 10,
            lang = 'en',
            proxy,
            timeout = 15000, // Увеличиваем таймаут до 15 секунд
            safe = 'active',
            region,
            start = 0,
        } = options;

        // Используем мобильную версию Google, которая может быть менее защищена
        const url = 'https://www.google.com/search';
        const params = new URLSearchParams({
            q: term,
            num: numResults.toString(), 
            hl: lang,
            start: start.toString(),
            safe: safe,
            ...(region && { gl: region }),
            ie: 'UTF-8',
            oe: 'UTF-8',
            gws_rd: 'cr',
            filter: '0'
        });
        
        if (lang !== 'en') {
            params.append('lr', `lang_${lang}`);
        }

        const userAgent = GoogleSearch.getRandomUserAgent();

        const headers = {
            'User-Agent': userAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': `${lang},en;q=0.9,en-US;q=0.8,en;q=0.7`,
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'DNT': '1',
            'Referer': 'https://www.google.com/',
            'Origin': 'https://www.google.com'
        };

        const axiosConfig = {
            headers,
            timeout,
            ...(proxy && {
                proxy: {
                    protocol: proxy.startsWith('https') ? 'https' : 'http',
                    host: new URL(proxy).hostname,
                    port: parseInt(new URL(proxy).port) || (proxy.startsWith('https') ? 443 : 80)
                }
            }),
            validateStatus: (status: number) => status < 500,
            maxRedirects: 5,
            decompress: true,
            withCredentials: true
        };

        try {
            // Добавляем случайную задержку 5-10 секунд для имитации человеческого поведения и избежания детекции
            await new Promise(resolve => setTimeout(resolve, Math.random() * 5000 + 5000));
            
            const response = await axios.get(`${url}?${params.toString()}`, axiosConfig);
            
            // Проверяем наличие защиты
            const html = response.data;
            const status = response.status;
            
            if (status === 429 || status >= 400 || 
                html.includes('detected unusual traffic') || 
                html.includes('robot') || 
                html.includes('captcha') || 
                html.includes('unusual traffic') || 
                html.includes('try again later') ||
                html.includes('https://www.google.com/sorry')) {
                
                return '<html><body>blocked</body></html>';
            }
            
            return html;
        } catch (error: any) {
            // Возвращаем специальный HTML для обработки
            return '<html><body>request_error</body></html>';
        }
    }

    private static parseResults(html: string, unique: boolean = false): SearchResult[] {
        // Проверяем, заблокирован ли запрос
        if (html.includes('blocked') || html.includes('request_error')) {
            // Возвращаем пустой массив, если запрос заблокирован
            return [];
        }

        const $ = cheerio.load(html);
        const results: SearchResult[] = [];
        const seenUrls = new Set<string>();

        // Используем различные селекторы для результатов Google
        const allSelectors = [
            'div.g',           // Основной селектор
            '.g',              // Альтернативный селектор
            'div[data-hveid]', // Селектор по атрибуту
            '.rc',             // Старый селектор
            '.ZINbbc'          // Селектор для мобильной версии
        ];

        let foundResults = false;
        
        // Перебираем разные селекторы до нахождения результатов
        for (const selector of allSelectors) {
            const resultBlocks = $(selector);
            
            if (resultBlocks.length > 0) {
                resultBlocks.each((_, element) => {
                    foundResults = true;
                    
                    // Ищем заголовок результата
                    let titleElement = null;
                    const titleSelectors = ['h3', 'h3 a', '.r a', '.LC20lb', '.DKV0Md', '.vvjwJb'];
                    for (const sel of titleSelectors) {
                        titleElement = $(element).find(sel).first();
                        if (titleElement.length > 0) break;
                    }
                    
                    // Если не нашли заголовок через селекторы, ищем в ссылке
                    if (!titleElement || titleElement.length === 0) {
                        const linkInElement = $(element).find('a').first();
                        if (linkInElement.length > 0 && linkInElement.text().trim()) {
                            titleElement = linkInElement;
                        }
                    }

                    // Ищем ссылку результата
                    let linkElement = $(element).find('a').first();
                    if (!linkElement.length) {
                        // Проверяем наличие атрибута data-jsarwt или jsaction
                        const linksWithData = $(element).find('[data-jsarwt], [jsaction], [data-href]');
                        if (linksWithData.length > 0) {
                            linkElement = $(linksWithData[0]);
                        }
                    }
                    
                    // Ищем описание результата
                    let descriptionElement = null;
                    const descSelectors = ['.s', '.st', '.a', '.s3v9rd', '.ILfuVd', '.VwiC3b', '.yXK7lf', '.hzV7SY', '.BNeawe.s3v9rd.AP7Wnd'];
                    for (const sel of descSelectors) {
                        descriptionElement = $(element).find(sel).first();
                        if (descriptionElement.length > 0) break;
                    }

                    if (linkElement.length) {
                        // Получаем URL
                        let rawUrl = linkElement.attr('href') || linkElement.attr('data-href');
                        
                        // Если не нашли URL в ссылке, ищем в других атрибутах
                        if (!rawUrl) {
                            const allLinks = $(element).find('a');
                            for (let i = 0; i < allLinks.length; i++) {
                                const href = $(allLinks[i]).attr('href');
                                if (href && href.startsWith('http')) {
                                    rawUrl = href;
                                    break;
                                }
                            }
                        }
                        
                        if (rawUrl) {
                            let url = rawUrl;
                            
                            // Обработка URL из параметров Google
                            if (rawUrl.startsWith('/url?q=')) {
                                const match = rawUrl.match(/\/url\?q=([^&]+)/);
                                if (match) {
                                    url = decodeURIComponent(match[1]);
                                }
                            } else if (rawUrl.startsWith('/search?') || rawUrl.startsWith('/imgres?') || 
                                      rawUrl.includes('google.com') || rawUrl.includes('webcache.googleusercontent.com')) {
                                return; // Пропускаем внутренние ссылки Google
                            }
                            
                            // Проверяем формат URL
                            if (!url.startsWith('http')) {
                                if (url.startsWith('//')) {
                                    url = 'https:' + url;
                                } else if (url.startsWith('/')) {
                                    url = 'https://www.google.com' + url;
                                }
                            }
                            
                            if (unique && seenUrls.has(url)) {
                                return; // Пропускаем дубликаты
                            }
                            seenUrls.add(url);

                            if (url.startsWith('http') && !url.includes('google.com')) {
                                // Получаем заголовок
                                let title = '';
                                if (titleElement && titleElement.length > 0) {
                                    title = titleElement.text().trim();
                                }
                                if (!title) {
                                    title = linkElement.text().trim();
                                }
                                
                                // Получаем описание
                                let description = '';
                                if (descriptionElement && descriptionElement.length > 0) {
                                    description = descriptionElement.text().trim();
                                }
                                if (!description) {
                                    // Пытаемся извлечь описание из других элементов
                                    const spans = $(element).find('span');
                                    if (spans.length >= 2) {
                                        // Берем последний span, который может содержать описание
                                        description = $(spans[spans.length - 1]).text().trim().substring(0, 200);
                                    } else {
                                        // Извлекаем текст из всего блока, исключая заголовок и ссылку
                                        const clone = $(element).clone();
                                        clone.find('h3, a, script, style').remove();
                                        description = clone.text().trim().substring(0, 200);
                                    }
                                }

                                if (title) { // Добавляем только если есть заголовок
                                    results.push({
                                        url,
                                        title,
                                        description,
                                    });
                                }
                            }
                        }
                    }
                });
                
                if (foundResults) break; // Выходим из цикла, если нашли результаты
            }
        }

        // Если результаты не найдены через селекторы, пробуем извлечь с помощью регулярных выражений
        if (!foundResults && results.length === 0) {
            // Используем регулярные выражения для извлечения ссылок и заголовков из HTML
            const urlMatches = html.match(/\/url\?q=([^&"<>]+)/g);
            if (urlMatches) {
                for (const match of urlMatches) {
                    const url = decodeURIComponent(match.replace('/url?q=', ''));
                    
                    if (!url.includes('google.com') && !seenUrls.has(url)) {
                        // Создаем простой заголовок
                        const title = `Ссылка: ${url.substring(0, 50)}${url.length > 50 ? '...' : ''}`;
                        
                        if (unique) {
                            if (!seenUrls.has(url)) {
                                seenUrls.add(url);
                                results.push({
                                    url,
                                    title: title,
                                    description: 'Результат найден через альтернативный метод'
                                });
                            }
                        } else {
                            results.push({
                                url,
                                title: title,
                                description: 'Результат найден через альтернативный метод'
                            });
                        }
                    }
                }
            }
        }
        
        return results;
    }

    public static async search(
        term: string,
        options: SearchOptions = {}
    ): Promise<SearchResult[]> {
        const html = await GoogleSearch.makeRequest(term, options);
        const results = GoogleSearch.parseResults(html, options.unique);
        
        // Ограничиваем количество результатов
        const maxResults = options.numResults || 10;
        return results.slice(0, maxResults);
    }
}

export { GoogleSearch, SearchOptions, SearchResult };