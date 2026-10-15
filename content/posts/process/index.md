---
title: "Standard Library - Process"
author: "dhymas"
date: 2022-02-22T09:45:00Z
draft: true
tags: ["process", "nodejs", "env", "system"]
categories: ["NodeJS"]
---

Halo semua, kembali lagi bersama _Author_ :')

Kali ini kita akan membedah salah satu objek paling berkuasa di NodeJS: objek **`process`**.

Sama seperti `Buffer`, objek `process` juga bersifat global. Objek ini menyediakan kontrol dan informasi mendalam mengenai aplikasi NodeJS kita yang sedang berjalan di sistem operasi.

---

## 1. Membaca Environment Variables: `process.env`

Ini adalah fitur yang paling sering kita gunakan sehari-hari, terutama untuk membaca konfigurasi port atau kredensial rahasia:

```javascript
// Membaca PORT dari sistem atau fallback ke 3000
const PORT = process.env.PORT || 3000;
const MODE = process.env.NODE_ENV || "development";

console.info(`Server berjalan di port: ${PORT} pada mode: ${MODE}`);
```

Kita bisa mengujinya di terminal dengan menyisipkan env sebelum perintah:
```shell
PORT=8080 NODE_ENV=production node app.mjs
```

---

## 2. Mengambil Argumen Terminal: `process.argv`

Kalian ingin membuat script CLI yang menerima parameter saat dipanggil di terminal? Gunakan `process.argv`:

```javascript
// Buat file bernama cli.mjs
const argumen = process.argv;

console.info(argumen);
```

Jika kita jalankan:
```shell
node cli.mjs --nama=Dhymas --role=Admin
```

Maka `process.argv` akan menghasilkan array:
- `argv[0]`: Lokasi path binary `node`
- `argv[1]`: Lokasi file script `cli.mjs`
- `argv[2]` dst: Parameter kita (`--nama=Dhymas`, `--role=Admin`)

Kita bisa memotong dua elemen pertama menggunakan `process.argv.slice(2)` untuk mengambil input murni dari pengguna!

---

## 3. Menutup Program & Exit Code: `process.exit()`

Kita bisa menghentikan paksa jalannya program NodeJS kapanpun:

```javascript
if (!process.env.DATABASE_URL) {
    console.error("FATAL: DATABASE_URL tidak ditemukan!");
    process.exit(1); // 1 menandakan program berhenti karena error
}

// process.exit(0) digunakan jika program selesai dengan sukses tanpa kendala.
```

---

## 4. Menangkap Sinyal OS: Graceful Shutdown

Saat kita menekan `Ctrl + C` di terminal atau server Docker dimatikan, sistem operasi akan mengirimkan sinyal `SIGINT` atau `SIGTERM`.

Kita bisa menangkap sinyal tersebut agar aplikasi kita bisa menutup koneksi database dengan rapi sebelum benar-benar mati:

```javascript
process.on("SIGINT", () => {
    console.info("
Menerima sinyal Ctrl+C... Sedang merapikan data...");
    // Tutup koneksi database atau socket di sini
    setTimeout(() => {
        console.info("Aplikasi ditutup dengan aman. Bye!");
        process.exit(0);
    }, 1000);
});
```

Coba jalankan dan tekan `Ctrl + C`, maka NodeJS tidak akan langsung terbunuh secara kasar!

---

Objek `process` adalah jembatan vital antara kode JavaScript kita dengan sistem operasi di bawahnya. 

Sekian catatan kali ini, semoga bermanfaat buat teman-teman semua! Sampai ketemu di bahasan selanjutnya! :)
