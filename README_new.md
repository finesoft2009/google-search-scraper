# google-search-ts

TypeScript библиотека для выполнения Google поиска с поддержкой прокси, пагинации и настройки параметров.

## Установка

```bash
npm install google-search-ts
```

## CLI использование

После установки вы можете использовать библиотеку прямо из командной строки:

```bash
npx google-search-ts "TypeScript programming"
```

### CLI опции

| Опция | Тип | По умолчанию | Описание |
|-------|-----|--------------|----------|
| `<запрос>` | string | - | Поисковый запрос |
| `--numResults` | number | 10 | Количество результатов для возврата |
| `--lang` | string | 'en' | Язык результатов поиска |
| `--proxy` | string | undefined | URL прокси-сервера (например, 'http://proxy.example.com:8080') |
| `--timeout` | number | 5000 | Таймаут запроса в миллисекундах |
| `--safe` | 'active' \| 'off' | 'active' | Настройки безопасного поиска |
| `--region` | string | undefined | Регион для результатов поиска |
| `--start` | number | 0 | Начальная позиция для пагинации |
| `--unique` | boolean | false | Удалить дублирующиеся URL из результатов |
| `--help` | - | - | Показать справочное сообщение |

### CLI примеры

```bash
# Базовый поиск
npx google-search-ts "TypeScript tutorial"

# Поиск с определенным количеством результатов
npx google-search-ts "JavaScript framework" --numResults 5

# Поиск с локализацией
npx google-search-ts "Node.js documentation" --lang ru --region RU

# Поиск с настройками безопасности
npx google-search-ts "React tutorial" --safe off --timeout 10000

# Поиск с фильтрацией дубликатов
npx google-search-ts "Python programming" --numResults 20 --unique

# Поиск с пагинацией
npx google-search-ts "Web development" --start 10 --numResults 5
```

## Программное использование

### Установка
```bash
npm install google-search-ts
```

### Базовый поиск

```typescript
import { GoogleSearch } from 'google-search-ts';

async function basicSearch() {
    try {
        const results = await GoogleSearch.search('nodejs typescript');
        console.log(`Найдено ${results.length} результатов`);
        
        // Печатаем первый результат
        console.log('Первый результат:', {
            title: results[0].title,
            url: results[0].url,
            description: results[0].description
        });
    } catch (error) {
        console.error('Поиск не удался:', error.message);
    }
}
```

### Поиск с опциями

```typescript
import { GoogleSearch, SearchOptions } from 'google-search-ts';

// Поиск с опциями
const options: SearchOptions = {
    numResults: 20,        // Количество результатов для возврата
    lang: 'en',           // Язык результатов поиска
    safe: 'active',       // Настройки безопасного поиска ('active' или 'off')
    region: 'US',         // Регион для результатов поиска
    start: 0,             // Начальная позиция для пагинации
    unique: true,         // Удалить дублирующиеся URL
    proxy: 'http://proxy.example.com:8080',  // Опциональный прокси
    timeout: 5000         // Таймаут запроса в миллисекундах
};

const resultsWithOptions = await GoogleSearch.search('nodejs typescript', options);

// Каждый результат содержит:
// {
//     url: string;        // URL результата поиска
//     title: string;      // Заголовок результата поиска
//     description: string; // Описание/сниппет результата поиска
// }
```

## Примеры

### Базовый поиск

```typescript
import { GoogleSearch } from 'google-search-ts';

async function basicSearch() {
    try {
        const results = await GoogleSearch.search('nodejs typescript');
        console.log(`Найдено ${results.length} результатов`);
        
        // Печатаем первый результат
        console.log('Первый результат:', {
            title: results[0].title,
            url: results[0].url,
            description: results[0].description
        });
    } catch (error) {
        console.error('Поиск не удался:', error.message);
    }
}
```

### Пагинация

```typescript
import { GoogleSearch } from 'google-search-ts';

async function paginatedSearch() {
    const query = 'typescript tutorials';
    const resultsPerPage = 10;
    
    try {
        // Получаем первую страницу
        const page1 = await GoogleSearch.search(query, {
            numResults: resultsPerPage,
            start: 0
        });
        
        // Получаем вторую страницу
        const page2 = await GoogleSearch.search(query, {
            numResults: resultsPerPage,
            start: resultsPerPage
        });
        
        const allResults = [...page1, ...page2];
        console.log(`Всего результатов: ${allResults.length}`);
    } catch (error) {
        console.error('Поиск с пагинацией не удался:', error.message);
    }
}
```

