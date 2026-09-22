# K12 ERP

Hệ thống quản lý trường học K12 được xây dựng bằng Next.js, Firebase, Vercel và GitHub.

## Cài đặt nhanh

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Tạo dữ liệu mẫu Firestore

```bash
npm run seed:firestore
```

## Triển khai Firebase

```bash
firebase deploy --only firestore:rules,storage
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions
```

## Triển khai lên Vercel

1. Push code lên GitHub
2. Import repo vào Vercel
3. Thiết lập các biến môi trường Firebase
4. Deploy

## Cấu trúc chính

- `src/app`: giao diện Next.js
- `src/components`: component chung
- `src/lib`: cấu hình Firebase
- `src/services`: truy vấn dữ liệu Firestore
- `src/types`: kiểu dữ liệu
- `functions/src`: Cloud Functions
