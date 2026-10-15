---
title: "Standard Library - Events"
author: "dhymas"
date: 2022-02-02T11:15:00Z
draft: true
tags: ["events", "eventemitter", "nodejs", "library"]
categories: ["NodeJS"]
---

Halo semua, kembali lagi bersama _Author_ :')

Kalian tahu ngga kalau hampir sebagian besar arsitektur inti NodeJS dibangun di atas konsep **Event-Driven**? 

Mulai dari server HTTP, file stream, hingga socket jaringan, semuanya berkomunikasi lewat sinyal _event_.

Dan di balik itu semua, ada sebuah modul fondasi bernama **`events`** dengan kelas utamanya: **`EventEmitter`**.

---

## Analogi Sederhana: Bel Rumah & Tamu

Bayangkan sebuah bel pintu rumah:
1. Pemilik rumah memasang telinga / bel: *"Kalau ada yang mencet bel, saya bakal buka pintu"* (ini namanya **Listener** / `on`).
2. Tamu datang lalu memencet tombol bel (ini namanya **Trigger** / `emit`).
3. Seketika suara bel berbunyi dan pemilik rumah langsung menyambut tamu.

Itulah cara kerja `EventEmitter`. Suatu objek bisa membunyikan sinyal event, dan fungsi lain yang mendengarkan sinyal tersebut akan otomatis dieksekusi.

---

## Penerapan Kode: Membuat & Mendengarkan Event

Mari kita buat file contoh `events-demo.mjs`:

```javascript
import { EventEmitter } from "events";

// 1. Buat instance EventEmitter
const emitter = new EventEmitter();

// 2. Pasang pendengar (listener) untuk event bernama 'pesanan-selesai'
emitter.on("pesanan-selesai", (namaMenu, nomorMeja) => {
    console.info(`[Dapur]: Pesanan ${namaMenu} untuk Meja ${nomorMeja} sudah siap diantar!`);
});

// 3. Kita juga bisa pasang lebih dari satu listener untuk event yang sama:
emitter.on("pesanan-selesai", (namaMenu, nomorMeja) => {
    console.info(`[Kasir]: Cetak struk pembayaran untuk Meja ${nomorMeja}.`);
});

// 4. Picu (emit) event tersebut!
console.info("Sedang memasak...");
emitter.emit("pesanan-selesai", "Nasi Goreng Spesial", 7);
```

Jika dijalankan dengan `node events-demo.mjs`, kedua listener di atas akan otomatis dipanggil secara berurutan saat `emitter.emit()` ditembakkan!

---

## Mendengarkan Hanya Sekali: `.once()`

Kalau kita cuma ingin mendengar suatu event **tepat satu kali saja** (misalnya event koneksi database pertama kali berhasil tersambung), gunakan method `.once()` alih-alih `.on()`:

```javascript
emitter.once("koneksi-pertama", () => {
    console.info("Koneksi berhasil dibuat! (Pesan ini hanya muncul 1x)");
});

emitter.emit("koneksi-pertama"); // Dieksekusi
emitter.emit("koneksi-pertama"); // Diabaikan!
```

---

## Membuat Class Custom Turunan `EventEmitter`

Dalam praktek pembuatan aplikasi nyata, kita sering mewarisi class `EventEmitter` ke dalam modul buatan kita sendiri:

```javascript
import { EventEmitter } from "events";

class UserRegistrasi extends EventEmitter {
    daftar(username, email) {
        console.info(`Mendaftarkan user: ${username}...`);
        // Simpan ke database di sini...

        // Tembakkan event setelah selesai!
        this.emit("registered", { username, email });
    }
}

const auth = new UserRegistrasi();

// Kirim email sambutan saat event registered terjadi
auth.on("registered", (user) => {
    console.info(`Mengirimkan email verifikasi ke: ${user.email}`);
});

auth.daftar("dhymas", "gojin003@gmail.com");
```

Struktur kode kita jadi sangat rapi dan tidak saling bertumpuk (loose coupling).

---

Sekian catatan singkat mengenai modul `events` di NodeJS. Konsep ini wajib banget dipahami karena nanti saat kita belajar `stream` dan `http`, semuanya memakai EventEmitter!

Sampai ketemu di tulisan selanjutnya! :)
