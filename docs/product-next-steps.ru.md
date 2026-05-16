# Что делать дальше с AruAI и что умеет этот SaaS

Этот документ отвечает на два практических вопроса: **что продукт уже умеет по текущей кодовой базе** и **что нужно сделать дальше, чтобы превратить его в продаваемый SaaS для салонов красоты в Казахстане/СНГ**.

## Что этот SaaS уже умеет

### 1. Позиционирование и витрина продукта

AruAI оформлен как премиальный AI-сотрудник для салона, а не как обычный чат-бот. Главная идея продукта: AI обучается на реальных переписках салона, чтобы перенять стиль администратора, цены, возражения клиентов, частые вопросы, сценарии записи и мягкие допродажи.

В продукте уже заложаны страницы:

- лендинг с акцентом на обучение по реальным перепискам;
- onboarding для создания AI-сотрудника;
- dashboard с ощущением «AI работает прямо сейчас»;
- live chats;
- lightweight CRM;
- integrations;
- billing.

### 2. Онбординг салона

Текущий flow позволяет заложить сценарий запуска за 5 минут:

1. Владелец выбирает нишу: nails, hair, lash, brow, beauty clinic или massage.
2. Создает AI-сотрудника: имя, стиль общения и будущий аватар.
3. Загружает знания салона: Telegram/WhatsApp экспорт, FAQ, прайс, PDF, инструкции.
4. Подключает Telegram bot token.
5. Видит live preview, как AI отвечает клиенту и предлагает запись/допродажу.

### 3. Обучение на истории переписок

Это главная продуктовая фича и основной moat. Backend уже содержит pipeline:

1. Прием файлов через `POST /api/training/upload`.
2. Извлечение текста из text/json/html/pdf.
3. Нормализация переписок.
4. Извлечение быстрых инсайтов: tone, prices, objections.
5. Нарезка на chunks.
6. Embeddings через OpenAI.
7. Сохранение chunks в Supabase `knowledge_chunks`.
8. Поиск релевантных знаний через pgvector RPC `match_knowledge_chunks`.

### 4. AI-ответы с RAG и памятью

AI pipeline уже спроектирован вокруг реальных знаний салона:

- строит embedding запроса клиента;
- достает релевантные фрагменты переписок/FAQ/прайса;
- добавляет память клиента;
- формирует system prompt для теплого, премиального, sales-aware администратора;
- генерирует ответ через OpenAI;
- умеет отвечать на русском/казахском по контексту клиента.

### 5. Telegram integration

Telegram уже является рабочей интеграцией в архитектуре:

1. Пользователь вставляет bot token.
2. Backend вызывает Telegram `setWebhook`.
3. Telegram отправляет входящие сообщения на `/api/telegram/webhook`.
4. Webhook проверяет secret token.
5. Сохраняет клиента, conversation и message.
6. Генерирует AI-ответ.
7. Отправляет ответ обратно в Telegram через `sendMessage`.

### 6. CRM и операционная модель

Схема базы уже поддерживает базовый salon CRM:

- customers;
- conversation history;
- tags;
- statuses: New Lead, Interested, Booked, Visited, VIP, Lost;
- appointments;
- customer memories;
- messages;
- AI/human/system senders.

Это позволяет построить полноценный «AI business OS», где переписки, записи, статусы и память клиента связаны в одном месте.

## Что делать дальше: приоритетный план

### Этап 1 — Довести MVP до реально запускаемого состояния

Цель: владелец салона может зарегистрироваться, создать AI-сотрудника, загрузить переписки, подключить Telegram и получить первые ответы клиентам.

Нужно сделать:

- подключить реальные Supabase Auth формы: sign up, login, logout, protected routes;
- заменить статичные dashboard/chats/CRM данные на Supabase queries;
- добавить UI state для onboarding: выбранная ниша, стиль, имя AI, upload progress, Telegram connect status;
- добавить обработку ошибок Telegram token и повторное подключение;
- добавить ограничение размера файлов и безопасную валидацию uploads;
- добавить таблицу тарифных лимитов: replies/month, bots, team seats;
- добавить seed/demo mode для салонов без реальных переписок.

### Этап 2 — Сделать AI действительно «как администратор»

Цель: AI должен не просто отвечать, а продавать, записывать и восстанавливать лиды.

Нужно сделать:

- структурированное извлечение из переписок: services, prices, masters, working hours, objections, booking patterns;
- отдельный `salon_playbooks` слой: правила записи, отмены, предоплаты, допродажи;
- function calling/tools для создания appointment в базе;
- автообновление customer memory после каждого диалога;
- confidence score для каждого ответа;
- automatic human takeover, если AI не уверен, клиент злится или вопрос рискованный;
- тестовый набор «контрольных клиентов», чтобы владелец проверял качество AI до запуска.

### Этап 3 — Сделать live chat production-grade

Цель: владелец салона видит все диалоги в реальном времени и может перехватить разговор.

Нужно сделать:

- Supabase Realtime для conversations/messages;
- pause/resume AI на уровне conversation;
- saved replies;
- internal notes;
- lead tags;
- filters: unread, AI paused, hot leads, booking intent, needs human;
- typing indicators;
- mobile-first chat composer.

### Этап 4 — Коммерциализация

Цель: начать брать деньги у салонов.

Нужно сделать:

- интеграцию оплаты для Казахстана: Kaspi/manual invoice на MVP, затем Stripe/CloudPayments/Robokassa по рынку;
- лимиты Free/Pro/Business;
- usage tracking по AI replies, conversations, training storage;
- billing portal;
- trial period 7–14 дней;
- paywall на human takeover, analytics и unlimited chats;
- onboarding checklist с progress bar до активации.

### Этап 5 — Каналы и рост

Цель: расшириться за Telegram.

Приоритет интеграций:

1. Instagram DM — самый важный следующий канал для beauty.
2. WhatsApp Business — нужен для более зрелых салонов.
3. Avito — полезен для лидов услуг.
4. TikTok comments/DM — ростовой канал.

## Что продавать салонам простыми словами

### Главный оффер

> «Мы создаем AI-администратора, который учится на ваших реальных переписках и отвечает клиентам в вашем стиле: записывает, продает, напоминает и возвращает потерянных клиентов».

### Почему это не обычный chatbot

Обычный chatbot работает по шаблонам. AruAI:

- анализирует реальные чаты;
- понимает стиль администратора;
- знает прайс и услуги;
- помнит клиента;
- предлагает релевантные допродажи;
- работает в Telegram;
- может передать разговор человеку.

## MVP acceptance criteria

Продукт можно считать MVP-ready, когда выполняются критерии:

- владелец может зарегистрироваться и войти;
- может создать salon profile;
- может загрузить минимум один Telegram/WhatsApp export;
- видит статус обучения;
- может подключить Telegram bot token;
- клиент пишет в Telegram и получает AI-ответ;
- владелец видит conversation в интерфейсе;
- владелец может поставить AI на паузу;
- AI может предложить запись и сохранить appointment;
- есть лимиты тарифа и basic billing state.

## Самый важный следующий шаг

Не добавлять больше страниц. Следующий шаг — **связать уже созданный UI с реальными данными Supabase и сделать один полностью рабочий вертикальный сценарий**:

> Sign up → Create salon → Upload chats → Train AI → Connect Telegram → Client writes → AI replies → Owner sees chat → Owner can take over.

Если этот сценарий работает стабильно, SaaS уже можно показывать первым 5–10 салонам и собирать платные пилоты.
