# Новый Вектор 2026 — сайт карточек

Готовая версия для GitHub Pages.

## Как добавить новую карточку службы

1. Положите изображение в `assets/services/`, например `assets/services/finance.jpg`.
2. Откройте `data/services.json`.
3. Добавьте объект:

```json
{
  "title": "Финансовая служба",
  "subtitle": "Считаем. Планируем. Помогаем.",
  "image": "assets/services/finance.jpg",
  "tag": "Финансы"
}
```

## Как добавить руководителя окружной команды

1. Положите изображение в `assets/districts/`.
2. Добавьте объект в `data/districts.json`.

## Как добавить управляющую команду

1. Положите изображение в `assets/team/`.
2. Добавьте объект в `data/team.json`.

## Публикация на GitHub Pages

Settings → Pages → Deploy from a branch → main → /root.
