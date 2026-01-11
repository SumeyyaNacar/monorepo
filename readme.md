🔐 Full-Stack Authentication System (Monorepo)

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş tam kapsamlı bir Signup / Login (Kayıt & Giriş) sistemidir.

📦 Monorepo mimarisi sayesinde frontend ve backend uygulamaları tek bir depo altında, ancak birbirinden bağımsız şekilde yönetilmektedir.

📂 Proje Yapısı

Monorepo mimarisi ile organize edilmiş klasör yapısı:
monorepo/
├── frontend-auth/   # Next.js 15 tabanlı frontend
└── backend-auth/    # LoopBack 4 tabanlı REST API


📁 Klasör Açıklamaları

frontend-auth/

React 19 & Next.js 15 (App Router)
Kullanıcı kayıt ve giriş arayüzleri
Form validasyonları ve bildirim sistemi

backend-auth/

LoopBack 4 (TypeScript)
JWT tabanlı authentication
Güvenli şifreleme ve REST API servisleri

🛠️ Kullanılan Teknolojiler
🔙 Backend (backend-auth)

Framework: LoopBack 4 (TypeScript)

Güvenlik
bcryptjs → Şifre hashleme
jsonwebtoken (JWT) → Token tabanlı yetkilendirme

Çalışma Ortamı

Node.js v20, v22 veya v24

🎨 Frontend (frontend-auth)

Framework
Next.js 15.1.6
React 19
Stil & UI
Sass → Değişken & mixin destekli CSS
PrimeReact & PrimeIcons → UI bileşenleri
React-Bootstrap → Grid sistemi
Form & Bildirim
Yup → Form doğrulama

Performans
React Compiler desteği

⚙️ Kurulum ve Çalıştırma
Aşağıdaki adımları sırasıyla takip ederek projeyi yerel ortamında çalıştırabilirsin.

1️⃣ Repoyu Klonlayın

git clone https://github.com/SumeyyaNacar/monorepo.git
cd monorepo

2️⃣ Backend Servisini Başlatın

📌 Port: 3000

```bash
cd backend-auth
npm install
npm run build
npm start

🔗 API URL:http://localhost:3000
🔍 API Explorer (Test için):http://localhost:3000/explorer

3️⃣ Frontend Uygulamasını Başlatın

📌 Port: 3001
```bash
cd ../frontend-auth
npm install
npm run dev -- -p 3001

🌐 Uygulama URL:http://localhost:3001

✅ Özellikler

🔐 Güvenli kullanıcı kayıt & giriş sistemi

🪪 JWT tabanlı authentication

🔒 Hashlenmiş şifre saklama
📦 Monorepo mimarisi
🎨 Modern ve responsive UI
🧪 API Explorer ile endpoint test imkanı


📌 Notlar

Backend ve frontend bağımsız portlarda çalışır
Geliştirme ortamı için .env dosyaları opsiyonel olarak eklenebilir
Proje eğitim ve geliştirme amaçlıdır
