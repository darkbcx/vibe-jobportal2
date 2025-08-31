"use client";

import JobAdItem from "@/components/shared/job-ad-item";
import {
  Search,
  Briefcase,
  Building2,
  Upload,
  UserPlus,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import Link from "next/link";

// Mock data for featured jobs
const featuredJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: {
      name: "TechCorp Inc.",
      logo: undefined,
    },
    location: "San Francisco, CA",
    type: "Full-time",
    salary: {
      min: 120000,
      max: 180000,
      currency: "$",
    },
    postedDate: "2024-01-15",
    isFeatured: true,
    isUrgent: false,
  },
  {
    id: "2",
    title: "Product Manager",
    company: {
      name: "InnovateLab",
      logo: undefined,
    },
    location: "New York, NY",
    type: "Full-time",
    salary: {
      min: 130000,
      max: 200000,
      currency: "$",
    },
    postedDate: "2024-01-14",
    isFeatured: true,
    isUrgent: false,
  },
  {
    id: "3",
    title: "UX Designer",
    company: {
      name: "DesignStudio",
      logo: undefined,
    },
    location: "Remote",
    type: "Contract",
    salary: {
      min: 80000,
      max: 120000,
      currency: "$",
    },
    postedDate: "2024-01-13",
    isFeatured: true,
    isUrgent: false,
  },
  {
    id: "4",
    title: "Data Scientist",
    company: {
      name: "DataFlow Systems",
      logo: undefined,
    },
    location: "Austin, TX",
    type: "Full-time",
    salary: {
      min: 110000,
      max: 160000,
      currency: "$",
    },
    postedDate: "2024-01-12",
    isFeatured: true,
    isUrgent: false,
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: {
      name: "CloudTech Solutions",
      logo: undefined,
    },
    location: "Seattle, WA",
    type: "Full-time",
    salary: {
      min: 100000,
      max: 150000,
      currency: "$",
    },
    postedDate: "2024-01-11",
    isFeatured: true,
    isUrgent: false,
  },
];

// Mock data for job categories
const jobCategories = [
  {
    name: "Technology",
    icon: "💻",
    count: 1247,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  {
    name: "Healthcare",
    icon: "🏥",
    count: 892,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  {
    name: "Finance",
    icon: "💰",
    count: 654,
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  {
    name: "Marketing",
    icon: "📢",
    count: 543,
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
];

// Mock statistics
const statistics = [
  { label: "Jobs Posted", value: "15,432", icon: Briefcase },
  { label: "Companies Hiring", value: "2,847", icon: Building2 },
  { label: "Successful Placements", value: "8,921", icon: Award },
  { label: "Active Users", value: "45,123", icon: Users },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Your Dream Job
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Connect with top companies and discover opportunities that match
            your skills and aspirations
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search for jobs, companies, or keywords..."
                className="w-full pl-12 pr-4 py-4 text-gray-900 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/jobs"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Find Jobs
            </Link>
            <Link
              href="/post-job"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Opportunities
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover top positions from leading companies across various
              industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job) => (
              <JobAdItem
                key={job.id}
                job={job}
                onSave={(jobId) => console.log("Save job:", jobId)}
                onViewDetails={(jobId) =>
                  console.log("View job details:", jobId)
                }
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/featured-jobs"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              <span>View All Featured Jobs</span>
              <TrendingUp className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore jobs by industry and find your perfect match
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {jobCategories.map((category) => (
              <Link
                key={category.name}
                href={`/jobs?category=${category.name.toLowerCase()}`}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {category.count.toLocaleString()} jobs
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/categories"
              className="inline-flex items-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              <span>View All Categories</span>
              <TrendingUp className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get Started
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose your path and take the next step in your career journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/upload-resume"
              className="group bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors duration-200"
            >
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-700 transition-colors">
                <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Upload Resume
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Get discovered by top employers
              </p>
            </Link>

            <Link
              href="/jobs"
              className="group bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors duration-200"
            >
              <div className="bg-green-100 dark:bg-green-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-700 transition-colors">
                <Search className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Search Jobs
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Find your perfect opportunity
              </p>
            </Link>

            <Link
              href="/post-job"
              className="group bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 text-center hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors duration-200"
            >
              <div className="bg-purple-100 dark:bg-purple-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-700 transition-colors">
                <Briefcase className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Post a Job
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Hire the best talent
              </p>
            </Link>

            <Link
              href="/register"
              className="group bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 text-center hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors duration-200"
            >
              <div className="bg-orange-100 dark:bg-orange-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 dark:group-hover:bg-orange-700 transition-colors">
                <UserPlus className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Create Account
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Join our community
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join a growing community of professionals and companies
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="bg-white dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
