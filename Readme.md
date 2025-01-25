
# Monitoring Kendaraan

## Alur Penggunaan Aplikasi (Pengajuan Pemakaian Kendaraan)
- Driver menuju ke bagian admin untuk melakukan request penggunaan kendaraan
- Admin menginput kan data request melalui website di page `/admin/usage-request/add` dengan mengisi:
  - deskripsi penggunaan
  - tanggal dan jam mulai pemakaian 
  - tanggal dan jam berakhirnya pemakaian 
  - nama driver
  - kendaraan yang dipilih
  - approver (minimal 2)

- Driver harus menunggu approver untuk approve/reject
- Data yang perlu di approve akan muncul di dashboard approver
- Approver bisa melakukan approve/reject di halaman `/user/usage-request`
- Approver ke 2 dan seterusnya tidak dapat approve jika approver pertama atau sebelum dia belum melakukan approve
- Jika Approver tingkat 1 atau tingkat sebelum dia tidak meng-approve / me-reject, maka approver selanjutnya tidak dapat melakukan approve dan dianggap request itu telah tertolak begitu juga jika salah satu approver me-reject maka request dianggap ditolak
- Admin akan secara berkala mengecek apakah status request sudah berubah atau belum, jika sudah maka admin wajib mengonfirmasi kepada driver 
- Jika di approve maka driver akan menuju bagian admin kembali untuk mengambil kunci dan melaporkan bahwa kendaraan akan digunakan
- Admin akan mengubah `usage_status` yang sebelumnya belum_digunakan menjadi sedang_digunakan
- Setelah selesai menggunakan kendaraan dan memarkir, driver wajib memfoto info jumlah BBM pada kendaraan, setelah itu driver harus mengembalikan kunci kendaraan dan melaporkan sisa BBM pada admin dengan menunjukkan bukti foto
- Admin akan melakukan pelaporan jumlah BBM, yang otomatis berarti `usage_status` menjadi sudah_digunakan dan laporan tercatat di halaman History `/admin/usage-histories`

#### Fitur
- Terdapat Grafik Pemakaian Kendaraan pertanggal dan perbulan di dashboard admin dan user
- Terdapat Grafik Pemakaian BBM pertanggal dan perbulan di dashboard admin dan user
- Terdapat Info Kendaraan yang perlu diservis hari ini di dashboard admin dan user
- Terdapat Tampilan beberapa data yang perlu di approve pada dashboard user yang menandakan ada data data yang perlu di approve
- CRUD driver, user, transport, fuel consumption, service schedule, usage request, dan usage histories
- Export Data to Excel in FE

#### Email and Password for Login
- Email: `admin@mail.com`
  Password: `Oke123`
- Email: `user1@mail.com`
  Password: `Oke123`
- Email: `user2@mail.com`
  Password: `Oke123`
- Email: `user3@mail.com`
  Password: `Oke123`
- Email: `user4@mail.com`
  Password: `Oke123`
- Email: `user5@mail.com`
  Password: `Oke123`

## Backend (Laravel)

## Installation

Install package with composer

```bash
  composer install 
```
    
## Usage

### how to run in local
- clone project
- masuk ke project run `composer install` diterminal untuk menginstall package
- buat file .env lalu copy isi .env.example ke file.env
- import database dengan nama `monitoring-kendaraan`
- untuk menjalankan project run `php artisan serve` 
- hit api dengan base url http://localhost:8000/api

#### Built with
- Carbon
- Sanctum

#### Version Info
- php version `8.2.16`
- laravel version `9.19`
- MySQL or DB version `10.4.27-MariaDB`

-----------------

## Frontend (Nextjs)

### Installation

Install package with npm

```bash
  npm install 
```
    
### Usage

#### how to run in local
- clone project
- masuk ke project run `npm install` diterminal untuk menginstall package
- buat file .env lalu copy isi .env.example ke file.env
- untuk menjalankan project run `npm start` 
- buka browser dan ketikkan url http://localhost:3000

#### Built with
- Axios
- js-cookie
- react-chartjs-2
- react-datepicker
- react-icons
- react-select
- sweetalert2
- xlsx

#### Version Info
- next version `14.2.4`
- node version `v20.11.0`
- npm version `10.2.4`

## Contact

Reyhan Marsalino Diansa - [@reyhanmd._](https://instagram.com/reyhanmd._) - reyhandiansa@gmail.com

Project Link: [https://github.com/reyhandiansa/Monitoring-Kendaraan](https://github.com/ReyhanDiansa/Monitoring-Kendaraan)
