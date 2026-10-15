---
title: "Standard Library - URL"
author: "dhymas"
date: 2022-03-01T15:20:00Z
draft: true
tags: ["url", "nodejs", "web", "library"]
categories: ["NodeJS"]
---

Halo semua, kembali lagi bersama _Author_ :')

Saat membuat backend atau web scraper, kita pasti sering berurusan dengan alamat web (URL) yang panjang dan penuh query parameter yang rumit.

Dulu, orang-orang sering memecah string URL menggunakan regex atau fungsi `split('?')` manual yang rawan rusak. :v

Untungnya di NodeJS, kita punya standar resmi **WHATWG URL API** lewat modul bawaan **`url`**!

---

## 1. Membedah Komponen URL

Kelas `URL` kini sudah tersedia secara global di NodeJS (mirip seperti di browser modern):

```javascript
const myUrl = new URL("https://ngodingkuy.site:8080/posts/nodejs/?kategori=backend&sort=terbaru#komentar");

console.info("Protocol :", myUrl.protocol); // "https:"
console.info("Hostname :", myUrl.hostname); // "ngodingkuy.site"
console.info("Port     :", myUrl.port);     // "8080"
console.info("Pathname :", myUrl.pathname); // "/posts/nodejs/"
console.info("Hash     :", myUrl.hash);     // "#komentar"
```

Semua bagian URL langsung terpetakan dengan sangat presisi tanpa perlu satu baris regex pun!

---

## 2. Memanipulasi Query Parameters: `URLSearchParams`

Bagian paling menyenangkan adalah properti `.searchParams`. Kita bisa membaca, menambah, mengubah, atau menghapus query parameter semudah memanipulasi objek:

```javascript
const link = new URL("https://api.contoh.com/cari?keyword=javascript&page=1");

// 1. Membaca nilai query
console.info(link.searchParams.get("keyword")); // "javascript"
console.info(link.searchParams.get("page"));    // "1"

// 2. Menambah query baru
link.searchParams.append("limit", "10");

// 3. Mengubah query yang sudah ada
link.searchParams.set("page", "2");

// 4. Menghapus query
link.searchParams.delete("keyword");

console.info(link.toString());
// Output: "https://api.contoh.com/cari?page=2&limit=10"
```

URL baru yang dihasilkan otomatis di-encode dengan benar jika mengandung spasi atau karakter khusus.

---

## 3. Mengubah Path File ke URL & Sebaliknya

Jika kalian menggunakan ES Modules (`import.meta.url`), kalian pasti sering butuh mengubah URL file ke format path lokal sistem operasi:

```javascript
import { fileURLToPath, pathToFileURL } from "url";

// Dari format file:///home/... ke path sistem /home/...
const pathBiasa = fileURLToPath(import.meta.url);
console.info("Path file saat ini:", pathBiasa);

// Dari path sistem ke format URL file://
const formatUrl = pathToFileURL("/var/www/index.html");
console.info("Format URL:", formatUrl.href);
```

Fungsi helper ini sangat berguna untuk menjaga kompatibilitas script kita antara sistem operasi Windows dan Linux.

---

Sekian catatan singkat mengenai modul `url` di NodeJS kali ini. Jangan lagi membedah URL pakai regex rumit ya, hehe...

Sampai jumpa di catatan _standard library_ berikutnya! :)
