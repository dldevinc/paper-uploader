# paper-uploader

[![Build Status](https://github.com/dldevinc/paper-uploader/actions/workflows/release.yml/badge.svg)](https://github.com/dldevinc/paper-uploader)

A file upload wrapper for paper-uploads based on dropzone.js


```js
import { Uploader } from "paper-uploader";


const uploader = new Uploader({
    // URL, на который будут отправляться загружаемые файлы. 
    // Required.
    url: "",
    
    // Максимальный размер chunk при разбиении больших файлов. 
    // Default: 2 * 1024 * 1024
    chunkSize: 2 * 1024 * 1024,
    
    // Разрешает загружать несколько файлов разом, аналогично
    // атрибуту multiple тэга <input type="file">.
    // Default: false
    uploadMultiple: true,
    
    // Максимально допустимый размер файла в байтах
    maxFilesize: null,
    
    // Объект (или функция, возвращающая объект), содержащий
    // данные, которые будут отправлены с каждым запросом.
    // Default: null
    params: {
        "author": "Jim"
    },

    // Объект (или функция, возвращающая объект), содержащий
    // HTTP-заголовки, которые будут отправлены с каждым запросом.
    // Default: null
    headers: {
        "X-Author-Name": "Jim"
    },
    
    // Строки или функции, предназначенные для фильтрации добавляемых файлов.
    // Default: []
    filters: [
        "image/*",
        
        file => {
            // ...
            return false  // skip file
        }
    ],

    // Добавленные файлы сразу будут помещены в очередь на отправку.
    // При значении false, ответственность за начало загрузки лежит
    // на разработчике.
    // Default: true
    autoStart: true,

    // DOM-элемент виджета, в который будет помещён скрытый <input>.
    // Default: document.body
    container: document.body,

    // DOM-элемент (или CSS-селектор), при клике на который вызывается 
    // окно выбора файла.
    // Default: false
    button: false,

    // DOM-элемент, в область которого можно перемещать файлы 
    // для их загрузки.
    // Default: null
    dropzone: null
});
```

## Events

```js
uploader.on("submitted", file => {
    console.log(`File submitted: ${file.name}`);
})
```

Link: [EventEmitter](https://github.com/Olical/EventEmitter/blob/master/docs/guide.md#using-eventemitter)

### submit

Format: `function(file) {}`

Вызывается при добавлении файла в очередь, до любых проверок на валидность файла.

Чтобы отменить добавление файла в очередь, необходимо вызвать в обработчике
события исключение с текстом ошибки. Ошибка, созданная таким образом
может быть переопределена встроенными проверками (например проверкой
максимального размера файла).

### submitted

Format: `function(file) {}`

Вызывается когда файл успешно добавлен в очередь. Подразумевается, что
на этой стадии файл уже проверен, поэтому отменять загрузку на этой стадии
не стоит.

### upload

Format: `function(file, xhr, formData) {}`

Вызывается прямо перед отправкой файла на сервер.
Через аргументы xhr и formData можно модифицировать отправляемые данные.

### progress

Format: `function(file, progress, bytesSent) {}`

Вызывается при обновлении прогресса отправки файла.
Аргумент progress - это состояние отправки в процентах (0-100).

### cancel

Format: `function(file) {}`

Вызывается при отмене загрузки файла. Чтобы вызвался этот метод,
файл должен пройти стадию submitted.

### complete

Format: `function(file, response) {}`

Событие успешной загрузки файла.
Загрузка считается успешной, когда сервер ответил статусом 200.

### all_complete

Format: `function() {}`

Вызывается когда очередь файлов обработана.

### error

Format: `function(file, message) {}`

Обработчик ошибок загрузки. Вызывается не только при JS-ошибках
во время отправки файла, но и при получении ошибок валидации
от сервера.
