---
title: "Standard Library - Crypto"
author: "dhymas"
date: 2022-03-09T18:30:00Z
draft: true
tags: ["crypto", "nodejs", "security", "hashing"]
categories: ["NodeJS"]
---

Halo semua, kembali lagi bersama _Author_ :')

Keamanan adalah aspek paling krusial saat kita membangun aplikasi di sisi server. 

Mulai dari hashing password, pembuatan token sesi acak, tanda tangan digital, hingga enkripsi data sensitif pengguna.

Semua kebutuhan kriptografi tersebut sudah disediakan secara lengkap dan teruji di NodeJS melalui _standard library_ **`crypto`**!

---

## 1. Membuat Hashing (SHA-256)

Hash adalah proses mengubah data menjadi deretan karakter acak berukuran tetap yang sifatnya **satu arah (one-way)**. Data yang sudah di-hash tidak bisa dikembalikan ke bentuk aslinya.

```javascript
import crypto from "crypto";

const teksRahasia = "PasswordSuperAman123";

// Buat hash SHA-256
const hasilHash = crypto
    .createHash("sha256")
    .update(teksRahasia)
    .digest("hex");

console.info("Hasil SHA-256:");
console.info(hasilHash);
// Output berupa 64 karakter heksadesimal yang unik!
```

Setiap kali inputnya sama persis, output hash-nya akan selalu identik. Namun jika berubah 1 huruf saja, seluruh outputnya akan berubah total.

---

## 2. Membuat HMAC (Hash Berbasis Kunci Rahasia)

HMAC sering dipakai untuk memverifikasi keaslian webhook (seperti saat menerima notifikasi pembayaran dari payment gateway):

```javascript
import crypto from "crypto";

const secretKey = "kunci-rahasia-server-author";
const payload = JSON.stringify({ transaksiId: 991, status: "LUNAS" });

const hmac = crypto
    .createHmac("sha256", secretKey)
    .update(payload)
    .digest("hex");

console.info("Tanda tangan HMAC:", hmac);
```

Pihak penerima yang memegang `secretKey` yang sama bisa mencocokkan HMAC tersebut untuk memastikan data tidak dipalsukan di tengah jalan oleh hacker.

---

## 3. Menghasilkan Random UUID & String Acak Aman

Butuh membuat token reset password atau UUID unik tanpa perlu install library pihak ketiga seperti `uuid`?

Gunakan fungsi bawaan `crypto.randomUUID()`:

```javascript
import crypto from "crypto";

// Menghasilkan UUID v4 standar
const idUnik = crypto.randomUUID();
console.info("ID Transaksi:", idUnik);
// Contoh: 'c9a646d3-9c61-4cc9-8130-97ebc9735d64'

// Menghasilkan bita acak berkekuatan kriptografis (misal untuk token sesi)
const tokenAcak = crypto.randomBytes(32).toString("hex");
console.info("Token Sesi:", tokenAcak);
```

---

Sekian catatan singkat mengenai dasar-dasar modul `crypto` di NodeJS kali ini. Sangat lengkap dan kita tidak perlu ketergantungan library luar lagi untuk sekadar hashing atau membuat UUID!

Sampai ketemu di catatan berikutnya! :)
