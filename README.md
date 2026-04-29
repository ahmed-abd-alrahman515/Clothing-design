# StyleAI Kiosk ✦

A tablet/kiosk system for clothing stores where staff log in and customers describe design ideas — the system generates AI clothing designs in a ChatGPT-like interface.

**Stack:** Laravel 11 + React (Inertia.js) + Tailwind CSS + Google Gemini/Imagen AI

---

## Features

- Staff/Admin login with role-based access
- ChatGPT-style chat interface for design prompts
- First generation is free (3 images)
- Subsequent generations require admin approval (50 EGP, 5 images)
- Admin approval modal with secure server-side credential verification
- Dark/Light mode
- Arabic/English with RTL/LTR support
- Fake image provider for testing without an API key
- Design history per session

---

## Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd styleai-kiosk

# 2. Install PHP dependencies
composer install

# 3. Install Node dependencies
npm install

# 4. Configure environment
cp .env.example .env
php artisan key:generate

# 5. Set up database (edit .env with your MySQL credentials, or keep SQLite default)
php artisan migrate --seed

# 6. Link storage
php artisan storage:link

# 7. Build frontend
npm run build

# 8. Start server
php artisan serve
```

Visit `http://localhost:8000`

---

## Test Accounts

| Role  | Email                   | Password |
|-------|-------------------------|----------|
| Admin | admin@styleai.test      | password |
| Staff | staff@styleai.test      | password |

---

## AI Configuration

By default, a **fake image generator** is used (no API key needed). To use Google Gemini:

```env
AI_IMAGE_PROVIDER=gemini
GEMINI_API_KEY=your_key_here
```

Get a free API key at [Google AI Studio](https://aistudio.google.com).

---

## Development

```bash
# Run dev server + Vite hot reload
php artisan serve &
npm run dev
```

---

## Architecture

```
app/
  Http/
    Controllers/
      AuthController.php
      KioskController.php
      Api/
        DesignSessionController.php
        DesignGenerationController.php
        BranchController.php
    Middleware/HandleInertiaRequests.php
    Requests/
      GenerateDesignRequest.php
      GeneratePaidDesignRequest.php
  Models/
    User.php, Branch.php, Tablet.php
    DesignSession.php, DesignRequest.php, GeneratedDesign.php
  Services/
    Ai/
      ImageGeneratorInterface.php
      GeminiImageGenerator.php    ← Google Imagen API
      FakeImageGenerator.php      ← SVG placeholders for testing
    DesignGenerationService.php
    AdminApprovalService.php
  Policies/DesignSessionPolicy.php

resources/js/
  app.jsx
  i18n/ar.js, en.js
  hooks/useTheme.js, useLanguage.js
  Layouts/AppLayout.jsx
  Components/
    Navbar, Sidebar, ChatInput, DesignCard, DesignGrid
    LoadingDesignSkeleton, PaymentApprovalModal, EmptyState
    ThemeToggle, LanguageToggle
  Pages/
    Auth/Login.jsx
    Kiosk/Index.jsx, Sessions.jsx, Branches.jsx
```

---

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

In addition, [Laracasts](https://laracasts.com) contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

You can also watch bite-sized lessons with real-world projects on [Laravel Learn](https://laravel.com/learn), where you will be guided through building a Laravel application from scratch while learning PHP fundamentals.

## Agentic Development

Laravel's predictable structure and conventions make it ideal for AI coding agents like Claude Code, Cursor, and GitHub Copilot. Install [Laravel Boost](https://laravel.com/docs/ai) to supercharge your AI workflow:

```bash
composer require laravel/boost --dev

php artisan boost:install
```

Boost provides your agent 15+ tools and skills that help agents build Laravel applications while following best practices.

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
