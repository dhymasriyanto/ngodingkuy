---
title: "Standard Library - HTTP"
author: "dhymas"
date: 2022-03-24T17:25:00Z
draft: true
tags: ["http", "nodejs", "server", "web"]
categories: ["NodeJS"]
---

Halo semua, kembali lagi bersama _Author_ :')

Kalau kita bicara soal NodeJS, inilah modul yang paling legendaris dan menjadi cikal bakal kepopuleran NodeJS di seluruh dunia: modul **`http`**!

Tanpa perlu menginstal Apache, Nginx, atau framework seperti Express, NodeJS sudah mampu bertindak sebagai Web Server murni berkinerja tinggi hanya dengan modul bawaan ini.

---

## 1. Membuat Web Server Pertama Kita

Coba buat file bernama `server-dasar.mjs`:

```javascript
import http from "http";

// Buat server HTTP
const server = http.createServer((req, res) => {
    // 1. Set status code dan header respon
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });

    // 2. Kirim konten ke browser
    res.end("<h1>Halo dari Server NodeJS Tanpa Framework! :')</h1>");
});

// Jalankan server di port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.info(`Server aktif dan siap melayani di http://localhost:${PORT}`);
});
```

Jalankan dengan `node server-dasar.mjs`, lalu buka browser kalian di `http://localhost:3000`. Seketika halaman web sederhana kalian sudah aktif melayani pengunjung!

---

## 2. Membuat Routing & API JSON Sederhana

Objek `req` adalah _Readable Stream_ yang menyimpan informasi request pengunjung (seperti method dan URL), sedangkan `res` adalah _Writable Stream_ untuk mengirim jawaban balik:

```javascript
import http from "http";

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (url === "/" && method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Selamat datang di Home Page NgodingKuy!");
    } else if (url === "/api/users" && method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const data = [
            { id: 1, nama: "Dhymas", role: "Author" },
            { id: 2, nama: "Pitori", role: "Editor" }
        ];
        res.end(JSON.stringify(data));
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Halaman Tidak Ditemukan! :v");
    }
});

server.listen(3000, () => console.info("API Server running on port 3000"));
```

Framework populer seperti Express.js sebenarnya hanyalah pembungkus manis (_wrapper_) di atas callback `http.createServer()` ini!

---

## 3. Melakukan HTTP Request ke Server Lain

Selain menjadi server, modul `http` juga bisa bertindak sebagai client untuk menembak endpoint luar:

```javascript
import http from "http";

http.get("http://jsonplaceholder.typicode.com/posts/1", (res) => {
    let data = "";

    // Data diterima dalam bentuk stream chunk!
    res.on("data", (chunk) => {
        data += chunk;
    });

    res.on("end", () => {
        console.info("Hasil respon API eksternal:", JSON.parse(data));
    });
}).on("error", (err) => {
    console.error("Gagal request:", err.message);
});
```

---

Memahami cara kerja modul `http` murni ini akan membuat kalian jauh lebih jago saat menggunakan framework apapun nanti, karena kalian tahu apa yang sebenarnya terjadi di bawah kap mesin.

Sekian dulu catatan dari _Author_ kali ini. Semoga bermanfaat, dan sampai jumpa di catatan berikutnya! :)