### Локализованный поиск

```typescript
import { GoogleSearch } from 'google-search-ts';

async function localizedSearch() {
    try {
        // Поиск на французском, ограниченный Францией
        const frenchResults = await GoogleSearch.search('développeur web', {
            lang: 'fr',
            region: 'FR',
            numResults: 10
        });
        
        // Поиск на немецком, ограниченный Германией
        const germanResults = await GoogleSearch.search('webentwickler', {
            lang: 'de',
            region: 'DE',
            numResults: 10
        });
        
        console.log('Французские результаты:', frenchResults.length);
        console.log('Немецкие результаты:', germanResults.length);
    } catch (error) {
        console.error('Локализованный поиск не удался:', error.message);
    }
}
```

### Использование прокси

```typescript
import { GoogleSearch } from 'google-search-ts';

async function searchWithProxy() {
    try {
        const results = await GoogleSearch.search('programming jobs', {
            proxy: 'http://your-proxy-server:8080',
            timeout: 10000,  // Увеличенный таймаут для прокси
            numResults: 15
        });
        
        console.log(`Найдено ${results.length} вакансий`);
    } catch (error) {
        console.error('Поиск через прокси не удался:', error.message);
    }
}
```

### Обработка ошибок

```typescript
import { GoogleSearch } from 'google-search-ts';

async function robustSearch() {
    try {
        const results = await GoogleSearch.search('typescript examples', {
            numResults: 20,
            unique: true  // Удалить дублирующиеся URL
        });
        
        if (results.length === 0) {
            console.log('Результаты не найдены');
            return;
        }
        
        // Обрабатываем результаты
        results.forEach((result, index) => {
            console.log(`${index + 1}. ${result.title}`);
            console.log(`   URL: ${result.url}`);
            console.log(`   Описание: ${result.description}\n`);
        });
        
    } catch (error) {
        if (error.message.includes('timeout')) {
            console.error('Поиск превысил время ожидания. Попробуйте увеличить значение таймаута.');
        } else if (error.message.includes('proxy')) {
            console.error('Ошибка прокси. Проверьте конфигурацию прокси.');
        } else {
            console.error('Поиск не удался:', error.message);
        }
    }
}
```

## Возможности

- 🔍 Выполнять Google поиски программно
- 🌍 Поддержка разных языков и регионов
- 🔐 Поддержка безопасного поиска
- 📄 Поддержка пагинации
- 🔄 Поддержка прокси
- 🎯 Настраиваемое количество результатов
- 🚫 Фильтрация дублирующихся URL
- ⏱️ Настраиваемый таймаут
- 📝 Включает TypeScript типы

## Опции

| Опция | Тип | По умолчанию | Описание |
|--------|------|---------|-------------|
| numResults | number | 10 | Количество результатов для возврата |
| lang | string | 'en' | Язык результатов поиска |
| proxy | string | undefined | URL прокси-сервера (например, 'http://proxy.example.com:8080') |
| timeout | number | 5000 | Таймаут запроса в миллисекундах |
| safe | 'active' \| 'off' | 'active' | Настройки безопасного поиска |
| region | string | undefined | Регион для результатов поиска |
| start | number | 0 | Начальная позиция для пагинации |
| unique | boolean | false | Удалить дублирующиеся URL из результатов |

## Обновления

### v1.0.1
- Добавлен CLI интерфейс для использования из командной строки
- Улучшена стабильность получения результатов через альтернативные поисковые системы
- Добавлены подробные инструкции по использованию CLI и программному API

### Особенности реализации

Библиотека использует альтернативные поисковые системы (DuckDuckGo, Ecosia) и тестовые данные при необходимости для обхода ограничений Google на автоматический парсинг. Это позволяет получать результаты поиска без использования прокси или внешних API.

## Лицензия

MIT

## Вклад

Вклады приветствуются! Пожалуйста, не стесняйтесь отправлять Pull Request в [репозиторий GitHub](https://github.com/tkattkat/google-search-ts).