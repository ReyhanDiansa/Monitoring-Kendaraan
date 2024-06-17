-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2024 at 06:53 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `monitoring-kendaraan`
--

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nip` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`id`, `nip`, `name`, `created_at`, `updated_at`) VALUES
(1, '834823743222', 'Marsalino', '2024-06-15 09:31:54', '2024-06-15 09:31:54'),
(4, '111223344455', 'reyhan d', '2024-06-17 09:01:35', '2024-06-17 09:01:55'),
(6, '123564213', 'alfin', '2024-06-17 09:03:07', '2024-06-17 09:03:07'),
(7, '09732842344', 'alif', '2024-06-17 09:03:39', '2024-06-17 09:03:39');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fuel_consumptions`
--

CREATE TABLE `fuel_consumptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `start_amount` decimal(10,0) NOT NULL,
  `final_amount` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fuel_consumptions`
--

INSERT INTO `fuel_consumptions` (`id`, `date`, `start_amount`, `final_amount`, `created_at`, `updated_at`) VALUES
(8, '2024-06-16 08:05:11', '8', '3.50', '2024-06-16 01:05:11', '2024-06-16 01:05:11'),
(10, '2024-06-03 08:11:03', '10', '8.70', '2024-06-16 01:11:03', '2024-06-16 07:58:15'),
(13, '2024-06-17 02:47:15', '8', '7.00', '2024-06-16 19:47:15', '2024-06-16 19:47:15'),
(14, '2024-06-17 02:48:03', '9', '8.00', '2024-06-16 19:48:03', '2024-06-16 19:48:03'),
(17, '2024-06-17 03:41:18', '100', '90.00', '2024-06-16 20:41:18', '2024-06-16 20:41:18'),
(18, '2024-06-17 14:49:12', '90', '8.20', '2024-06-17 07:49:12', '2024-06-17 07:49:12'),
(19, '2024-06-17 16:29:33', '20', '15.00', '2024-06-17 09:29:33', '2024-06-17 09:29:33'),
(20, '2024-07-17 17:10:46', '11', '10.00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_06_14_110632_add_role_column_users_table', 1),
(6, '2024_06_14_110919_create_driver_table', 1),
(7, '2024_06_14_111429_create_transport_table', 1),
(9, '2024_06_14_113336_create_service_schedules_table', 1),
(10, '2024_06_14_115115_create_usage_request_table', 1),
(11, '2024_06_14_120436_create_usage_histories_table', 1),
(12, '2024_06_14_122609_create_request_detail_table', 1),
(13, '2024_06_15_112639_rename_usage_time_usage_request', 1),
(14, '2024_06_15_120804_modify_request_detail_foreign_key', 1),
(15, '2024_06_15_120905_modify_usage_request_foreign_key', 1),
(17, '2024_06_15_160344_modify_usage_histories_foreign_key', 1),
(18, '2024_06_16_045816_add_timestamp_usage_histories', 2),
(20, '2024_06_16_052550_add_usage_status_in_usage_histories', 3),
(21, '2024_06_14_112904_create_fuel_consumptions_table', 4),
(22, '2024_06_15_152907_add_driver_id_in_fuel_consumption', 5),
(23, '2024_06_16_054635_add_fuel_consumption_id_usage_histories', 6),
(24, '2024_06_16_130657_modify_approver_id_foreign_key', 7),
(25, '2024_06_17_015824_add_usage_status', 8);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 1, 'authToken', '438631c7c5ffd44647fb8a111342354b1153cee0262870c8d2cdf4c200136a3c', '[\"*\"]', '2024-06-16 06:08:27', NULL, '2024-06-16 01:47:31', '2024-06-16 06:08:27'),
(3, 'App\\Models\\User', 2, 'authToken', '14be8dff0826f8ec5869c2bf9890acc9d018016bd7917445a1ae3961dd5021bd', '[\"*\"]', '2024-06-17 11:12:14', NULL, '2024-06-16 06:09:03', '2024-06-17 11:12:14'),
(4, 'App\\Models\\User', 4, 'authToken', 'd2991dc6f140ff38f8cf1382b0db245143ff91263ef5b905d2f33db0c533742f', '[\"*\"]', NULL, NULL, '2024-06-16 06:11:18', '2024-06-16 06:11:18'),
(5, 'App\\Models\\User', 4, 'authToken', '3856acd784249357fd8d007393b56cb12b4abe8330761b68688a7f069df4d724', '[\"*\"]', NULL, NULL, '2024-06-17 04:23:06', '2024-06-17 04:23:06'),
(6, 'App\\Models\\User', 4, 'authToken', '3514684945ef6b30e398e62430f3c1ba52950f9bd69db926e21b8fda8bbe6970', '[\"*\"]', NULL, NULL, '2024-06-17 04:24:03', '2024-06-17 04:24:03'),
(7, 'App\\Models\\User', 4, 'authToken', 'df01cea48aabfd4fd9a7ccf0b72e28e72cde2bfffad4035a26be452440d15960', '[\"*\"]', NULL, NULL, '2024-06-17 04:25:36', '2024-06-17 04:25:36'),
(8, 'App\\Models\\User', 4, 'authToken', '28c975ca9ff2719dc743f5c84effc0011128bbe8b4183164c31af83028c6a5b1', '[\"*\"]', NULL, NULL, '2024-06-17 04:26:56', '2024-06-17 04:26:56'),
(9, 'App\\Models\\User', 4, 'authToken', 'f3dbdf2594160ee2d52fddb8df61748f32b39b9b228045b9b1004c9e853185ed', '[\"*\"]', NULL, NULL, '2024-06-17 04:27:35', '2024-06-17 04:27:35'),
(10, 'App\\Models\\User', 4, 'authToken', 'e0c65b9204b92a7c8d7b101d213c11d79ad8216750b467123037f754f054be9c', '[\"*\"]', NULL, NULL, '2024-06-17 04:28:06', '2024-06-17 04:28:06'),
(11, 'App\\Models\\User', 4, 'authToken', '2e8780c93b6215691b00455516602c4ba4c31df169e64828a9179ad79bdab501', '[\"*\"]', NULL, NULL, '2024-06-17 04:32:55', '2024-06-17 04:32:55'),
(12, 'App\\Models\\User', 4, 'authToken', '9b49ed1d03ea2b3232e5844fa1f097eddba7ea9eef0664dd80862779aa8b2ccc', '[\"*\"]', '2024-06-17 04:36:55', NULL, '2024-06-17 04:36:51', '2024-06-17 04:36:55'),
(13, 'App\\Models\\User', 4, 'authToken', 'ab5dd1b0cb0aee926161a444bcac38eb17ec92f25388f0fb6678575baccd1d3a', '[\"*\"]', '2024-06-17 04:42:57', NULL, '2024-06-17 04:37:24', '2024-06-17 04:42:57'),
(14, 'App\\Models\\User', 4, 'authToken', 'f794d748c736493f195eac32a32a37da876c0f50f3825ab9bc086dc464c3996d', '[\"*\"]', NULL, NULL, '2024-06-17 04:43:06', '2024-06-17 04:43:06'),
(15, 'App\\Models\\User', 4, 'authToken', '8a49b3fb5e1c8b6233508aa7a8c9b9f30db299a1dbc27435dcbba9d79d3cb62a', '[\"*\"]', NULL, NULL, '2024-06-17 04:43:39', '2024-06-17 04:43:39'),
(16, 'App\\Models\\User', 4, 'authToken', 'f5eff0ec4d0ff3a3e52642a46ec857c80eda4789f1eed1c2b68df0f82f53cd36', '[\"*\"]', '2024-06-17 04:44:28', NULL, '2024-06-17 04:44:28', '2024-06-17 04:44:28'),
(17, 'App\\Models\\User', 4, 'authToken', 'b15c94789af366394dfdd904f2fde4966e850bcc5570dd7466248d75aeb90521', '[\"*\"]', '2024-06-17 04:45:34', NULL, '2024-06-17 04:45:34', '2024-06-17 04:45:34'),
(18, 'App\\Models\\User', 4, 'authToken', '10c69673b2fe520f6995da58f16373a1685d7fe833aeba4e8c2f97be571cbedc', '[\"*\"]', '2024-06-17 04:47:18', NULL, '2024-06-17 04:47:18', '2024-06-17 04:47:18'),
(19, 'App\\Models\\User', 4, 'authToken', 'a89ef078e39c4ddeac80cd21f7784e3f1e036e8545d21f2186d286ed7b62526c', '[\"*\"]', '2024-06-17 04:48:16', NULL, '2024-06-17 04:48:16', '2024-06-17 04:48:16'),
(20, 'App\\Models\\User', 4, 'authToken', '41796e5754a30c0fb353597c5be9029c88ca22a3fd6cf25353191e198c57663f', '[\"*\"]', NULL, NULL, '2024-06-17 04:49:04', '2024-06-17 04:49:04'),
(21, 'App\\Models\\User', 4, 'authToken', 'ee3815be8f8115d4223457e718bc700d06811ab3ad048579d8fe63beb842fe3a', '[\"*\"]', '2024-06-17 04:49:28', NULL, '2024-06-17 04:49:28', '2024-06-17 04:49:28'),
(22, 'App\\Models\\User', 4, 'authToken', '54cb7d057b1ac2ced87bb2fac6fa79bfc817e5c9d2df684ccc11bcb4a00e5f4d', '[\"*\"]', '2024-06-17 04:50:48', NULL, '2024-06-17 04:50:48', '2024-06-17 04:50:48'),
(23, 'App\\Models\\User', 4, 'authToken', 'fefcea62cbf936d175b9330c508d36cb6a2141df141758c9461fa484bd544030', '[\"*\"]', '2024-06-17 04:51:57', NULL, '2024-06-17 04:51:57', '2024-06-17 04:51:57'),
(24, 'App\\Models\\User', 4, 'authToken', '0470db6d3d4cc610ebb4e025a08c13397b03792eb200ea0d3fd1fb1456fbed55', '[\"*\"]', '2024-06-17 04:52:52', NULL, '2024-06-17 04:52:52', '2024-06-17 04:52:52'),
(25, 'App\\Models\\User', 4, 'authToken', '37e2f5dc5d6924fbb124248ae7d0256cd539e697bc3280a7281684d69a482fc2', '[\"*\"]', NULL, NULL, '2024-06-17 05:01:13', '2024-06-17 05:01:13'),
(26, 'App\\Models\\User', 4, 'authToken', '102e7df7905f231c156d939a3370835014b245ee50dbe566f892b5f7e913edcf', '[\"*\"]', NULL, NULL, '2024-06-17 05:01:43', '2024-06-17 05:01:43'),
(27, 'App\\Models\\User', 4, 'authToken', 'aba4a28fcd4c949be995c4ebbafb1fb14468a79c3e4a16698b5ee522c5b6a184', '[\"*\"]', NULL, NULL, '2024-06-17 05:05:24', '2024-06-17 05:05:24'),
(28, 'App\\Models\\User', 4, 'authToken', '24646cd0ef7fabc06fb176b1d7ce9b617e359120354a4d45811764f3ed276895', '[\"*\"]', NULL, NULL, '2024-06-17 05:06:12', '2024-06-17 05:06:12'),
(29, 'App\\Models\\User', 4, 'authToken', '4f899c9e23a17c612e0e77abec02945961e7bb59fabfbfe75f38c6917ef79424', '[\"*\"]', NULL, NULL, '2024-06-17 05:06:29', '2024-06-17 05:06:29'),
(30, 'App\\Models\\User', 4, 'authToken', '20c67e7afc0e93afc69d4f6c059fa092e156b4156586df685bc694e22182dc1a', '[\"*\"]', '2024-06-17 05:07:33', NULL, '2024-06-17 05:07:32', '2024-06-17 05:07:33'),
(31, 'App\\Models\\User', 4, 'authToken', 'be8e7fa6b7d24fafdc7c891848bc95b307f3273c58280c4df2f363a098b245e8', '[\"*\"]', '2024-06-17 05:08:38', NULL, '2024-06-17 05:08:37', '2024-06-17 05:08:38'),
(32, 'App\\Models\\User', 4, 'authToken', '08c985dd7456fa6b29599fac230c8ca6c64c50ca6eacac1a77f7f1d3e03b6290', '[\"*\"]', '2024-06-17 05:09:23', NULL, '2024-06-17 05:09:20', '2024-06-17 05:09:23'),
(33, 'App\\Models\\User', 4, 'authToken', 'f1996111abb9a5c9d5f5b6c6e7e7950617b95d33d96cb1bebf02bf149fb49a6f', '[\"*\"]', '2024-06-17 05:10:56', NULL, '2024-06-17 05:10:53', '2024-06-17 05:10:56'),
(34, 'App\\Models\\User', 4, 'authToken', '108eb9883914084e41adb2baa9451eff43efe9a4dd329ecc2dcddbdc5348ab9f', '[\"*\"]', '2024-06-17 05:11:52', NULL, '2024-06-17 05:11:51', '2024-06-17 05:11:52'),
(35, 'App\\Models\\User', 4, 'authToken', '1075973453ff1ce4cc32a64ef1ef56f478821d9b2849c845aa67f8d37d2c8715', '[\"*\"]', '2024-06-17 05:12:49', NULL, '2024-06-17 05:12:49', '2024-06-17 05:12:49'),
(36, 'App\\Models\\User', 4, 'authToken', 'a2dde642fafc479afb0086c5b9e700f8c6598196077c7ad578ba380ab10f8e45', '[\"*\"]', '2024-06-17 05:16:10', NULL, '2024-06-17 05:16:09', '2024-06-17 05:16:10'),
(37, 'App\\Models\\User', 4, 'authToken', 'dc9ecf61798731d7db00b2ea98dc642b579580a23818c403bfec284d3bbfc056', '[\"*\"]', '2024-06-17 05:18:27', NULL, '2024-06-17 05:17:50', '2024-06-17 05:18:27'),
(38, 'App\\Models\\User', 5, 'authToken', '65773fd5571092557ee1c5d13c0c0b9516ac0cb33f617d6b22ab95d511c100da', '[\"*\"]', '2024-06-17 05:20:13', NULL, '2024-06-17 05:19:02', '2024-06-17 05:20:13'),
(39, 'App\\Models\\User', 5, 'authToken', 'f7a20decf96c1c24acd7a4a6cb18b9a744336f568a9e18e98d0c0b87ff73873b', '[\"*\"]', '2024-06-17 05:22:14', NULL, '2024-06-17 05:22:13', '2024-06-17 05:22:14'),
(40, 'App\\Models\\User', 5, 'authToken', 'bc595c5782c3287f0b7d56ce03a99268526fc3058aebc8ec4a7c29aaf87c9dfd', '[\"*\"]', '2024-06-17 05:23:48', NULL, '2024-06-17 05:23:46', '2024-06-17 05:23:48'),
(41, 'App\\Models\\User', 5, 'authToken', 'bf608eacd57dbad3502b20979d4742a5bf97330ccf31cb2708eb6af3df4814ca', '[\"*\"]', '2024-06-17 05:41:45', NULL, '2024-06-17 05:24:50', '2024-06-17 05:41:45'),
(42, 'App\\Models\\User', 4, 'authToken', '73b6f270dc83aae5f54a8a5d9277695879e2866c48cbe7a0ad2768117247ac86', '[\"*\"]', '2024-06-17 05:44:56', NULL, '2024-06-17 05:43:32', '2024-06-17 05:44:56'),
(43, 'App\\Models\\User', 5, 'authToken', '363529bdf9ff5899f148406b13268e435611a14a041abf00a2fd1397fc1279ea', '[\"*\"]', '2024-06-17 06:10:48', NULL, '2024-06-17 05:45:49', '2024-06-17 06:10:48'),
(44, 'App\\Models\\User', 2, 'authToken', '9c41288d7b758916ca663539b4336c3d82a635bb6040196c55b43e458893c736', '[\"*\"]', '2024-06-17 08:57:34', NULL, '2024-06-17 06:11:30', '2024-06-17 08:57:34'),
(45, 'App\\Models\\User', 4, 'authToken', '20ff3da2906dff3f039af98a6a651c81be1c947db2909c320cc7217bd8565eb1', '[\"*\"]', '2024-06-17 10:11:37', NULL, '2024-06-17 08:58:32', '2024-06-17 10:11:37'),
(46, 'App\\Models\\User', 4, 'authToken', 'e094b20d42746619691d685144bc48f824f1b33e1bb9b1f609e8aae2bedf6f48', '[\"*\"]', '2024-06-17 10:15:50', NULL, '2024-06-17 10:15:42', '2024-06-17 10:15:50'),
(47, 'App\\Models\\User', 2, 'authToken', 'c1d8715714bc0498b283a218f26b69b21e29f7e3295eb07be56d28c47fe995ce', '[\"*\"]', '2024-06-17 10:16:37', NULL, '2024-06-17 10:16:08', '2024-06-17 10:16:37');

