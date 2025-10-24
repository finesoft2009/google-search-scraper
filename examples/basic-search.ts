import { GoogleSearch, SearchOptions } from '../src/googleSearch';

async function testGoogleSearch() {
    console.log('Запуск примера Google Search...\n');

    try {
        // Настройка параметров поиска
        const options: SearchOptions = {
            numResults: 10,        // Запрашиваем 10 результатов
            lang: 'en',           // Язык результата
            safe: 'active',       // Безопасный поиск
            region: 'US',         // Регион (США)
            start: 0,             // Начальная позиция
            unique: true,         // Уникальные URL
            timeout: 15000        // Увеличенный таймаут
        };

        console.log(`Поиск по запросу: "TypeScript programming"`);
        console.log(`Параметры: ${JSON.stringify(options)}\n`);

        // Выполняем поиск
        const results = await GoogleSearch.search('TypeScript programming', options);

        console.log(`\nНайдено ${results.length} результатов:`);

        if (results.length > 0) {
            // Показываем все результаты
            results.forEach((result, index) => {
                console.log(`\n--- Результат ${index + 1} ---`);
                console.log(`Заголовок: ${result.title}`);
                console.log(`URL: ${result.url}`);
                console.log(`Описание: ${result.description || 'Нет описания'}`);
            });

            console.log(`\nВсего получено ${results.length} результатов из ${options.numResults} запрошенных.`);
        } else {
            console.log('Не удалось получить результаты поиска. Это может быть связано с ограничениями Google.');
            console.log('Возможные причины:');
            console.log('- Google может блокировать автоматические запросы');
            console.log('- Пользовательский агент или заголовки могут быть недостаточно реалистичными');
            console.log('- Требуется использование прокси-сервера');
            console.log('- Структура страницы Google изменилась');
        }

    } catch (error: any) {
        console.error('Ошибка при выполнении поиска:', error.message);
        console.error('Тип ошибки:', error.constructor.name);
        
        if (error.message.includes('429') || error.message.includes('rate limit')) {
            console.log('\nСовет: Ошибка 429 означает превышение лимита запросов. Используйте прокси или увеличьте интервалы между запросами.');
        } else if (error.message.includes('503') || error.message.includes('unavailable')) {
            console.log('\nСовет: Сервис временно недоступен. Попробуйте повторить запрос позже.');
        } else if (error.message.includes('timeout')) {
            console.log('\nСовет: Время ожидания истекло. Попробуйте увеличить значение параметра timeout.');
        }
    }
}

async function testWithProxy() {
    console.log('\n\n=== Тестирование с прокси (демонстрационный пример) ===');
    console.log('Примечание: Для реального использования укажите действующий прокси-сервер');
    
    // Пример с использованием прокси (закомментирован, чтобы не вызывать ошибку)
    /*
    try {
        const options: SearchOptions = {
            numResults: 10,
            lang: 'en',
            proxy: 'http://your-proxy-server:8080',  // Замените на реальный прокси
            timeout: 15000
        };
        
        const results = await GoogleSearch.search('TypeScript programming', options);
        console.log(`Получено ${results.length} результатов через прокси`);
    } catch (error: any) {
        console.log('Тест прокси завершился ошибкой (ожидаемо без реального прокси):', error.message);
    }
    */
}

async function demonstrateFeatures() {
    console.log('\n\n=== Демонстрация различных возможностей библиотеки ===');
    
    // Демонстрация пагинации
    console.log('\n1. Демонстрация пагинации (страница 1):');
    try {
        const page1 = await GoogleSearch.search('JavaScript tutorial', { 
            numResults: 5, 
            start: 0,
            timeout: 10000
        });
        console.log(`   Страница 1: ${page1.length} результатов`);
    } catch (error: any) {
        console.log(`   Ошибка: ${error.message}`);
    }
    
    // Демонстрация локализованного поиска
    console.log('\n2. Демонстрация локализованного поиска (Франция):');
    try {
        const frenchResults = await GoogleSearch.search('développement web', { 
            numResults: 5, 
            lang: 'fr', 
            region: 'FR',
            timeout: 10000
        });
        console.log(`   Французский поиск: ${frenchResults.length} результатов`);
    } catch (error: any) {
        console.log(`   Ошибка: ${error.message}`);
    }
    
    // Демонстрация безопасного поиска
    console.log('\n3. Демонстрация безопасного поиска:');
    try {
        const safeResults = await GoogleSearch.search('programming for kids', { 
            numResults: 5, 
            safe: 'active',
            timeout: 10000
        });
        console.log(`   Безопасный поиск: ${safeResults.length} результатов`);
    } catch (error: any) {
        console.log(`   Ошибка: ${error.message}`);
    }
}

// Запуск всех тестов
async function runAllTests() {
    await testGoogleSearch();
    await testWithProxy();
    await demonstrateFeatures();
    
    console.log('\n\n=== Завершение тестов ===');
    console.log('Библиотека google-search-ts готова к использованию!');
    console.log('Для получения стабильных результатов может потребоваться:');
    console.log('- Использование прокси-сервера');
    console.log('- Добавление задержек между запросами');
    console.log('- Регулярное обновление селекторов при изменении структуры страницы Google');
}

runAllTests();