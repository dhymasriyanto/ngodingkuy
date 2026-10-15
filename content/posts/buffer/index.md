---
title: "Standard Library - Buffer"
author: "dhymas"
date: 2022-01-26T16:20:00Z
draft: true
tags: ["buffer", "nodejs", "binary", "library"]
categories: ["NodeJS"]
---

Halo semua, kembali lagi bersama _Author_ :')

Seperti yang sempat _Author_ janjikan di postingan [File System](/posts/file-system/), kali ini kita bakal membedah apa itu **Buffer** di NodeJS.

Catatan ini dibuat untuk arsip belajar saya pribadi... Silahkan disimak jika berkenan!

# <center> Apa itu Buffer? <center>

## Mangsudnya Buffer itu apa sih, _Thor_? :v

Secara sederhana, **Buffer** adalah wadah di memori komputer (RAM) yang digunakan untuk menampung sekumpulan data mentah dalam bentuk **biner (bita / bytes)**.

Di JavaScript browser jadul, kita ngga punya akses langsung ke data biner murni karena JavaScript awalnya cuma dirancang untuk manipulasi teks dan angka di web.

Tapi karena NodeJS berjalan di server, NodeJS wajib bisa berurusan dengan file gambar, video, file zip, kompresi, dan paket jaringan TCP. Nah, semua hal itu wujud aslinya adalah deretan biner hexadecimal! Itulah alasan NodeJS membuat objek `Buffer` secara global.

Uniknya, `Buffer` merupakan objek global, jadi kita bahkan ngga perlu menulis `import buffer from 'buffer'` untuk menggunakannya!

---

## 1. Membuat Buffer dari String

Kita bisa mengubah teks biasa menjadi sekumpulan bita menggunakan `Buffer.from()`:

```javascript
// Mengubah teks string menjadi Buffer biner
const buf = Buffer.from("Halo NgodingKuy!");

console.info(buf);
// Output berupa deretan hexadecimal:
// <Buffer 48 61 6c 6f 20 4e 67 6f 64 69 6e 67 4b 75 79 21>
```

Setiap dua digit heksadesimal di atas mewakili 1 bita (8 bit) kode ASCII karakter teks kita.

Untuk mengembalikannya lagi menjadi teks yang bisa dibaca manusia, kita cukup panggil fungsi `.toString()`:

```javascript
console.info(buf.toString()); // "Halo NgodingKuy!"
console.info(buf.toString("hex")); // Ditampilkan dalam format heksa murni
console.info(buf.toString("base64")); // Di-encode ke Base64!
```

Gampang banget kan kalau mau encode/decode ke Base64? Ngga perlu install library pihak ketiga lagi!

---

## 2. Mengalokasikan Buffer Kosong dengan `Buffer.alloc()`

Kalau kita butuh memori kosong berukuran tertentu untuk menampung aliran data (misal untuk transfer paket), kita gunakan `Buffer.alloc(ukuranBita)`:

```javascript
// Alokasikan memori kosong sebesar 10 byte
const kosong = Buffer.alloc(10);

console.info(kosong);
// <Buffer 00 00 00 00 00 00 00 00 00 00>

// Kita bisa isi byte demi byte atau tulis teks:
kosong.write("Kuy");
console.info(kosong);
// <Buffer 4b 75 79 00 00 00 00 00 00 00>
```

---

## 3. Menggabungkan Banyak Buffer: `Buffer.concat()`

Jika kita menerima potongan data (chunks) yang terpecah-pecah dari proses unduh file, kita bisa menyatukannya kembali menjadi satu buffer utuh:

```javascript
const part1 = Buffer.from("Ngoding ");
const part2 = Buffer.from("Kuy!");

const gabungan = Buffer.concat([part1, part2]);
console.info(gabungan.toString()); // "Ngoding Kuy!"
```

---

Sekian dulu catatan mengenai _Buffer_ di NodeJS kali ini. Sekarang teman-teman jadi paham kan kenapa kemarin saat membaca file dengan `fs.readFile()` tanpa encoding, yang keluar adalah objek `<Buffer ...>`.

Jika ada penjelasan yang kurang tepat, kolom komentar di bawah selalu terbuka ya! 

Sampai jumpa di catatan berikutnya! :)