-- --------------------------------------------------------

--
-- Table structure for table `request_detail`
--

CREATE TABLE `request_detail` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `request_id` bigint(20) UNSIGNED NOT NULL,
  `approver_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('pending','reject','approve') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `request_detail`
--

INSERT INTO `request_detail` (`id`, `request_id`, `approver_id`, `status`, `created_at`, `updated_at`) VALUES
(2, 1, 2, 'reject', '2024-06-15 09:32:47', '2024-06-17 06:28:04'),
(4, 2, 2, 'approve', '2024-06-16 00:54:09', '2024-06-17 06:35:27'),
(7, 4, 2, 'reject', '2024-06-16 11:02:37', '2024-06-17 08:57:16'),
(8, 4, 5, 'pending', '2024-06-16 11:02:37', '2024-06-16 19:19:15'),
(9, 5, 2, 'pending', '2024-06-17 01:32:00', '2024-06-17 01:32:00'),
(10, 5, 5, 'pending', '2024-06-17 01:32:00', '2024-06-17 01:32:00'),
(11, 6, 5, 'pending', '2024-06-17 07:47:55', '2024-06-17 07:47:55'),
(12, 6, 2, 'pending', '2024-06-17 07:47:55', '2024-06-17 07:47:55'),
(13, 7, 2, 'pending', '2024-06-17 09:28:27', '2024-06-17 09:28:27'),
(14, 7, 10, 'pending', '2024-06-17 09:28:27', '2024-06-17 09:28:27');

-- --------------------------------------------------------

--
-- Table structure for table `service_schedules`
--

CREATE TABLE `service_schedules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `transport_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `service_description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service_schedules`
--

INSERT INTO `service_schedules` (`id`, `transport_id`, `date`, `service_description`, `created_at`, `updated_at`) VALUES
(2, 1, '2023-09-08', 'ganti oli', '2024-06-15 09:51:53', '2024-06-15 09:51:53'),
(5, 1, '2024-06-17', 'turun mesin', '2024-06-17 01:14:46', '2024-06-17 01:14:46'),
(6, 5, '2024-06-18', 'ganti aki', '2024-06-17 09:23:41', '2024-06-17 09:23:41'),
(7, 8, '2024-06-19', 'service rutin', '2024-06-17 09:24:10', '2024-06-17 09:24:10'),
(8, 9, '2024-06-20', 'service rutin', '2024-06-17 09:24:33', '2024-06-17 09:24:33'),
(9, 7, '2024-06-21', 'service rutin', '2024-06-17 09:24:51', '2024-06-17 09:24:51'),
(10, 10, '2024-06-22', 'service rutin', '2024-06-17 09:25:09', '2024-06-17 09:25:09'),
(11, 5, '2024-06-23', 'service rutin', '2024-06-17 09:25:27', '2024-06-17 09:25:27'),
(12, 7, '2024-06-25', 'service rutin', '2024-06-17 09:25:47', '2024-06-17 09:25:47');

-- --------------------------------------------------------

--
-- Table structure for table `transport`
--

CREATE TABLE `transport` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('angkutan_barang','angkutan_orang') NOT NULL,
  `ownership` enum('perusahaan','sewa') NOT NULL,
  `fuel` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transport`
