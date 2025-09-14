---
title: "Membuat API JWT dengan Cookie di Laravel 10"
category: "Laravel"
author: hilmy-haidar
date: 2024-03-12
description: "Sebuah cara untuk membuat API yang menggunakan JSON Web Token (JWT) untuk autentikasi dan menggunakan Cookie untuk menyimpan token"
slug: api-jwt-with-cookie-laravel
draft: false
tags: ["laravel", "sanctum", "jwt", "cookie"]
reference: "https://laravel.com/"
relatedPosts: []
---

## Table of Contents

- [Apa sih API JWT dengan Cookie di Laravel 10?](#apa-sih-api-jwt-dengan-cookie-di-laravel-10)
- [Cara Membuat API JWT dengan Cookie di Laravel 10](#cara-membuat-api-jwt-dengan-cookie-di-laravel-10)
  - [Install Laravel 10](#install-laravel-10)
  - [Install Package Sanctum](#install-package-sanctum)
  - [Membuat controller untuk autentikasi](#membuat-controller-untuk-autentikasi)
- [Routing untuk otentikasi API](#routing-untuk-otentikasi-api)
- [Test Dengan Postman](#test-dengan-postman)
  - [Register User](#register-user)
  - [Route untuk mendapatkan user yang sedang login](#route-untuk-mendapatkan-user-yang-sedang-login)
- [Kesimpulan](#kesimpulan)

<!-- ![Code](https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8Y29kaW5nfHx8fHx8MTcxMDE1MjUwNw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1920) -->

<br></br>

[![Laravel](https://img.shields.io/badge/Laravel-10-red?style=for-the-badge&logo=laravel)](https://laravel.com/)

# Apa sih API JWT dengan Cookie di Laravel 10?

API JWT dengan Cookie di Laravel 10 adalah sebuah cara untuk membuat API yang menggunakan JSON Web Token (JWT) untuk autentikasi dan menggunakan Cookie untuk menyimpan token. JWT adalah sebuah standar terbuka yang mendefinisikan cara untuk mentransmisikan informasi yang aman antara dua pihak. JWT biasanya digunakan untuk autentikasi dan pertukaran informasi antara aplikasi klien dan server. Dengan menggunakan JWT, kita bisa membuat API yang aman dan efisien.

Laravel 10 adalah sebuah framework PHP yang populer untuk membuat aplikasi web. Laravel 10 memiliki banyak fitur yang memudahkan kita untuk membuat API yang aman dan efisien. Dengan menggunakan Laravel 10, kita bisa membuat API JWT dengan Cookie dengan mudah dan cepat.

API JWT dengan Cookie di Laravel 10 memiliki beberapa keuntungan, antara lain:

- Keamanan
- Efisiensi
- Mudah digunakan
- Mudah diintegrasikan dengan aplikasi web dan mobile

<br></br>

# Cara Membuat API JWT dengan Cookie di Laravel 10

Berikut adalah langkah-langkah untuk membuat API JWT dengan Cookie di Laravel 10:

## Install Laravel 10

Pertama, kita perlu menginstall Laravel 10. Kita bisa menginstall Laravel 10 dengan menggunakan composer. Berikut adalah perintah untuk menginstall Laravel 10:

```bash
composer create-project laravel/laravel myapp
```

## Install Package Sanctum

Setelah kita menginstall Laravel 10, kita perlu menginstall package Sanctum. Package Sanctum adalah package yang digunakan untuk membuat API JWT dengan Cookie di Laravel 10. Berikut adalah perintah untuk menginstall package Sanctum:

```bash
composer require laravel/sanctum
```

kemudian, kamu perlu publish konfigurasi Sanctum dengan menggunakan perintah `vendor:publish`. konfigurasi ini akan disimpan di `config/sanctum.php`.

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

Setelah itu, kamu perlu menjalankan migrasi untuk membuat tabel-tabel yang diperlukan oleh Sanctum.

```bash
php artisan migrate
```

Pada model `User`, kamu perlu menambahkan trait `HasApiTokens` untuk menggunakan Sanctum.

```php
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Code
}
```

## Membuat controller untuk autentikasi

Setelah kita menginstall package Sanctum, kita perlu membuat controller untuk autentikasi

Jalankan perintah berikut untuk membuat controller `API/AuthController`:

```bash
php artisan make:controller API/AuthController
```

Kaitkan controller dengan model `User` dan import beberapa class yang diperlukan.

```php
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
```

Fungsi `register` untuk mendaftarkan user baru sekaligus memberi token ke user tersebut.

```php
public function register(Request $request)
{
    $user = User::create([
        'username' => $request->username,
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    $token = $user->createToken('token')->plainTextToken;

    $cookie = cookie('jwt', $token, 60 * 48); // 2 day

    return response([
        'status' => 'success',
        'message' => $token
    ])->withCookie($cookie);
}
```

Fungsi `login` untuk login user dan memberi token ke user

```php
public function login(Request $request)
{
    if (!Auth::attempt($request->only('username', 'password'))) {
        return response([
            'status' => 'error',
            'message' => 'Invalid credentials'
        ], 401);
    }

    $user = Auth::user();

    $token = $user->createToken('token')->plainTextToken;

    $cookie = cookie('jwt', $token, 60 * 48); // 2 day

    return response([
        'status' => 'success',
        'message' => $token
    ])->withCookie($cookie);
}
```

Fungsi `logout` untuk logout user dan menghapus token dari user

```php
public function logout()
{
    $cookie = Cookie::forget('jwt');

    return response([
        'status' => 'success',
        'message' => 'Token deleted'
    ])->withCookie($cookie);
}
```

<br></br>

# Routing untuk otentikasi API

Apa itu routing? Routing adalah cara untuk menentukan URL mana yang akan diarahkan ke controller mana.

Pada file `routes/api.php`, tambahkan routing untuk autentikasi API.

```php
// Route untuk register user
Route::post('/register', [App\Http\Controllers\API\AuthController::class, 'register']);
// Route untuk login user
Route::post('/login', [App\Http\Controllers\API\AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // Route untuk mendapatkan user yang sedang login
    Route::get('/user', [App\Http\Controllers\API\AuthController::class, 'user']);
    // Route untuk logout user
    Route::post('/logout', [App\Http\Controllers\API\AuthController::class, 'logout']);
});
```

<br></br>

# Test Dengan Postman

Setelah kita membuat API JWT dengan Cookie di Laravel 10, kita bisa mencoba API tersebut dengan menggunakan Postman. Postman adalah sebuah aplikasi yang digunakan untuk menguji API. Berikut adalah langkah-langkah untuk mencoba API JWT dengan Cookie di Laravel 10 dengan menggunakan Postman:

## Register User

Pertama, kita perlu mendaftarkan user baru. Kita bisa mendaftarkan user baru dengan menggunakan endpoint `/register`. Berikut adalah langkah-langkahnya:

- Buka Postman
- Pilih method `POST`
- Masukkan URL `http://tg-connect-rest.test/api/register`
- Masukkan body dengan format `x-www-form-urlencoded` dan isi dengan data user yang ingin didaftarkan (username, name, email, password) dengan format JSON
  Contoh:
  ```json
  {
    "username": "haidar",
    "name": "Haidar",
    "email": "haidar@email.com",
    "password": "password"
  }
  ```
- Klik `Send`

  Jika berhasil, maka kita akan mendapatkan token yang disimpan di cookie. Berikut adalah contoh responsenya:

  ```json
  {
    "status": "success",
    "message": "1|IJwniShhh8r7jCMT0jqatS2ZDXdXnJKMXZxaC2F887afd0f1"
  }
  ```

## Route untuk mendapatkan user yang sedang login

Setelah kita mendaftarkan user baru, kita bisa mencoba route untuk mendapatkan user yang sedang login. Kita bisa mencoba route tersebut dengan menggunakan endpoint `/user`. Berikut adalah langkah-langkahnya:

- Buka Postman
- Pilih method `GET`
- Masukkan URL `http://tg-connect-rest.test/api/user`
- Klik `Send`

  Jika berhasil, maka kita akan mendapatkan data user yang sedang login, berikut adalah contoh responsenya:

  ```json
  {
    "id": 1,
    "username": "haidar",
    "name": "Haidar",
    "email": "haidar@email.com",
    "email_verified_at": null,
    "created_at": "2024-03-10T17:05:57.000000Z",
    "updated_at": "2024-03-10T17:05:57.000000Z"
  }
  ```

<br></br>

# Kesimpulan

API JWT dengan Cookie di Laravel 10 adalah sebuah cara untuk membuat API yang menggunakan JSON Web Token (JWT) untuk autentikasi dan menggunakan Cookie untuk menyimpan token. Dengan menggunakan Laravel 10 dan package Sanctum, kita bisa membuat API JWT dengan Cookie dengan mudah dan cepat. API JWT dengan Cookie di Laravel 10 memiliki beberapa keuntungan, antara lain keamanan, efisiensi, mudah digunakan, dan mudah diintegrasikan dengan aplikasi web dan mobile. Dengan menggunakan Postman, kita bisa mencoba API JWT dengan Cookie di Laravel 10 dengan mudah dan cepat.

Terima kasih telah membaca artikel ini, semoga bermanfaat👍👍
