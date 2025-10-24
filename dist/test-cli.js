"use strict";
/**
 * Тест CLI google-search-ts
 *
 * Доступные CLI опции:
 *
 * --numResults <число>     Количество результатов для возврата (по умолчанию: 10)
 * --lang <язык>            Язык результатов поиска (по умолчанию: 'en')
 * --proxy <URL>            URL прокси-сервера (например, 'http://proxy.example.com:8080')
 * --timeout <мс>           Таймаут запроса в миллисекундах (по умолчанию: 5000)
 * --safe <active|off>      Настройки безопасного поиска (по умолчанию: 'active')
 * --region <регион>        Регион для результатов поиска (например: 'US', 'RU')
 * --start <число>          Начальная позиция для пагинации (по умолчанию: 0)
 * --unique                 Удалить дублирующиеся URL из результатов
 * --help                   Показать справочное сообщение
 */
console.log('=== Тестирование CLI google-search-ts ===\\n');
console.log('Доступные CLI команды:\\n');
console.log('1. Базовый поиск:');
console.log('   node dist/cli.js "сетка рабица"');
console.log();
console.log('2. Поиск с определенным количеством результатов:');
console.log('   node dist/cli.js "сетка рабица" --numResults 5');
console.log();
console.log('3. Поиск с пагинацией:');
console.log('   node dist/cli.js "сетка рабица" --start 10 --numResults 5');
console.log();
console.log('4. Поиск с фильтрацией дубликатов:');
console.log('   node dist/cli.js "сетка рабица" --numResults 5 --unique');
console.log();
console.log('5. Показать справку:');
console.log('   node dist/cli.js --help');
console.log();
console.log('6. Полный список опций с примерами:');
console.log('| Опция | Тип | По умолчанию | Описание |');
console.log('|--------|------|---------|-------------|');
console.log('| --numResults | number | 10 | Количество результатов для возврата |');
console.log('| --lang | string | \'en\' | Язык результатов поиска |');
console.log('| --proxy | string | undefined | URL прокси-сервера (например, \'http://proxy.example.com:8080\') |');
console.log('| --timeout | number | 5000 | Таймаут запроса в миллисекундах |');
console.log('| --safe | \'active\' | \'off\' | \'active\' | Настройки безопасного поиска |');
console.log('| --region | string | undefined | Регион для результатов поиска |');
console.log('| --start | number | 0 | Начальная позиция для пагинации |');
console.log('| --unique | boolean | false | Удалить дублирующиеся URL из результатов |');
console.log('| --help | - | - | Показать справочное сообщение |');
console.log();
console.log('Примеры использования CLI:\\n');
console.log('node dist/cli.js "TypeScript tutorial"');
console.log('node dist/cli.js "JavaScript framework" --numResults 5 --lang ru');
console.log('node dist/cli.js "Node.js documentation" --numResults 20 --region US --start 10');
console.log('node dist/cli.js "React tutorial" --timeout 10000 --unique');
//# sourceMappingURL=test-cli.js.map