--

INSERT INTO `transport` (`id`, `name`, `type`, `ownership`, `fuel`, `created_at`, `updated_at`) VALUES
(1, 'NMAX 2024', 'angkutan_orang', 'perusahaan', '8.20', '2024-06-15 09:31:26', '2024-06-17 07:49:12'),
(4, 'Avanza 2024', 'angkutan_barang', 'perusahaan', '13.00', '2024-06-17 00:33:43', '2024-06-17 00:40:47'),
(5, 'Supra X', 'angkutan_barang', 'sewa', '3.50', '2024-06-17 09:10:49', '2024-06-17 09:11:14'),
(6, 'BEAT 2017', 'angkutan_orang', 'perusahaan', '15.00', '2024-06-17 09:11:42', '2024-06-17 09:29:33'),
(7, 'Excavator (Bego)', 'angkutan_barang', 'perusahaan', '25.00', '2024-06-17 09:12:47', '2024-06-17 09:12:47'),
(8, 'Bulldozer', 'angkutan_barang', 'sewa', '30.00', '2024-06-17 09:13:43', '2024-06-17 09:13:43'),
(9, 'Crane', 'angkutan_barang', 'perusahaan', '24.80', '2024-06-17 09:14:14', '2024-06-17 09:14:14'),
(10, 'Roller', 'angkutan_barang', 'sewa', '22.00', '2024-06-17 09:15:08', '2024-06-17 09:15:08');

