# Что еще добавить, чтобы AruAI стал максимально рабочим и сильным SaaS

Цель AruAI — быть не «еще одним ботом», а полноценным AI-сотрудником для салона красоты: он обучается на реальных переписках, отвечает в стиле администратора, записывает клиентов, возвращает потерянные лиды и показывает владельцу понятную бизнес-аналитику.

Ниже — практичный roadmap, что добавить дальше, чтобы продукт стал максимально рабочим, продаваемым и похожим на топовый startup SaaS.

## 1. Главный приоритет: довести один end-to-end сценарий до идеала

Не нужно сначала добавлять 100 новых страниц. Самое важное — сделать один путь полностью рабочим:

1. Владелец регистрируется.
2. Создает салон.
3. Создает AI-сотрудника.
4. Выбирает тон общения.
5. Загружает Telegram/WhatsApp переписки.
6. AI показывает, чему он научился: тон, услуги, цены, возражения, частые вопросы.
7. Владелец подключает Telegram token.
8. Клиент пишет в Telegram.
9. AI отвечает.
10. Владелец видит диалог в dashboard.
11. Владелец может нажать **Pause AI** и перехватить разговор.
12. AI создает запись и показывает revenue impact.

Если этот flow работает стабильно, продукт уже можно продавать первым салонам.

## 2. Что добавить в onboarding

Сейчас onboarding должен стать «магическим моментом» продукта. После загрузки переписок владелец должен подумать: «Он реально понял мой салон».

### Добавить после upload

- экран **AI Training Report**;
- найденные услуги;
- найденные цены;
- стиль администратора;
- частые возражения клиентов;
- примеры фраз, которые AI будет использовать;
- confidence score обучения;
- кнопка «Исправить данные»;
- кнопка «Протестировать AI на 5 примерах».

### Добавить wizard checkpoints

- `Salon created`;
- `AI employee configured`;
- `Knowledge uploaded`;
- `Training complete`;
- `Telegram connected`;
- `First reply sent`.

Это дает ощущение запуска, а не просто формы.

## 3. Что добавить в AI-систему

### 3.1 Structured extraction

После загрузки переписок AI должен не только сохранять chunks, а извлекать структурированные данные:

- services;
- prices;
- masters;
- working hours;
- booking rules;
- cancellation rules;
- prepayment rules;
- objections;
- upsell patterns;
- tone examples;
- forbidden answers.

Нужны таблицы или JSON-поля:

- `salon_services`;
- `salon_masters`;
- `salon_rules`;
- `salon_objections`;
- `salon_tone_examples`.

### 3.2 AI confidence and safe fallback

Каждый AI-ответ должен иметь внутреннюю оценку:

- `confidence: high | medium | low`;
- `intent: booking | price_question | objection | complaint | support | risky`;
- `should_handoff: boolean`;
- `suggested_tags`;
- `memory_to_save`.

Если confidence низкий или клиент злится — AI должен не фантазировать, а вызвать human takeover.

### 3.3 Appointment tool

AI должен уметь не только «сказать, что записал», а реально создать запись:

- service;
- date/time;
- master;
- price;
- customer;
- status;
- notes.

Для этого нужен tool/function `createAppointment` и UI, где владелец видит созданную запись.

### 3.4 Memory updater

После каждого диалога AI должен обновлять память клиента:

- любимые услуги;
- предпочтительное время;
- бюджет;
- аллергии/ограничения;
- любимый мастер;
- как часто приходит;
- стиль общения.

## 4. Что добавить в Telegram и live chats

Чтобы продукт ощущался реальным, Telegram и chats должны быть production-grade.

### Обязательно

- Supabase Realtime для новых messages;
- AI typing indicator;
- unread count;
- pause/resume AI;
- human takeover;
- saved replies;
- internal notes;
- tags;
- filters: unread, hot lead, booked, AI paused, needs human;
- message delivery status;
- conversation assignment.

### Очень важно

Добавить режим **AI Copilot**:

- AI не отправляет ответ сразу;
- AI предлагает ответ администратору;
- человек нажимает Send/Edit;
- полезно для первых дней trial, когда салон еще не доверяет AI полностью.

## 5. Что добавить в dashboard и аналитику

