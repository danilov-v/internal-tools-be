# Бэкенд для проекта IT-Tools

## Инструкции по запуску

В рабочей директории проекта выполните:

- `npm install`
- заполните `config.json` файл
- `cd database && docker-compose up`
- `cd .. && npm start`

**Примечание:** при первом запуске база данных будет пустой.
Для того, чтобы заполнить ее выполните в рабочей директории проекта `npm run seed:initial`.

## Доступные скрипты

В каталоге проекта вы можете запустить:

- `npm run build`- создает финальную сборку приложения в папке `build`
- `npm run knex` - точка входа для `knex`
- `npm run lint` - запускает линтер по проекту
- `npm run lint:fix` - запускает линтер по проекту и исправляет ошибки, если это возможно
- `npm run migrate:latest` - запускает все миграции, которые еще не были применены к базе
- `npm run migrate:make` - создает новую миграцию
- `npm run migrate:status` - список имеющихся миграций
- `npm run seed:initial` - применяет сид с начальными данными (для разработки)
- `npm run seed:make` - создает новый сид
- `npm run start` - запускает приложение
- `npm run test` - запускает тесты по проекту

**Примечание:** для всех `migrate`, `seed` и `knex` скриптов база должна быть запущена!

## Дополнительная информация

Для работы проекта локально должен быть установлены:

- [`docker`](https://docs.docker.com/install);
- [`docker-cpompose`](https://docs.docker.com/compose/install).