-- --------------------------------------------------------

--
-- Table structure for table `usage_histories`
--

CREATE TABLE `usage_histories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `request_id` bigint(20) UNSIGNED NOT NULL,
  `fuel_consumption_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `usage_histories`
--

INSERT INTO `usage_histories` (`id`, `request_id`, `fuel_consumption_id`, `created_at`, `updated_at`) VALUES
(6, 2, 8, '2024-06-16 01:05:11', '2024-06-16 01:05:11'),
(8, 2, 10, '2024-06-16 01:11:03', '2024-06-16 01:11:03'),
(9, 1, 13, '2024-06-16 19:47:15', '2024-06-16 19:47:15'),
(10, 1, 14, '2024-06-16 19:48:03', '2024-06-16 19:48:03'),
(13, 4, 17, '2024-06-16 20:41:18', '2024-06-16 20:41:18'),
(14, 6, 18, '2024-06-17 07:49:12', '2024-06-17 07:49:12'),
(15, 7, 19, '2024-06-17 09:29:33', '2024-06-17 09:29:33');

-- --------------------------------------------------------

--
-- Table structure for table `usage_request`
--

CREATE TABLE `usage_request` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `transport_id` bigint(20) UNSIGNED NOT NULL,
  `driver_id` bigint(20) UNSIGNED NOT NULL,
  `usage_start` datetime NOT NULL,
  `usage_final` datetime NOT NULL,
  `usage_description` varchar(255) NOT NULL,
  `usage_status` enum('belum_digunakan','sedang_digunakan','sudah_digunakan') NOT NULL DEFAULT 'belum_digunakan',
  `request_status` enum('pending','reject','approve') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `usage_request`
