import { GoogleSearch, SearchOptions, SearchResult } from '../src/googleSearch';

// Тип для тестирования различных сценариев
type TestScenario = {
    name: string;
    options: SearchOptions;
    description: string;
};

async function runSearchExample() {
    console.log('ДЕМОНСТРАЦИОННЫЙ ПРИМЕР');
    console.log('========================');
    console.log('Этот пример показывает, как библиотека должна работать в нормальных условиях.\n');

    // Определяем различные сценарии тестирования
    const scenarios: TestScenario[] = [
        {
            name: 'Базовый поиск',
            description: 'Поиск с 10 результатами по умолчанию',
            options: { numResults: 10 }
        },
        {
            name: 'Поиск с фильтрацией дубликатов',
            description: 'Только уникальные URL',
            options: { numResults: 10, unique: true }
        },
        {
            name: 'Локализованный поиск',
            description: 'Поиск на французском языке в регионе Франция',
            options: { numResults: 5, lang: 'fr', region: 'FR' }
        }
    ];

    for (const scenario of scenarios) {
        console.log(`Тест: ${scenario.name}`);
        console.log(`Описание: ${scenario.description}`);
        console.log(`Параметры: ${JSON.stringify(scenario.options)}\n`);

        try {
            const results = await GoogleSearch.search('TypeScript tutorial', scenario.options);
            
            if (results.length > 0) {
                console.log(`✓ Успех: Получено ${results.length} результатов`);
                
                // Показываем первые 3 результата
                const displayCount = Math.min(3, results.length);
                for (let i = 0; i < displayCount; i++) {
                    const result = results[i];
                    console.log(`  ${i + 1}. ${result.title.substring(0, 60)}${result.title.length > 60 ? '...' : ''}`);
                }
                
                if (results.length > displayCount) {
                    console.log(`  ... и еще ${results.length - displayCount} результатов`);
                }
            } else {
                console.log('⚠ Предупреждение: Результаты не получены. Это может быть связано с ограничениями Google.');
                console.log('  Для реального использования рекомендуется использовать прокси или официальные API.');
            }
        } catch (error: any) {
            console.log(`✗ Ошибка: ${error.message}`);
        }
        
        console.log(''); // Пустая строка для разделения
    }

    // Демонстрация структуры результата
    console.log('СТРУКТУРА РЕЗУЛЬТАТА ПОИСКА');
    console.log('============================');
    console.log('Каждый результат содержит:');
    console.log('- url: string;          // URL результата');
    console.log('- title: string;        // Заголовок результата'); 
    console.log('- description: string;  // Описание/сниппет результата');
    console.log('');
    
    // Демонстрация возможных параметров
    console.log('ДОСТУПНЫЕ ПАРАМЕТРЫ');
    console.log('===================');
    const optionsDemo: SearchOptions = {
        numResults: 10,      // Количество результатов
        lang: 'en',          // Язык результатов
        proxy: 'string',     // Прокси-сервер (опционально)
        timeout: 5000,       // Таймаут запроса в мс
        safe: 'active',      // Безопасный поиск ('active' | 'off')
        region: 'US',        // Регион поиска
        start: 0,            // Начальная позиция для пагинации
        unique: true         // Фильтрация дубликатов
    };
    
    console.log('SearchOptions interface:');
    console.log(JSON.stringify(optionsDemo, null, 2));
    
    console.log('\nДля получения стабильных результатов:');
    console.log('1. Используйте прокси-сервер');
    console.log('2. Добавляйте задержки между запросами');
    console.log('3. Рассмотрите использование официальных SERP API');
}

// Запуск демонстрационного примера
runSearchExample().catch(console.error);