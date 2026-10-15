---
title: "Standard Library - Zlib"
author: "dhymas"
date: 2022-03-16T13:10:00Z
draft: true
tags: ["zlib", "compression", "nodejs", "library"]
categories: ["NodeJS"]
---

Halo semua, kembali lagi bersama _Author_ :')

Pernah melihat respon HTTP di browser yang memiliki header `Content-Encoding: gzip`? 

Teknik kompresi data tersebut sangat krusial di dunia web karena mampu menyusutkan ukuran file HTML, CSS, atau JSON hingga 70–80% lebih kecil sebelum dikirim lewat jaringan internet. Efeknya? Website terbuka jauh lebih ngebut dan hemat kuota!

Di NodeJS, kita bisa melakukan kompresi dan dekompresi data dengan sangat mudah memakai modul bawaan: **`zlib`**.

---

## 1. Kompresi Sederhana dengan Buffer

Jika ukuran datanya kecil (misal payload teks JSON), kita bisa kompres langsung secara asinkron:

```javascript
import zlib from "zlib";

const dataAsli = "Ngoding Kuy! Belajar NodeJS bersama Author. ".repeat(50);
console.info("Ukuran asli:", Buffer.byteLength(dataAsli), "bytes");

// Kompres data menggunakan algoritma Gzip
zlib.gzip(dataAsli, (err, bufferTerkompres) => {
    if (err) throw err;

    console.info("Ukuran setelah di-gzip:", bufferTerkompres.length, "bytes");

    // Dekompresi kembali ke bentuk awal:
    zlib.gunzip(bufferTerkompres, (err, bufferHasil) => {
        if (err) throw err;
        console.info("Hasil kembali ke teks asli:", bufferHasil.toString().slice(0, 30), "...");
    });
});
```

Perhatikan bagaimana ukurannya menyusut drastis setelah dipadatkan oleh algoritma Gzip!

---

## 2. Mengompres File Raksasa dengan Stream Pipeline

Ingat pembahasan kita tentang [Stream](/posts/stream/)? Modul `zlib` menyediakan _Transform Stream_ bernama `createGzip()` yang bisa kita satukan langsung ke dalam pipa aliran file:

```javascript
import fs from "fs";
import zlib from "zlib";
import { pipeline } from "stream";

const sumber = fs.createReadStream("log-server.txt");
const tujuan = fs.createWriteStream("log-server.txt.gz");
const gzip = zlib.createGzip();

// Alirkan: file asli -> kompresi gzip -> simpan ke file .gz
pipeline(sumber, gzip, tujuan, (err) => {
    if (err) {
        console.error("Proses kompresi gagal:", err);
    } else {
        console.info("File log berhasil dikompresi menjadi file .gz!");
    }
});
```

Dengan metode pipeline di atas, kita bisa mengompresi file log berukuran beberapa Gigabyte sekalipun tanpa membuat RAM server kepenuhan.

---

Modul `zlib` adalah senjata andalan untuk optimasi bandwidth server dan arsip data.

Sekian catatan kali ini dari _Author_. Semoga bermanfaat buat teman-teman semua! Sampai ketemu di tulisan selanjutnya! :)
