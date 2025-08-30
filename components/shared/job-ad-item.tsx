"use client";

import { useState } from "react";
import { Heart, MapPin, Building2, Clock, DollarSign, Calendar } from "lucide-react";

interface JobAdItemProps {
  job: {
    id: string;
    title: string;
    company: {
      name: string;
      logo?: string;
    };
    location: string;
    type: string;
    salary?: {
      min: number;
      max: number;
      currency: string;
    };
    postedDate: string;
    isFeatured?: boolean;
    isUrgent?: boolean;
  };
  isSaved?: boolean;
  onSave?: (jobId: string) => void;
  onViewDetails?: (jobId: string) => void;
}

export default function JobAdItem({ 
  job, 
  isSaved = false, 
  onSave, 
  onViewDetails 
}: JobAdItemProps) {
  const [saved, setSaved] = useState(isSaved);

  const handleSave = () => {
    if (onSave) {
      onSave(job.id);
    }
    setSaved(!saved);
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(job.id);
    }
  };

  const formatSalary = () => {
    if (!job.salary) return "Salary not specified";
    return `${job.salary.currency}${job.salary.min.toLocaleString()} - ${job.salary.currency}${job.salary.max.toLocaleString()}`;
  };

  const formatPostedDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Posted yesterday";
    if (diffDays === 0) return "Posted today";
    return `Posted ${diffDays} days ago`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-700">
      {/* Header with company info and save button */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            {job.company.logo ? (
              <img 
                src={job.company.logo} 
                alt={`${job.company.name} logo`}
                className="h-8 w-8 object-contain"
              />
            ) : (
              <Building2 className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              {job.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {job.company.name}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleSave}
          className={`p-2 rounded-lg transition-colors ${
            saved 
              ? 'text-red-500 hover:text-red-600' 
              : 'text-gray-400 hover:text-red-500'
          }`}
          aria-label={saved ? 'Remove from saved jobs' : 'Save job'}
        >
          <Heart className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Job details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
          <Clock className="h-4 w-4" />
          <span>{job.type}</span>
        </div>
        
        {job.salary && (
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
            <DollarSign className="h-4 w-4" />
            <span>{formatSalary()}</span>
          </div>
        )}
        
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-500 text-sm">
          <Calendar className="h-4 w-4" />
          <span>{formatPostedDate(job.postedDate)}</span>
        </div>
      </div>

      {/* Status indicators */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          {job.isFeatured && (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
              Featured
            </span>
          )}
          {job.isUrgent && (
            <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-medium rounded-full">
              Urgent
            </span>
          )}
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={handleViewDetails}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      >
        See Details
      </button>
    </div>
  );
}
