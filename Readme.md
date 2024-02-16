# Личный проект «Readme»

---
# Информация по запуску проекта

Перед первым запуском проекта необходимо выполнить запустить контейнеры в docker и создать файлы с переменными окружения. Файлы с переменными окружения должны находиться по адресам:

#### Сервис user: `./apps/user/.user.env`

#### Сервис post: `./apps/post/.post.env`

#### Сервис notify: `./apps/notify/.notify.env`

#### Сервис upload: `./apps/upload/.upload.env`

Образцы файлов с переменными окружения находятся в соответствующих директориях с окончанием .env.example

## Установка образов и запуск контейнеров docker производится следующими командами

#### Сервис user:
```
docker compose --file ./apps/user/docker-compose.dev.yml \
--env-file ./apps/user/.user.env \
--project-name "readme-user" \
up -d
```
#### Сервис post
```
docker compose \
--file ./apps/post/docker-compose.dev.yml \
--env-file ./apps/post/.post.env \
--project-name "readme-post" \
up -d
```
#### Сервис notify
```
docker compose \
--file ./apps/notify/docker-compose.dev.yml \
--env-file ./apps/notify/.notify.env \
--project-name "readme-notify" \
up -d
```
#### Сервис upload
```
docker compose \
--file ./apps/upload/docker-compose.dev.yml \
--env-file ./apps/upload/.upload.env \
--project-name "readme-upload" \
up -d
```
Для подключения к базе данных сервиса post необходимо в корневой папке приложения создать файл с переменными окружения для Prisma. Пример файла приведен в директории `project\libs\shared\post\models\prisma\.env-example`

## Команды базы данных сервиса post.

Для работы с базой данных сервиса post предусмотрены следующие команды:

**db:lint** - проверка схемы (`schema.prisma`) базы данных на ошибки
#### Запуск команды в CLI:
```
npx nx run post:db:lint
```
**db:migrate** - создание миграции данных в БД
#### Запуск команды в CLI:
```
npx nx run post:db:migrate
```

**db:reset** - принудительный сброс и повторение всех миграций, удаляет все данные из БД
#### Запуск команды в CLI:
```
npx nx run post:db:reset
```

**db:generate** - генерация актуальной версии клиент Prisma
#### Запуск команды в CLI:
```
npx nx run post:db:generate
```

**db:seed** - наполнение базы данных тестовыми данными
#### Запуск команды в CLI:
```
npx nx run post:db:seed
```

## Старт проекта в dev режиме

В директории project выполнить команды:

#### Установить зависимости
```
npm i
```
#### Запустить все сервисы

```
nx run-many -t serve -p user post notify upload 
```

---

_Не удаляйте и не изменяйте папки и файлы:_
_`.editorconfig`, `.gitattributes`, `.gitignore`._

---

## Памятка

### 1. Зарегистрируйтесь на Гитхабе

Если у вас ещё нет аккаунта на [github.com](https://github.com/join), скорее зарегистрируйтесь.

### 2. Создайте форк

Откройте репозиторий и нажмите кнопку «Fork» в правом верхнем углу. Репозиторий из Академии будет скопирован в ваш аккаунт.

<img width="769" alt="Press 'Fork'" src="https://cloud.githubusercontent.com/assets/259739/20264045/a1ddbf40-aa7a-11e6-9a1a-724a1c0123c8.png">

Получится вот так:

<img width="769" alt="Forked" src="https://cloud.githubusercontent.com/assets/259739/20264122/f63219a6-aa7a-11e6-945a-89818fc7c014.png">

### 3. Клонируйте репозиторий на свой компьютер

Будьте внимательны: нужно клонировать свой репозиторий (форк), а не репозиторий Академии. Также обратите внимание, что клонировать репозиторий нужно через SSH, а не через HTTPS. Нажмите зелёную кнопку в правой части экрана, чтобы скопировать SSH-адрес вашего репозитория:

<img width="769" alt="SSH" src="https://cloud.githubusercontent.com/assets/259739/20264180/42704126-aa7b-11e6-9ab4-73372b812a53.png">

Клонировать репозиторий можно так:

```
git clone SSH-адрес_вашего_форка
```

Команда клонирует репозиторий на ваш компьютер и подготовит всё необходимое для старта работы.

### 4. Начинайте обучение!

---

<a href="https://htmlacademy.ru/profession/fullstack"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/nodejs/logo-for-github-2.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[Node.js. Проектирование веб-сервисов](https://htmlacademy.ru/profession/fullstack)» от [HTML Academy](https://htmlacademy.ru).
