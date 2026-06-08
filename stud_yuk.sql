-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2026 at 04:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stud_yuk`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `nama`, `email`, `password`) VALUES
(2, 'Admin Studyuk', 'admin@studyuk.com', 'admin123');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `title`, `description`, `content`, `created_at`) VALUES
(1, 'React Dasar', NULL, '\r\nReact adalah sebuah pustaka JavaScript yang dikembangkan oleh Meta untuk membangun antarmuka pengguna secara deklaratif dan efisien melalui pendekatan berbasis komponen. Dalam ekosistem React, Anda memecah tampilan aplikasi yang kompleks menjadi bagian-bagian kecil terisolasi yang disebut komponen, di mana setiap komponen mengelola logika serta tampilannya sendiri untuk kemudian digabungkan menjadi satu kesatuan utuh.\r\n\r\nKeunggulan utama React terletak pada penggunaan Virtual DOM yang memungkinkan aplikasi memperbarui tampilan secara cepat tanpa harus memuat ulang seluruh halaman, melainkan hanya menyinkronkan bagian yang berubah saja. Selain itu, React menggunakan sintaks bernama JSX yang memungkinkan Anda menulis struktur HTML langsung di dalam kode JavaScript, sehingga proses pengembangan terasa lebih intuitif dan terintegrasi. Karena sifatnya yang reaktif, setiap kali terjadi perubahan data pada status atau state suatu komponen, React akan secara otomatis merender ulang antarmuka untuk memastikan apa yang dilihat pengguna selalu selaras dengan data terbaru.\r\n', '2026-04-28 18:59:57'),
(2, 'NodeJS API', NULL, 'Belajar backend Express', '2026-04-28 18:59:57'),
(3, 'UI/UX Design', NULL, 'Belajar desain modern', '2026-04-28 18:59:57'),
(4, 'Machine Learning', NULL, 'Dasar ML', '2026-04-28 18:59:57'),
(5, 'Cloud AWS', NULL, 'Deploy aplikasi ke cloud', '2026-04-28 18:59:57');

-- --------------------------------------------------------

--
-- Table structure for table `paket_membership`
--

CREATE TABLE `paket_membership` (
  `paket_id` int(11) NOT NULL,
  `nama_paket` varchar(100) NOT NULL,
  `harga` decimal(10,2) NOT NULL,
  `durasi_hari` int(11) NOT NULL,
  `batas_materi` int(11) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `masih_aktif` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paket_membership`
--

INSERT INTO `paket_membership` (`paket_id`, `nama_paket`, `harga`, `durasi_hari`, `batas_materi`, `deskripsi`, `masih_aktif`) VALUES
(1, 'Basic', 0.00, 30, 3, 'Akses 3 materi', 1),
(2, 'Pro', 50000.00, 30, 10, 'Akses 10 materi', 1),
(3, 'Premium', 100000.00, 30, NULL, 'Akses semua materi tanpa batas', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expired_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`id`, `user_id`, `token`, `expired_at`, `created_at`) VALUES
(1, 6, 'f0c6d00505fdca7ae4a3fe08c754863fc4c9ba58915b0a95289d041181247a40', '2026-04-22 18:58:34', '2026-04-22 17:58:34'),
(2, 6, 'c87c3b97435c95b235a348348e96cf430a23bd6483628935cafd068b8c6de654', '2026-04-22 19:09:01', '2026-04-22 18:09:01');

-- --------------------------------------------------------

--
-- Table structure for table `subskripsi`
--