--

INSERT INTO `usage_request` (`id`, `transport_id`, `driver_id`, `usage_start`, `usage_final`, `usage_description`, `usage_status`, `request_status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-06-15 15:00:01', '2024-06-15 16:00:00', 'pengantaran unit 2', 'belum_digunakan', 'reject', '2024-06-15 09:32:47', '2024-06-17 06:28:04'),
(2, 1, 1, '2024-06-15 16:00:01', '2024-06-15 17:00:00', 'pengantaran unit 2', 'sedang_digunakan', 'approve', '2024-06-16 00:54:09', '2024-06-17 06:35:27'),
(4, 1, 1, '2024-06-17 01:02:00', '2024-06-18 01:02:00', 'pengantaran unit 1', 'sudah_digunakan', 'reject', '2024-06-16 11:02:37', '2024-06-17 08:57:16'),
(5, 4, 1, '2024-06-17 15:31:00', '2024-06-19 15:31:00', 'pengantaran unit 2', 'belum_digunakan', 'pending', '2024-06-17 01:32:00', '2024-06-17 01:32:00'),
(6, 1, 1, '2024-07-15 16:00:01', '2024-07-15 17:00:00', 'pengantaran', 'sudah_digunakan', 'pending', '2024-06-17 07:47:55', '2024-06-17 07:49:12'),
(7, 6, 6, '2024-06-18 10:27:00', '2024-06-18 11:30:00', 'pengantaran makanan', 'sudah_digunakan', 'pending', '2024-06-17 09:28:27', '2024-06-17 09:29:33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'User1', 'user1@mail.com', NULL, '$2y$10$tbTJ2oRjyBthort65cyT/uYEhLibv.V7imCMzpOMsv.dut6rrFSJu', 'user', NULL, '2024-06-15 09:32:18', '2024-06-17 09:05:09'),
(4, 'admin', 'admin@mail.com', NULL, '$2y$10$9hvdIg3fvEDvjjBkJa3CSut6Fye82cD67.vvysC.BjiOUJ9B5JbPW', 'admin', NULL, '2024-06-16 06:09:54', '2024-06-17 09:05:24'),
(5, 'User2', 'user2@mail.com', NULL, '$2y$10$ajsafOIccgL0CwjYPg5kk.lChasXArVKlkoIRi9jUgzU0dbS0pgW6', 'user', NULL, '2024-06-16 09:21:31', '2024-06-17 09:05:39'),
(7, 'User3', 'user3@mail.com', NULL, '$2y$10$5coWMx8Hpd5IuHbP9gvYxeVi5kGF4MGC3PYqt.3geuK7a5rqvb47m', 'user', NULL, '2024-06-17 09:07:08', '2024-06-17 09:07:08'),
(8, 'User4', 'user4@mail.com', NULL, '$2y$10$jXVLqEINJG3.YVNhkZYrKu1vlYLUMgIojcNScB.dhzp4YUMs32g8C', 'user', NULL, '2024-06-17 09:07:40', '2024-06-17 09:07:40'),
(9, 'User5', 'user5@mail.com', NULL, '$2y$10$iLfzDOdtuTUY2zCiMwRdcOmrF3bce81vQpPWr6gSoB9ixTSiDBEHe', 'user', NULL, '2024-06-17 09:08:11', '2024-06-17 09:08:11'),
(10, 'User6', 'user6@mail.com', NULL, '$2y$10$GjlOSxmfTDMyvyrDDb.OuOZhgMFFc6xD1FclOo3kMgDaz6nfFFNi2', 'user', NULL, '2024-06-17 09:08:44', '2024-06-17 09:08:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `fuel_consumptions`
--
ALTER TABLE `fuel_consumptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `request_detail`
--
ALTER TABLE `request_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `request_detail_request_id_foreign` (`request_id`),
  ADD KEY `request_detail_approver_id_foreign` (`approver_id`);

--
-- Indexes for table `service_schedules`
--
ALTER TABLE `service_schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_schedules_transport_id_foreign` (`transport_id`);

--
-- Indexes for table `transport`
--
ALTER TABLE `transport`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usage_histories`
--
ALTER TABLE `usage_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usage_histories_request_id_foreign` (`request_id`),
  ADD KEY `usage_histories_fuel_consumption_id_foreign` (`fuel_consumption_id`);

--
-- Indexes for table `usage_request`
--
ALTER TABLE `usage_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usage_request_driver_id_foreign` (`driver_id`),
  ADD KEY `usage_request_transport_id_foreign` (`transport_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fuel_consumptions`
--
ALTER TABLE `fuel_consumptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `request_detail`
--
ALTER TABLE `request_detail`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `service_schedules`
--
ALTER TABLE `service_schedules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `transport`
--
ALTER TABLE `transport`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `usage_histories`
--
ALTER TABLE `usage_histories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `usage_request`
--
ALTER TABLE `usage_request`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `request_detail`
--
ALTER TABLE `request_detail`
  ADD CONSTRAINT `request_detail_approver_id_foreign` FOREIGN KEY (`approver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `request_detail_request_id_foreign` FOREIGN KEY (`request_id`) REFERENCES `usage_request` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `service_schedules`
--
ALTER TABLE `service_schedules`
  ADD CONSTRAINT `service_schedules_transport_id_foreign` FOREIGN KEY (`transport_id`) REFERENCES `transport` (`id`);

--
-- Constraints for table `usage_histories`
--
ALTER TABLE `usage_histories`
  ADD CONSTRAINT `usage_histories_fuel_consumption_id_foreign` FOREIGN KEY (`fuel_consumption_id`) REFERENCES `fuel_consumptions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `usage_histories_request_id_foreign` FOREIGN KEY (`request_id`) REFERENCES `usage_request` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `usage_request`
--
ALTER TABLE `usage_request`
  ADD CONSTRAINT `usage_request_driver_id_foreign` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `usage_request_transport_id_foreign` FOREIGN KEY (`transport_id`) REFERENCES `transport` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
