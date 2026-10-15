---
title: "Standard Library - Worker Threads"
author: "dhymas"
date: 2022-04-11T14:15:00Z
draft: true
tags: ["worker-threads", "nodejs", "threading", "performance"]
categories: ["NodeJS"]
---

Halo semua, kembali lagi bersama _Author_ :')

Inilah catatan penutup untuk rangkaian seri pembelajaran **NodeJS Standard Library** kita!

Salah satu kritik terbesar orang terhadap NodeJS di masa lalu adalah: *"NodeJS itu single-threaded, ngga cocok buat komputasi berat (CPU-intensive task)!"*

Kalau ada perhitungan matematika jutaan iterasi, seluruh server bakal macet dan request user lain ngga bisa masuk.

Tapi sejak kehadiran modul **`worker_threads`**, anggapan itu resmi dipatahkan! NodeJS sekarang memiliki dukungan resmi untuk komputasi paralel sejati memanfaatkan seluruh core prosesor di CPU kita.

---

## Bedanya `worker_threads` dengan `child_process`

- **`child_process`**: Melahirkan proses sistem operasi baru yang berdiri sendiri. Setiap proses punya alokasi memori RAM terpisah (isolasi penuh tapi boros memori).
- **`worker_threads`**: Melahirkan thread ringan di dalam satu proses yang sama. Thread-thread ini bisa saling berbagi memori (_SharedArrayBuffer_) sehingga jauh lebih hemat RAM dan sangat cepat dalam bertukar data!

---

## Contoh Praktis: Menghitung Angka Berat di Background Thread

Kita bisa menuliskan kode utama dan kode worker di dalam satu file yang sama menggunakan variabel `isMainThread`:

```javascript
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

if (isMainThread) {
    // KODE INI BERJALAN DI MAIN THREAD
    console.info("[Main Thread]: Menugaskan kalkulasi berat ke thread pekerja...");

    // Buat thread pekerja baru dari file ini
    const worker = new Worker(__filename, {
        workerData: { target: 1000000000 } // Hitung sampai 1 Milyar!
    });

    // Dengarkan hasil kiriman dari thread pekerja
    worker.on("message", (hasil) => {
        console.info(`[Main Thread]: Perhitungan selesai! Hasil: ${hasil}`);
    });

    worker.on("error", (err) => console.error("Worker error:", err));

    console.info("[Main Thread]: Server tetap responsif dan bisa melayani hal lain! :D");
} else {
    // KODE INI BERJALAN DI BACKGROUND WORKER THREAD
    const limit = workerData.target;
    let sum = 0;

    for (let i = 0; i < limit; i++) {
        sum += i;
    }

    // Kirim hasil kembali ke main thread
    parentPort.postMessage(sum);
}
```

Saat script ini dijalankan:
Main thread langsung selesai dan bebas melayani tugas lain, sementara thread pekerja di belakang layar sibuk membakar core CPU lain untuk menghitung sampai 1 milyar. Begitu selesai, hasilnya dikirim kembali dengan mulus tanpa ada lag sedetik pun di aplikasi utama!

---

## Kapan Harus Pakai Worker Threads?

- **Komputasi Matematika / Data Science berat**
- **Enkripsi / Kompresi file ukuran raksasa**
- **Manipulasi gambar (resize, filter, convert format)**

Untuk operasi I/O biasa (seperti query database, membaca file kecil, request API), tetap gunakan async/await biasa karena model Event Loop bawaan NodeJS sudah sangat optimal untuk itu.

---

# Penutup Seri NodeJS Standard Library

Alhamdulillah... Dengan catatan ini, lengkap sudah perjalanan arsip belajar kita membedah berbagai modul inti bawaan NodeJS: mulai dari arsitektur dasar, OS, Path, File System, Debugger, Buffer, Events, Stream, Timers, Process, URL, Crypto, Zlib, HTTP, Child Process, hingga Worker Threads!

Semoga seluruh rangkuman catatan dari _Author_ ini bisa bermanfaat buat teman-teman yang juga sedang mendalami backend JavaScript. 

Terima kasih banyak sudah menyimak dan mengikuti tulisan-tulisan di blog ini. Kalau ada saran atau ingin request topik lain, kolom komentar selalu terbuka lebar, ya!

Sampai ketemu di topik dan petualangan teknologi berikutnya! :)