CREATE TABLE `subskripsi` (
  `subskripsi_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `paket_id` int(11) NOT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_berakhir` date NOT NULL,
  `status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subskripsi`
--

INSERT INTO `subskripsi` (`subskripsi_id`, `user_id`, `paket_id`, `tanggal_mulai`, `tanggal_berakhir`, `status`) VALUES
(1, 1, 2, '2026-04-01', '2026-05-01', 1),
(2, 2, 3, '2026-04-02', '2026-05-02', 1),
(3, 3, 1, '2026-04-03', '2026-05-03', 1),
(4, 4, 2, '2026-04-04', '2026-05-04', 1),
(5, 5, 3, '2026-04-05', '2026-05-05', 1),
(6, 6, 2, '2026-04-16', '2026-05-16', 0),
(7, 7, 1, '2026-04-19', '2026-05-19', 1),
(8, 8, 1, '2026-04-25', '2026-05-25', 1),
(9, 9, 1, '2026-04-25', '2026-05-25', 1),
(10, 10, 1, '2026-04-25', '2026-05-25', 1),
(11, 6, 2, '2026-05-04', '2026-06-03', 0),
(12, 6, 2, '2026-05-04', '2026-06-15', 0),
(13, 6, 1, '2026-05-10', '2026-06-15', 0),
(14, 6, 2, '2026-05-10', '2026-06-15', 0),
(15, 6, 2, '2026-05-10', '2026-06-15', 0),
(16, 6, 1, '2026-05-10', '2026-06-15', 0),
(17, 6, 3, '2026-05-11', '2026-06-15', 0),
(18, 6, 3, '2026-05-11', '2026-06-15', 0),
(19, 6, 3, '2026-05-11', '2026-06-15', 0),
(20, 6, 3, '2026-05-11', '2026-06-15', 0),
(21, 6, 3, '2026-05-11', '2026-06-15', 0),
(22, 6, 3, '2026-05-11', '2026-06-15', 0),
(23, 6, 3, '2026-05-11', '2026-06-15', 0),
(24, 6, 3, '2026-05-11', '2026-06-10', 0),
(25, 6, 3, '2026-05-11', '2026-06-10', 1);

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `transaksi_id` int(11) NOT NULL,
  `subskripsi_id` int(11) NOT NULL,
  `jumlah_bayar` decimal(10,2) NOT NULL,
  `metode_pembayaran` varchar(50) DEFAULT NULL,
  `status_pembayaran` enum('pending','sukses') DEFAULT 'pending',
  `tanggal_transaksi` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`transaksi_id`, `subskripsi_id`, `jumlah_bayar`, `metode_pembayaran`, `status_pembayaran`, `tanggal_transaksi`) VALUES
