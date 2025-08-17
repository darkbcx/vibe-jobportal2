CREATE TABLE `job_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`job_posting_id` text NOT NULL,
	`job_seeker_id` text NOT NULL,
	`resume_file` text,
	`cover_letter` text,
	`status` text DEFAULT 'applied' NOT NULL,
	`applied_at` integer NOT NULL,
	`reviewed_at` integer,
	`interview_scheduled` integer,
	`notes` text,
	`rating` real,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`job_posting_id`) REFERENCES `jobs`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`job_seeker_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `companies` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`industry` text NOT NULL,
	`size` text NOT NULL,
	`location` text NOT NULL,
	`website` text,
	`logo_url` text,
	`founded_year` integer,
	`employee_count` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `company_reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`company_id` text NOT NULL,
	`reviewer_id` text NOT NULL,
	`rating` integer NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`pros` text,
	`cons` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `company_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`company_name` text NOT NULL,
	`description` text NOT NULL,
	`industry` text NOT NULL,
	`size` text NOT NULL,
	`location` text NOT NULL,
	`website` text,
	`logo_url` text,
	`founded_year` integer,
	`employee_count` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `job_seeker_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`bio` text,
	`skills` text,
	`experience` text NOT NULL,
	`education` text NOT NULL,
	`location` text NOT NULL,
	`resume_url` text,
	`avatar_url` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'jobseeker' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`company_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`requirements` text,
	`responsibilities` text,
	`salary_min` real,
	`salary_max` real,
	`salary_currency` text DEFAULT 'USD' NOT NULL,
	`location_type` text NOT NULL,
	`state_id` text,
	`city_id` text,
	`district_id` text,
	`job_type` text NOT NULL,
	`experience_level` text NOT NULL,
	`education_level` text,
	`industry_id` text,
	`skills_required` text,
	`benefits` text,
	`application_deadline` integer,
	`status` text DEFAULT 'draft' NOT NULL,
	`views_count` integer DEFAULT 0 NOT NULL,
	`applications_count` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`company_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`state_id`) REFERENCES `states`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`district_id`) REFERENCES `districts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`industry_id`) REFERENCES `industries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `cities` (
	`id` text PRIMARY KEY NOT NULL,
	`state_id` text NOT NULL,
	`name` text NOT NULL,
	`population` integer,
	`latitude` real,
	`longitude` real,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`state_id`) REFERENCES `states`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `districts` (
	`id` text PRIMARY KEY NOT NULL,
	`city_id` text NOT NULL,
	`name` text NOT NULL,
	`postal_code` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `states` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `industries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `job_seeker_saved_jobs` (
	`job_seeker_id` text NOT NULL,
	`job_posting_id` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`job_seeker_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`job_posting_id`) REFERENCES `jobs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `saved_searches` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`query` text NOT NULL,
	`filters` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `search_history` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`query` text NOT NULL,
	`filters` text,
	`results_count` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `states_code_unique` ON `states` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `industries_name_unique` ON `industries` (`name`);