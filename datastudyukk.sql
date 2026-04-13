-- =====================================
-- DATABASE SISTEM MEMBERSHIP STUDYUK
-- =====================================


-- =========================
-- TABEL USERS
-- =========================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    nama_depan VARCHAR(50) NOT NULL,
    nama_belakang VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    no_telp VARCHAR(20)
) ENGINE=InnoDB;

-- =========================
-- TABEL ADMIN
-- =========================
CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- =========================
-- TABEL PAKET MEMBERSHIP
-- =========================
CREATE TABLE paket_membership (
    paket_id INT AUTO_INCREMENT PRIMARY KEY,
    nama_paket VARCHAR(100) NOT NULL,
    harga DECIMAL(10,2) NOT NULL,
    durasi_hari INT NOT NULL,
    batas_materi INT,
    deskripsi TEXT,
    masih_aktif BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;

-- =========================
-- TABEL SUBSKRIPSI
-- =========================
CREATE TABLE subskripsi (
    subskripsi_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    paket_id INT NOT NULL,
    tanggal_mulai DATE NOT NULL,
    tanggal_berakhir DATE NOT NULL,
    status BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (paket_id) REFERENCES paket_membership(paket_id)
) ENGINE=InnoDB;

-- =========================
-- TABEL TRANSAKSI
-- =========================
CREATE TABLE transaksi (
    transaksi_id INT AUTO_INCREMENT PRIMARY KEY,
    subskripsi_id INT NOT NULL,
    jumlah_bayar DECIMAL(10,2) NOT NULL,
    metode_pembayaran VARCHAR(50),
    status_pembayaran ENUM('pending','sukses') DEFAULT 'pending',
    tanggal_transaksi DATE,
    FOREIGN KEY (subskripsi_id) REFERENCES subskripsi(subskripsi_id)
) ENGINE=InnoDB;

-- =========================
-- DATA ADMIN
-- =========================
INSERT INTO admin (nama,email,password)
VALUES
('Admin Studyuk','admin@studyuk.com','admin123');

-- =========================
-- DATA PAKET MEMBERSHIP
-- =========================
INSERT INTO paket_membership
(nama_paket,harga,durasi_hari,batas_materi,deskripsi,masih_aktif)
VALUES
('Basic',0,30,3,'Akses 3 materi',TRUE),
('Pro',50000,30,10,'Akses 10 materi',TRUE),
('Premium',100000,30,NULL,'Akses semua materi tanpa batas',TRUE);

-- =========================
-- DATA USERS
-- =========================
INSERT INTO users (username,nama_depan,nama_belakang,email,password,no_telp)
VALUES
('zidane','Zidane','Mardico','zidane@email.com','123456','08123456789'),
('andi','Andi','Saputra','andi@email.com','123456','081222334455'),
('siti','Siti','Rahma','siti@email.com','123456','081333445566'),
('budi','Budi','Santoso','budi@email.com','123456','081444556677'),
('rina','Rina','Putri','rina@email.com','123456','081555667788');

-- =========================
-- DATA SUBSKRIPSI
-- =========================
INSERT INTO subskripsi (user_id,paket_id,tanggal_mulai,tanggal_berakhir,status)
VALUES
(1,2,'2026-04-01','2026-05-01',TRUE),
(2,3,'2026-04-02','2026-05-02',TRUE),
(3,1,'2026-04-03','2026-05-03',TRUE),
(4,2,'2026-04-04','2026-05-04',TRUE),
(5,3,'2026-04-05','2026-05-05',TRUE);

-- =========================
-- DATA TRANSAKSI
-- =========================
INSERT INTO transaksi
(subskripsi_id,jumlah_bayar,metode_pembayaran,status_pembayaran,tanggal_transaksi)
VALUES
(1,50000,'OVO','sukses','2026-04-01'),
(2,100000,'GoPay','sukses','2026-04-02'),
(3,0,'Free','sukses','2026-04-03'),
(4,50000,'DANA','sukses','2026-04-04'),
(5,100000,'OVO','sukses','2026-04-05');`