(1, 1, 50000.00, 'OVO', 'sukses', '2026-04-01'),
(2, 2, 100000.00, 'GoPay', 'sukses', '2026-04-02'),
(3, 3, 0.00, 'Free', 'sukses', '2026-04-03'),
(4, 4, 50000.00, 'DANA', 'sukses', '2026-04-04'),
(5, 5, 100000.00, 'OVO', 'sukses', '2026-04-05'),
(6, 6, 0.00, 'Free', 'sukses', '2026-04-16'),
(7, 7, 0.00, 'Free', 'sukses', '2026-04-19'),
(8, 8, 0.00, 'Free', 'sukses', '2026-04-25'),
(9, 9, 0.00, 'Free', 'sukses', '2026-04-25'),
(10, 10, 0.00, 'Free', 'sukses', '2026-04-25'),
(11, 11, 50000.00, 'manual', '', '2026-05-04'),
(12, 12, 50000.00, 'manual', '', '2026-05-04'),
(13, 13, 0.00, 'manual', '', '2026-05-10'),
(14, 14, 50000.00, 'manual', '', '2026-05-10'),
(15, 15, 50000.00, 'manual', '', '2026-05-10'),
(16, 16, 0.00, 'manual', '', '2026-05-10'),
(17, 17, 100000.00, 'manual', '', '2026-05-11'),
(18, 18, 100000.00, 'manual', '', '2026-05-11'),
(19, 19, 100000.00, 'manual', '', '2026-05-11'),
(20, 20, 100000.00, 'manual', '', '2026-05-11'),
(21, 21, 100000.00, 'manual', '', '2026-05-11'),
(22, 22, 100000.00, 'manual', '', '2026-05-11'),
(23, 23, 100000.00, 'manual', '', '2026-05-11'),
(24, 24, 100000.00, 'manual', 'pending', '2026-05-11'),
(25, 25, 100000.00, 'manual', 'pending', '2026-05-11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `nama_depan` varchar(50) NOT NULL,
  `nama_belakang` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `no_telp` varchar(20) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_expired` datetime DEFAULT NULL,
  `bio` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `nama_depan`, `nama_belakang`, `email`, `password`, `no_telp`, `reset_token`, `reset_expired`, `bio`) VALUES
(1, 'zidane', 'Zidane', 'Mardico', 'zidane@email.com', '$2b$10$FDYZMkxFoPiP73ot0tZZmOfmBOmqa7sYofQNFD3E5L/bDTY5zbNIO', '08123456789', NULL, NULL, NULL),
(2, 'andi', 'Andi', 'Saputra', 'andi@email.com', '123456', '081222334455', NULL, NULL, NULL),
(3, 'siti', 'Siti', 'Rahma', 'siti@email.com', '$2b$10$8Njm152NNpjnsDXeyygtMeLjSUc71Tb4Ma5yOhxP01dMD8zD5.fzO', '081333445566', NULL, NULL, NULL),
(4, 'budi', 'Budi', 'Santoso', 'budi@email.com', '123456', '081444556677', NULL, NULL, NULL),
(5, 'rina', 'Rina', 'Putri', 'rina@email.com', '123456', '081555667788', NULL, NULL, NULL),
(6, 'jason12', 'Jason', 'Susanto', 'jason@email.com', '$2b$10$ZdMz8BdL.Xqv6a1ct.21Euq3R2rq7ohVi7AEJs8m9fuIE7bXuxWNu', '081234567890', '180ffd911bab68ea318bd41d3613417d4b8bb55af8833633df252c5e40bdaeb2', '2026-05-11 02:39:55', NULL),
(7, 'farras', 'farras', 'mumtaz', 'farrasmumtaz10@gmail.com', '$2b$10$GqZ8SeEnuUw10t986iYNGe2A195ZrmxwzlXUqVUGTb6rzFxzQVgQG', '081316047371', NULL, NULL, NULL),
(8, 'mala09', 'Kira', 'Mala', 'malakira89@email.com', '$2b$10$YxGFBvIJ5b0V58Q5Ca5Bde8.W3Yd/Mb1VZXoQhF1B4SGA3vBTaA46', NULL, NULL, NULL, NULL),
(9, 'mala09', 'Kira', '', 'malakira@email.com', '$2b$10$fBXrhRkG3blKvFJLJS6M0OPo0r8cKfM.WijaApNkQtBLr8ssuG1rK', NULL, NULL, NULL, NULL),
(10, 'mala09', 'Kira', '', 'malaki@email.com', '$2b$10$ioyjkNrgro1Z3JdD/cLUUuq8yvn7mAyTYeLnZwvrqMW4OXbAJuUtG', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_course_access`
--

CREATE TABLE `user_course_access` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `accessed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_course_access`
--

INSERT INTO `user_course_access` (`id`, `user_id`, `course_id`, `accessed_at`) VALUES
(18, 6, 2, '2026-05-10 15:37:02'),
(19, 6, 3, '2026-05-10 15:37:28'),
(21, 6, 4, '2026-05-10 18:13:00'),
(22, 6, 5, '2026-05-10 18:13:02');

-- --------------------------------------------------------

--
-- Table structure for table `user_progress`
--

CREATE TABLE `user_progress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `lesson_id` int(11) DEFAULT NULL,
  `is_completed` tinyint(1) DEFAULT 0,
  `completed_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `paket_membership`
--
ALTER TABLE `paket_membership`
  ADD PRIMARY KEY (`paket_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subskripsi`
--
ALTER TABLE `subskripsi`
  ADD PRIMARY KEY (`subskripsi_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `paket_id` (`paket_id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`transaksi_id`),
  ADD KEY `subskripsi_id` (`subskripsi_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_course_access`
--
ALTER TABLE `user_course_access`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`course_id`);

--
-- Indexes for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`lesson_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `paket_membership`
--
ALTER TABLE `paket_membership`
  MODIFY `paket_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subskripsi`
--
ALTER TABLE `subskripsi`
  MODIFY `subskripsi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `transaksi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_course_access`
--
ALTER TABLE `user_course_access`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user_progress`
--
ALTER TABLE `user_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `subskripsi`
--
ALTER TABLE `subskripsi`
  ADD CONSTRAINT `subskripsi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `subskripsi_ibfk_2` FOREIGN KEY (`paket_id`) REFERENCES `paket_membership` (`paket_id`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`subskripsi_id`) REFERENCES `subskripsi` (`subskripsi_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
