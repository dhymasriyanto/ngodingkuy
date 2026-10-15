---
title: "Standard Library - Child Process"
author: "dhymas"
date: 2022-04-02T10:40:00Z
draft: true
tags: ["child-process", "nodejs", "terminal", "system"]
categories: ["NodeJS"]
---

Halo semua, kembali lagi bersama _Author_ :')

Pernahkah kalian membutuhkan aplikasi NodeJS kalian untuk mengeksekusi perintah terminal sistem operasi secara otomatis? 

Misalnya: menjalankan perintah `git status`, mengonversi video lewat `ffmpeg`, atau menjalankan script Python dari dalam NodeJS?

Semua kemampuan luar biasa tersebut bisa kita kendalikan melalui _standard library_ **`child_process`**!

---

## 4 Metode Utama di `child_process`

NodeJS menyediakan empat fungsi utama dengan karakteristik masing-masing:

1. **`exec`**: Menjalankan perintah di dalam sub-shell terminal dan menampung seluruh outputnya ke dalam buffer (cocok untuk perintah ringan).
2. **`execFile`**: Menjalankan file biner secara langsung tanpa membuka shell (lebih aman dari serangan injeksi shell).
3. **`spawn`**: Menjalankan proses dengan aliran data _Stream_ (sangat ideal untuk proses yang memuntahkan banyak data atau berjalan lama).
4. **`fork`**: Varian khusus dari `spawn` untuk melahirkan instance NodeJS baru lengkap dengan saluran komunikasi IPC (_Inter-Process Communication_).

---

## 1. Menjalankan Perintah Ringan dengan `exec`

Contoh menjalankan perintah shell:

```javascript
import { exec } from "child_process";

exec("uname -a", (error, stdout, stderr) => {
    if (error) {
        console.error(`Terjadi error eksekusi: ${error.message}`);
        return;
    }
    if (stderr) {
        console.warn(`Peringatan stderr: ${stderr}`);
        return;
    }
    console.info(`Informasi Kernel Sistem Operasi:
${stdout}`);
});
```

---

## 2. Mengalirkan Data Proses Besar dengan `spawn`

Jika proses menghasilkan output besar (misal proses render atau build), jangan pakai `exec` karena bisa melebihi batas buffer. Pakai `spawn`:

```javascript
import { spawn } from "child_process";

// Menjalankan perintah: ping -c 4 google.com
const pingProcess = spawn("ping", ["-c", "4", "google.com"]);

// Tangkap output baris per baris secara real-time!
pingProcess.stdout.on("data", (data) => {
    console.info(`[Ping Output]: ${data.toString().trim()}`);
});

pingProcess.on("close", (code) => {
    console.info(`Proses ping selesai dengan exit code: ${code}`);
});
```

Output terminal akan langsung mengalir detik demi detik ke layar kita!

---

## 3. Komunikasi Antar Proses dengan `fork`

`fork` memungkinkan kita menjalankan script NodeJS terpisah di latar belakang dan saling berkirim pesan objek JavaScript via `.send()` dan `.on('message')`:

```javascript
// main.mjs
import { fork } from "child_process";

const worker = fork("sub-tugas.mjs");

// Kirim data pekerjaan ke anak proses
worker.send({ angka: 42 });

// Terima hasil olahan dari anak proses
worker.on("message", (hasil) => {
    console.info("Menerima jawaban dari worker:", hasil);
});
```

---

Dengan modul `child_process`, batas kemampuan NodeJS menjadi hampir tak terbatas karena kita bisa mengorkestrasi program apapun yang terpasang di sistem operasi server kita!

Sekian catatan kali ini, semoga menambah wawasan kita bersama. Sampai ketemu di catatan penutup berikutnya! :)
