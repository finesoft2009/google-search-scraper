import { GoogleSearch } from '../src/googleSearch';

async function testDifferentQueries() {
    console.log('Тестирование различных поисковых запросов...\n');

    const queries = [
        'React tutorial',
        'Python programming',
        'JavaScript framework',
        'Node.js documentation',
        'Web development'
    ];

    for (const query of queries) {
        console.log(`Поиск по запросу: "${query}"`);
        
        try {
            const results = await GoogleSearch.search(query, { numResults: 3 });
            
            console.log(`  Найдено ${results.length} результатов:`);
            for (let i = 0; i < Math.min(3, results.length); i++) {
                const result = results[i];
                console.log(`    ${i + 1}. ${result.title.substring(0, 50)}${result.title.length > 50 ? '...' : ''}`);
            }
            console.log('');
        } catch (error: any) {
            console.log(`  Ошибка: ${error.message}\n`);
        }
    }
}

// Запуск теста
testDifferentQueries().catch(console.error);