Dashboard должен отвечать не на вопрос «сколько сообщений», а на вопрос владельца: **сколько денег принес AI?**

### Метрики top-startup уровня

- AI replies;
- AI solved rate;
- booking conversion;
- lost leads recovered;
- revenue generated;
- estimated missed revenue;
- response time;
- human takeover rate;
- upsell conversion;
- repeat customer rate;
- trial activation score;
- AI quality score;
- training completeness score.

### Виджеты

- revenue chart;
- booking funnel;
- AI activity feed;
- «клиенты, которых нужно вернуть сегодня»;
- «диалоги, где AI не уверен»;
- «лучшие upsell opportunities»;
- «что AI выучил за сегодня».

## 6. Что добавить в подписки и оплату

Для рынка Казахстана/СНГ важно не только Stripe.

### MVP оплаты

- manual Kaspi invoice;
- статус оплаты вручную в admin/service role;
- trial 5–7 дней;
- лимиты по AI replies;
- warning при 80% лимита;
- hard limit при 100%;
- upgrade prompt.

### Далее

- CloudPayments;
- Robokassa;
- Stripe для международных;
- invoices;
- payment history;
- cancel/pause subscription;
- annual plan discount.

## 7. Что добавить для доверия владельцев салонов

Салоны боятся, что AI «ответит не так». Поэтому нужен trust layer.

### Trust features

- test mode before going live;
- AI answer preview;
- forbidden topics;
- blacklist words;
- human approval mode;
- daily report of AI replies;
- «почему AI так ответил» для владельца;
- audit log;
- emergency pause button.

## 8. Что добавить в CRM

CRM должна быть легкой, не как Bitrix. Только то, что реально нужно мастеру.

### Полезные сущности

- клиент;
- статус;
- последняя переписка;
- следующая запись;
- сумма выручки;
- tags;
- заметка;
- память AI;
- история визитов.

### Автоматизации

- клиент не ответил 24 часа → follow-up;
- клиент не был 30 дней → recovery message;
- клиент записался → reminder;
- клиент VIP → premium tone;
- клиент спрашивал цену и исчез → objection recovery.

## 9. Что добавить для роста и продаж

### Sales assets внутри продукта

- demo salon mode;
- before/after examples;
- ROI calculator;
- «AI saved X hours this week»;
- shareable report для владельца;
- onboarding checklist;
- referral program.

### Каналы интеграций

Приоритет:

1. Telegram — уже главный MVP channel.
2. Instagram DM — самый важный следующий канал для beauty.
3. WhatsApp Business.
4. Avito.
5. TikTok comments/DM.

## 10. Идеальный порядок разработки

### Sprint 1 — Сделать реально рабочий вертикальный MVP

- Supabase Auth UI;
- protected routes;
- onboarding сохраняет данные в Supabase;
- upload реально вызывает training API;
- Telegram connect реально вызывает integration API;
- dashboard показывает реальные conversations;
- pause/resume AI работает.

### Sprint 2 — Сделать AI сильнее конкурентов

- structured extraction;
- AI training report;
- appointment tool;
- memory updater;
- confidence/handoff;
- test mode.

### Sprint 3 — Сделать продажи и оплату

- trial limits;
- Kaspi/manual billing;
- usage tracking;
- upgrade prompts;
- ROI dashboard;
- daily owner report.

### Sprint 4 — Сделать growth

- Instagram DM;
- referral;
- shareable analytics report;
- templates by niche;
- partner salons case studies.

## 11. Что НЕ добавлять сейчас

Чтобы не превратить продукт в тяжелый dashboard, пока не надо делать:

- сложный enterprise CRM;
- много ролей и permissions;
- огромную админку;
- 20 интеграций одновременно;
- конструктор ботов;
- визуальный drag-and-drop builder.

Главный фокус: **AI-сотрудник, который реально отвечает клиентам и приносит записи**.

## 12. Самая сильная формула продукта

> Upload real chats → AI learns salon style → Connect Telegram → AI books clients → Owner sees revenue.

Если каждая часть этой формулы работает идеально, AruAI будет ощущаться как настоящий AI-сотрудник, а не как очередной chatbot builder.
