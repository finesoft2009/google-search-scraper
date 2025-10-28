#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleSearch_1 = require("./googleSearch");
// Парсинг аргументов командной строки
const args = process.argv.slice(2);
// Вспомогательная функция для вывода справки
function showHelp() {
    console.log(`
Использование: npx google-search-ts <запрос> [опции]

Опции:
  --numResults <число>     Количество результатов для возврата (по умолчанию: 10)
  --lang <язык>            Язык результатов поиска (по умолчанию: 'en')
  --proxy <URL>            URL прокси-сервера (например, 'http://proxy.example.com:8080')
  --timeout <мс>           Таймаут запроса в миллисекундах (по умолчанию: 5000)
  --safe <active|off>      Настройки безопасного поиска (по умолчанию: 'active')
  --region <регион>        Регион для результатов поиска (например: 'US', 'RU')
  --start <число>          Начальная позиция для пагинации (по умолчанию: 0)
  --unique                 Удалить дублирующиеся URL из результатов
  --help                   Показать это справочное сообщение

Примеры:
  npx google-search-ts "TypeScript tutorial"
  npx google-search-ts "JavaScript framework" --numResults 5 --lang ru
  npx google-search-ts "Node.js documentation" --numResults 20 --region US --start 10
  npx google-search-ts "React tutorial" --timeout 10000 --unique
    `);
}
// Функция для парсинга аргументов
function parseArgs(args) {
    const options = {};
    let query = '';
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        switch (arg) {
            case '--numResults':
                options.numResults = parseInt(args[++i]);
                break;
            case '--lang':
                options.lang = args[i];
                break;
            case '--proxy':
                options.proxy = args[i];
                break;
            case '--timeout':
                options.timeout = parseInt(args[++i]);
                break;
            case '--safe':
                options.safe = args[i];
                break;
            case '--region':
                options.region = args[i];
                break;
            case '--start':
                options.start = parseInt(args[++i]);
                break;
            case '--unique':
                options.unique = true;
                break;
            case '--help':
                showHelp();
                process.exit(0);
            default:
                if (!query) {
                    query = arg;
                }
                break;
        }
    }
    return { query, options };
}
// Функция для форматированного вывода результатов
function formatResults(results) {
    if (results.length === 0) {
        console.log('Не найдено результатов по запросу.');
        return;
    }
    console.log(`\nНайдено ${results.length} результатов:\n`);
    results.forEach((result, index) => {
        console.log(`${index + 1}. ${result.title}`);
        console.log(`   URL: ${result.url}`);
        console.log(`   Описание: ${result.description}\n`);
    });
}
// Основная функция
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { query, options } = parseArgs(args);
            if (!query) {
                console.log('Ошибка: Не указан поисковый запрос');
                showHelp();
                process.exit(1);
            }
            console.log(`Выполняется поиск по запросу: "${query}"`);
            console.log('Параметры:', JSON.stringify(options, null, 2));
            const results = yield googleSearch_1.GoogleSearch.search(query, options);
            formatResults(results);
        }
        catch (error) {
            console.error('Ошибка при выполнении поиска:', error.message);
            process.exit(1);
        }
    });
}
// Запуск основной функции
if (require.main === module) {
    main();
}
//# sourceMappingURL=cli.js.map