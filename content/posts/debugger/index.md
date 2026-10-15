---
title: "Standard Library - Debugger"
author: "dhymas"
date: 2022-01-21T14:35:10+07:00
draft: false
tags: ["debugger", "nodejs", "javascript", "library"]
categories: ["NodeJS"]
---

Halo semua, kembali lagi bersama _Author_ :')

Postingan kali ini melanjutkan catatan tentang _standard library_ bawaan NodeJS. Silahkan dibaca jika berkenan, semoga bermanfaat!

# <center> Mengenal Debugger di NodeJS <center>

## Jangan Cuma Andalkan `console.log()` Mulu, _Thor_... :v

Siapa di sini yang kalau ada _bug_ di aplikasinya, langsung nebar puluhan baris `console.log("sampe sini 1")`, `console.log("sampe sini 2")`? Wkwk...

Ngga salah sih, _Author_ dulu juga sering banget begitu. Tapi kalau kodenya udah mulai kompleks dan bercabang banyak, cara itu malah bikin layar terminal penuh sampah dan pusing sendiri.

Untungnya, NodeJS secara _default_ sudah menyediakan _standard library_ **Debugger** untuk membantu kita melakukan _debugging_ kode baris per baris tanpa perlu _install tool_ tambahan.

---

## Cara Menggunakan Kata Kunci `debugger`

Untuk menandai titik di mana kode kita harus berhenti (dikenal dengan istilah _breakpoint_), kita cukup menuliskan kata kunci `debugger;` di dalam kode JavaScript kita.

Contoh, buat file bernama `debug-test.mjs`:

```javascript
function hitungTotal(harga, jumlah) {
    debugger; // Eksekusi akan dijeda di sini!
    const subtotal = harga * jumlah;
    const diskon = subtotal * 0.1;
    debugger; // Jeda kedua untuk memeriksa nilai diskon
    return subtotal - diskon;
}

const totalBelanja = hitungTotal(50000, 3);
console.info(`Total bayar: ${totalBelanja}`);
```

---

## Menjalankan Script dengan Mode Inspect

Jika kita menjalankan file tersebut hanya dengan perintah biasa `node debug-test.mjs`, maka kata kunci `debugger;` akan diabaikan begitu saja.

Agar debugger-nya aktif, jalankan menggunakan argumen `inspect`:

```shell
node inspect debug-test.mjs
```

Maka NodeJS akan membuka _debug console_ interaktif:

```text
< Debugger listening on ws://127.0.0.1:9229/...
< For help, see: https://nodejs.org/en/docs/inspector
Connecting to 127.0.0.1:9229 ... ok
break in debug-test.mjs:1
> 1 function hitungTotal(harga, jumlah) {
  2     debugger;
  3     const subtotal = harga * jumlah;
debug>
```

Beberapa perintah navigasi utama di CLI debugger:
- `c` (cont / continue): Melanjutkan eksekusi sampai menemukan titik `debugger` berikutnya.
- `n` (next): Menjalankan baris berikutnya (step over).
- `s` (step): Masuk ke dalam fungsi (step into).
- `o` (out): Keluar dari fungsi saat ini (step out).
- `repl`: Membuka REPL interaktif untuk melihat dan memanipulasi variabel secara langsung saat program sedang berhenti!

Ketik `repl`, lalu ketik nama variabel seperti `harga` atau `subtotal` untuk mengecek nilainya saat itu juga.

---

## Debugging Lewat Google Chrome (Lebih Nyaman!)

Kalau kalian kurang nyaman _debugging_ lewat CLI terminal hitam putih, kita bisa pakai Chrome DevTools, loh!

Jalankan script dengan:

```shell
node --inspect-brk debug-test.mjs
```

Lalu buka browser Chrome, dan akses alamat:
`chrome://inspect`

Klik tombol **inspect** pada target NodeJS yang terdeteksi. Seketika layar visual DevTools yang biasa kita pakai di _frontend_ akan terbuka lengkap dengan panel _Call Stack_, _Scope Variable_, dan tombol _Resume/Step Over_. Keren banget kan?

---

Sekian catatan singkat dari _Author_ mengenai _debugger_ bawaan NodeJS kali ini. Semoga membantu teman-teman dalam mencari akar masalah _bug_ tanpa harus banjir `console.log()` lagi, hehe...

Sampai ketemu di postingan _standard library_ berikutnya! :)
