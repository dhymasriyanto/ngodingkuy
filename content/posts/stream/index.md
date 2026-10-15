---
title: "Standard Library - Stream"
author: "dhymas"
date: 2022-02-09T17:40:00Z
draft: true
tags: ["stream", "nodejs", "io", "performance"]
categories: ["NodeJS"]
---

Halo semua, kembali lagi bersama _Author_ :')

Pernah ngga kalian membayangkan bagaimana cara server memproses file video atau file data raksasa berukuran 5 GB?

Kalau kita membaca seluruh file 5 GB itu sekaligus memakai `fs.readFile()`, maka RAM server kita bakal langsung tersedot habis 5 GB saat itu juga! Kalau ada 4 orang saja yang mengunduh bersamaan, server langsung mogok karena _Out of Memory_. :v

Solusi elegan untuk masalah ini adalah: **Stream**.

---

## Analogi: Galon Air vs Pipa Keran

- **Buffer biasa (`readFile`)**: Ibarat menampung seluruh air dalam satu kolam raksasa dulu, baru kemudian kita bawa sekaligus. Berat dan rawan tumpah.
- **Stream**: Ibarat aliran pipa air. Air dialirkan tetes demi tetes atau bita demi bita secara bertahap dari sumber ke tujuan. Ember penampungnya kecil saja, tapi airnya terus mengalir sampai selesai!

Dengan Stream, kita bisa mulai memproses potongan data pertama tanpa perlu menunggu seluruh file selesai dibaca.

---

## 4 Jenis Stream di NodeJS

1. **Readable Stream**: Aliran data yang hanya bisa kita baca (contoh: membaca file, request masuk di HTTP).
2. **Writable Stream**: Aliran data tempat kita menuliskan sesuatu (contoh: menulis file, respon keluar di HTTP).
3. **Duplex Stream**: Aliran data yang bisa dibaca sekaligus ditulis (contoh: koneksi TCP socket).
4. **Transform Stream**: Aliran Duplex yang bisa memodifikasi data saat data sedang lewat (contoh: proses kompresi gzip).

---

## Contoh Praktis: Membaca File dengan Readable Stream

Buat file bernama `stream-baca.mjs`:

```javascript
import fs from "fs";

// Buat aliran pembacaan file
const readableStream = fs.createReadStream("file-besar.txt", {
    highWaterMark: 16 * 1024 // Ukuran potongan chunk per pembacaan (16 KB)
});

let jumlahPotongan = 0;

// Readable stream adalah EventEmitter!
readableStream.on("data", (chunk) => {
    jumlahPotongan++;
    console.info(`Menerima chunk ke-${jumlahPotongan} sebesar ${chunk.length} bytes.`);
});

readableStream.on("end", () => {
    console.info("Selesai membaca seluruh file tanpa membuat RAM meledak! Hehe...");
});

readableStream.on("error", (err) => {
    console.error("Terjadi error:", err.message);
});
```

---

## Trik Paling Keren: Mengalirkan dengan `.pipe()`

Kalau kita mau menyalin file besar dari sumber ke tujuan, kita bahkan ngga perlu menulis event `on('data')` manual. Cukup hubungkan pipa pembaca ke pipa penulis menggunakan fungsi `.pipe()`:

```javascript
import fs from "fs";

const sumber = fs.createReadStream("video-intro.mp4");
const tujuan = fs.createWriteStream("video-copy.mp4");

// Hubungkan pipa sumber ke tujuan!
sumber.pipe(tujuan);

tujuan.on("finish", () => {
    console.info("Penyalinan file berhasil diselesaikan secara efisien!");
});
```

Sederhana banget kan? Di balik layar, NodeJS otomatis mengatur laju aliran data (_backpressure_) agar proses tulis tidak kewalahan menghadapi pembacaan data yang terlalu cepat.

---

Sekian dulu catatan mengenai _Stream_ di NodeJS kali ini. Kalau teman-teman membuat aplikasi yang sering upload/download file, wajib banget manfaatkan stream ini!

Sampai ketemu di catatan berikutnya! :)
