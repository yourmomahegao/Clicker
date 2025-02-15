**СОЗДАНИЕ ПРИЛОЖЕНИЯ**
```bash
git clone https://github.com/yourmomahegao/ElectronTemplateRepository appname
cd appname
rm -r ".git" -fo
git init
npm install
code .
npm run start
exit
```

**СОЗДАНИЕ ПРИЛОЖЕНИЯ LINUX**
```bash
git clone https://github.com/yourmomahegao/ElectronTemplateRepository appname
cd appname
rm -rf ".git"
git init
npm install
code .
npm run start
exit
```

### РАБОТА С MAIN.JS
main.js в NodeJS Electron - это основной файл, который используется для инициализации и запуска Electron-приложения.<br />
Этот файл выполняет роль точки входа в приложение и содержит основную логику его запуска и работы.<br />
<br />
В main.js для Electron обычно выполняется настройка окна приложения, <br />
обработка жизненного цикла приложения <br />
(создание окна, загрузка содержимого, обработка событий окна и процесса приложения), <br />
работа с файловой системой, взаимодействие с операционной системой и другие важные аспекты.<br />

### ПАПКА PUBLIC
В папке **public** хранится вся Front-end часть приложения, где описана следующая иерархия:<br />
[Стили] **css** -> **Папка, идентичная названию HMTL-страницы** -> **Файлы .css**<br />
[Страницы] **html** -> **Файлы .html**<br />
[Изображения] **img** -> **Файлы изображений**<br />
[Скрипты] **js** -> **Папка, идентичная названию HMTL-страницы** -> **Файлы .js**<br />
[Шрифты] **fonts** -> **Папка, идентичная названию шрифты** -> **Файлы шрифта**<br />

### БИБЛИОТЕКИ
Основные используемые библиотеки: **Electron, JQuery**<br />
Также описаны и собственные библиотеки: **Notification, Pages, Schema, Splashscreen**<br />

### NOTIFICATION.JS
Позволяет отправлять уведомления на экран приложения.<br />
Для использования, на странице должен быть подключен скрипт<br />
__<script src="./../js/notifications.js"></script>__<br />

### PAGES.JS
Позволяет добавлять страницы, которые можно будет листать<br />
стрелками вправо и влево.<br />
## Для работы:
  1. Создать
  ```html
  <div class="pages">
  ```
  2. Создать
  ```html
  <div class="page" id="0">**
  ```
  **id** - номер страницы

### SPLASHSCREEN.JS
Позволяет добавлять сплеш-скрины, которые можно будет<br />
скрывать/отображать по заданной кнопке<br />
## Для работы:
  1. Создать 
  ```html
  <div class="splashscreens">
  ```
  2. Создать
  ```html
  <div class="splashscreen hidden" button="arrowup" position="1/1">
  ```
  **hidden**, если изначально требуется скрыть splashscreen,<br />
  **button** - кнопка скрытия/отображения<br />
  **position** - позиция на сетке 3 на 3 (например для отображения справа сверху используем: 3/1)<br />
<br />

### SCHEMA.JS
Описание моделей базы данных MSSQL<br />

### VERSION.JS
Библиотека, которая получает данные о версиях приложения,<br />
и создает уведомление, о том, что текщая версия не соответсвует действительности<br />

### CONFIG.JS
Конфигурационный файл, содержащий в себе ссылки, библиотеки и др.<br />
