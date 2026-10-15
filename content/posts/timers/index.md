---
title: "Standard Library - Timers"
author: "dhymas"
date: 2022-02-14T20:10:00Z
draft: true
tags: ["timers", "nodejs", "eventloop", "async"]
categories: ["NodeJS"]
---

Halo semua, kembali lagi bersama _Author_ :')

Di JavaScript browser, kita sudah terbiasa dengan `setTimeout` dan `setInterval`. 

Tapi di NodeJS, ada dua fungsi penjadwalan antrean yang sangat unik dan sering ditanyakan saat interview: **`setImmediate`** dan **`process.nextTick`**.

_Mangsudnya_ apa sih bedanya? Yuk kita bedah!

---

## 1. `setImmediate()` vs `setTimeout(..., 0)`

`setImmediate` dirancang khusus di NodeJS untuk mengeksekusi kode pada fase **Check** di putaran _Event Loop_ berikutnya, tepat setelah fase I/O polling selesai.

```javascript
setImmediate(() => {
    console.info("Dieksekusi lewat setImmediate!");
});

setTimeout(() => {
    console.info("Dieksekusi lewat setTimeout!");
}, 0);
```

Jika dijalankan di root script biasa, urutan keduanya bisa berubah-ubah tergantung performa CPU saat itu. Tapi jika dipanggil di dalam proses I/O (seperti di dalam callback `fs.readFile`), maka `setImmediate` **selalu menang** dan dieksekusi lebih dulu daripada `setTimeout(fn, 0)`.

---

## 2. Sang Juara Antrean: `process.nextTick()`

Meskipun secara teknis `process.nextTick` bukan bagian dari modul `timers`, perilakunya sangat erat kaitannya.

`process.nextTick` **bukan bagian dari fase Event Loop**. Dia memiliki antrean mikro khusus yang disebut _Microtask Queue_.

Artinya: apapun fungsi yang kalian daftarkan di `process.nextTick`, fungsi tersebut akan dieksekusi **secepat mungkin** tepat setelah operasi sinkron saat ini selesai, mendahului semua timer dan I/O event lainnya!

Mari kita buktikan dengan tes urutan ini:

```javascript
setTimeout(() => {
    console.info("3. setTimeout dipanggil");
}, 0);

setImmediate(() => {
    console.info("4. setImmediate dipanggil");
});

process.nextTick(() => {
    console.info("2. process.nextTick dipanggil mendahului timer!");
});

console.info("1. Kode sinkron utama selesai.");
```

Jika dijalankan dengan `node test.mjs`, outputnya:
1. `1. Kode sinkron utama selesai.`
2. `2. process.nextTick dipanggil mendahului timer!`
3. `3. setTimeout dipanggil`
4. `4. setImmediate dipanggil`

---

## Peringatan Bahaya `process.nextTick`

Jangan pernah melakukan pemanggilan rekursif tanpa henti di dalam `process.nextTick`. 

Karena dia selalu memotong antrean, Event Loop NodeJS kalian akan kelaparan (_starvation_) dan semua proses I/O seperti koneksi database atau request HTTP akan terhenti total! :v

Gunakan `process.nextTick` hanya saat kalian benar-benar perlu mengeksekusi callback setelah fungsi sinkron kembali namun sebelum ada I/O baru yang berjalan.

---

Sekian catatan singkat mengenai antrean waktu di NodeJS. Semoga ngga bingung lagi ya membedakan kapan memakai `nextTick` dan `setImmediate`!

Sampai ketemu di catatan berikutnya! :)
