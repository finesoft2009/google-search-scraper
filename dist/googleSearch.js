"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSearch = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
class GoogleSearch {
    static getRandomUserAgent() {
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
        ];
        return userAgents[Math.floor(Math.random() * userAgents.length)];
    }
    static makeRequest(term_1) {
        return __awaiter(this, arguments, void 0, function* (term, options = {}) {
            const { numResults = 10, lang = 'en', proxy, timeout = 15000, // Увеличиваем таймаут до 15 секунд
            safe = 'active', region, start = 0, } = options;
            // Используем мобильную версию Google, которая может быть менее защищена
            const url = 'https://www.google.com/search';
            const params = new URLSearchParams(Object.assign(Object.assign({ q: term, num: numResults.toString(), hl: lang, start: start.toString(), safe: safe }, (region && { gl: region })), { ie: 'UTF-8', oe: 'UTF-8', gws_rd: 'cr', filter: '0' }));
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
                'Origin': 'https://www.google.com',
                'Cookie': 'CONSENT=YES+cb.20220301-17-p0.ru+FX+290; AEC=Ae3NU0wv33a6z2sL23a5v4r9w3z6a4x3b8y4c2u9v6s2r7v5w8e5e5f5; NID=298=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567; 1P_JAR=2024-01-01-00; SID=abc123def456ghi789; HSID=def456ghi789jkl012; SSID=ghi789jkl012mno345; APISID=jkl012mno345pqr678; SAPISID=mno345pqr678stu901; SIDCC=abc123def456ghi789;'
            };
            const axiosConfig = Object.assign(Object.assign({ headers,
                timeout }, (proxy && {
                proxy: {
                    protocol: proxy.startsWith('https') ? 'https' : 'http',
                    host: new URL(proxy).hostname,
                    port: parseInt(new URL(proxy).port) || (proxy.startsWith('https') ? 443 : 80)
                }
            })), { validateStatus: (status) => status < 500, maxRedirects: 5, decompress: true, withCredentials: true });
            try {
                // Добавляем случайную задержку 5-10 секунд для имитации человеческого поведения и избежания детекции
                yield new Promise(resolve => setTimeout(resolve, Math.random() * 5000 + 5000));
                const response = yield axios_1.default.get(`${url}?${params.toString()}`, axiosConfig);
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
            }
            catch (error) {
                // Возвращаем специальный HTML для обработки
                return '<html><body>request_error</body></html>';
            }
        });
    }
    static parseResults(html, unique = false) {
        // Проверяем, заблокирован ли запрос
        if (html.includes('blocked') || html.includes('request_error')) {
            // Возвращаем пустой массив, если запрос заблокирован
            return [];
        }
        const $ = cheerio.load(html);
        const results = [];
        const seenUrls = new Set();
        // Используем различные селекторы для результатов Google
        const allSelectors = [
            'div.g', // Основной селектор
            '.g', // Альтернативный селектор
            'div[data-hveid]', // Селектор по атрибуту
            '.rc', // Старый селектор
            '.ZINbbc' // Селектор для мобильной версии
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
                        if (titleElement.length > 0)
                            break;
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
                        if (descriptionElement.length > 0)
                            break;
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
                            }
                            else if (rawUrl.startsWith('/search?') || rawUrl.startsWith('/imgres?') ||
                                rawUrl.includes('google.com') || rawUrl.includes('webcache.googleusercontent.com')) {
                                return; // Пропускаем внутренние ссылки Google
                            }
                            // Проверяем формат URL
                            if (!url.startsWith('http')) {
                                if (url.startsWith('//')) {
                                    url = 'https:' + url;
                                }
                                else if (url.startsWith('/')) {
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
                                    }
                                    else {
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
                if (foundResults)
                    break; // Выходим из цикла, если нашли результаты
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
                        }
                        else {
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
    static search(term_1) {
        return __awaiter(this, arguments, void 0, function* (term, options = {}) {
            const html = yield GoogleSearch.makeRequest(term, options);
            const results = GoogleSearch.parseResults(html, options.unique);
            // Ограничиваем количество результатов
            const maxResults = options.numResults || 10;
            return results.slice(0, maxResults);
        });
    }
}
exports.GoogleSearch = GoogleSearch;
//# sourceMappingURL=googleSearch.js.map