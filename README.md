# Тестовое задание для студии Артемия Лебедева

**Позиция:** Стажер Frontend-разработчика

---

## Выполнил:

**Томилов Глеб**

## Контакты

- **Telegram:** [@glebtmv](https://t.me/glebtmv)
- **Email:** [gleb.tomilov.2003@mail.ru](mailto:gleb.tomilov.2003@mail.ru)

---

## Описание проекта

Проект представляет собой **компонент автоформы на Vue 3**, который строит форму на основе переданной **JSON-схемы**.

Форма поддерживает следующие типы полей:

- текстовое поле (`text`, `email`, `password`)
- выпадающий список (`select`)
- чекбокс (`checkbox`)

Форма реализует **минимальную валидацию**: обязательные поля (`required`), минимальная длина (`minLength`) и регулярные выражения (`pattern`). Введённые пользователем данные реактивно отображаются в переданном объекте `v-model`.

---

## Пример JSON-схемы

```json
{
  "fields": [
    { "type": "text", "label": "Имя", "model": "name", "required": true },
    { "type": "email", "label": "Email", "model": "email", "required": true },
    {
      "type": "password",
      "label": "Пароль",
      "model": "password",
      "required": true,
      "minLength": 6
    },
    {
      "type": "select",
      "label": "Роль",
      "model": "role",
      "options": ["Админ", "Пользователь"],
      "required": true
    },
    {
      "type": "checkbox",
      "label": "Согласен с условиями",
      "model": "terms",
      "required": true
    }
  ]
}
```
