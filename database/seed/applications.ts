import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { applications } from '../schema/applications';

export async function seedApplications(
  db: ReturnType<typeof drizzle>,
  jobIds: string[],
  jobSeekerUserIds: string[]
) {
  console.log('📝 Seeding job applications...');

  const applicationsData = [
    // John Doe applications
    {
      jobPostingId: jobIds[0], // Senior Frontend Developer
      jobSeekerId: jobSeekerUserIds[0], // John Doe
      resumeFile: '/uploads/resumes/john_doe_resume.pdf',
      coverLetter: 'Dear Hiring Manager,\n\nI am excited to apply for the Senior Frontend Developer position. With over 6 years of experience in React and TypeScript, I am confident I can contribute to your team\'s success. I have led several projects involving modern web technologies and am passionate about creating exceptional user experiences.\n\nI look forward to discussing how my skills can benefit your organization.\n\nBest regards,\nJohn Doe',
      status: 'shortlisted',
      appliedAt: new Date('2024-01-15T10:30:00Z'),
      reviewedAt: new Date('2024-01-18T14:20:00Z'),
      notes: 'Strong technical background, good portfolio. Scheduled for technical interview.',
      rating: 4.5,
    },
    {
      jobPostingId: jobIds[2], // DevOps Engineer
      jobSeekerId: jobSeekerUserIds[0], // John Doe
      resumeFile: '/uploads/resumes/john_doe_resume.pdf',
      coverLetter: 'Hello,\n\nI am interested in the DevOps Engineer position. While my primary experience is in frontend development, I have worked extensively with CI/CD pipelines and cloud deployment. I am eager to transition into a more infrastructure-focused role.\n\nThank you for your consideration.\n\nJohn Doe',
      status: 'rejected',
      appliedAt: new Date('2024-01-20T09:15:00Z'),
      reviewedAt: new Date('2024-01-22T16:45:00Z'),
      notes: 'Lacks required DevOps experience. Better suited for frontend roles.',
      rating: 2.0,
    },
    // Jane Smith applications
    {
      jobPostingId: jobIds[1], // Product Manager
      jobSeekerId: jobSeekerUserIds[1], // Jane Smith
      resumeFile: '/uploads/resumes/jane_smith_resume.pdf',
      coverLetter: 'Dear Product Team,\n\nI am thrilled to apply for the Product Manager position. My 5+ years of experience in product management, combined with my strong analytical skills and user-focused approach, make me an ideal candidate for this role.\n\nI have successfully launched multiple products and have a proven track record of working with cross-functional teams to deliver results.\n\nLooking forward to hearing from you.\n\nBest,\nJane Smith',
      status: 'interviewed',
      appliedAt: new Date('2024-01-12T14:20:00Z'),
      reviewedAt: new Date('2024-01-15T11:30:00Z'),
      interviewScheduled: new Date('2024-01-25T15:00:00Z'),
      notes: 'Excellent PM experience. Strong communication skills. Proceeding to final round.',
      rating: 4.8,
    },
    {
      jobPostingId: jobIds[4], // UX/UI Designer
      jobSeekerId: jobSeekerUserIds[1], // Jane Smith
      resumeFile: '/uploads/resumes/jane_smith_resume.pdf',
      coverLetter: 'Hi Design Team,\n\nWhile my background is primarily in product management, I have a strong interest in UX/UI design and have worked closely with design teams throughout my career. I would love to transition into a design role.\n\nThank you for considering my application.\n\nJane Smith',
      status: 'reviewing',
      appliedAt: new Date('2024-01-18T16:45:00Z'),
      reviewedAt: new Date('2024-01-19T10:15:00Z'),
      notes: 'Interesting background but lacks formal design experience.',
      rating: 3.0,
    },
    // Mike Johnson applications
    {
      jobPostingId: jobIds[2], // DevOps Engineer
      jobSeekerId: jobSeekerUserIds[2], // Mike Johnson
      resumeFile: '/uploads/resumes/mike_johnson_resume.pdf',
      coverLetter: 'Dear DevOps Team,\n\nI am excited to apply for the DevOps Engineer position. My extensive experience with AWS, Kubernetes, and infrastructure automation aligns perfectly with your requirements. I have successfully scaled systems for high-traffic applications and am passionate about reliability and performance.\n\nI look forward to contributing to your infrastructure team.\n\nBest regards,\nMike Johnson',
      status: 'offered',
      appliedAt: new Date('2024-01-10T11:00:00Z'),
      reviewedAt: new Date('2024-01-12T09:30:00Z'),
      interviewScheduled: new Date('2024-01-20T14:00:00Z'),
      notes: 'Perfect fit for the role. Strong technical skills and great cultural match.',
      rating: 5.0,
    },
    {
      jobPostingId: jobIds[6], // Backend Engineer
      jobSeekerId: jobSeekerUserIds[2], // Mike Johnson
      resumeFile: '/uploads/resumes/mike_johnson_resume.pdf',
      coverLetter: 'Hello,\n\nI am interested in the Backend Engineer position. My DevOps background has given me strong backend development skills, particularly in building scalable APIs and working with microservices.\n\nThank you for your time.\n\nMike Johnson',
      status: 'applied',
      appliedAt: new Date('2024-01-22T13:20:00Z'),
      notes: 'Application pending review.',
    },
    // Sarah Wilson applications
    {
      jobPostingId: jobIds[4], // UX/UI Designer
      jobSeekerId: jobSeekerUserIds[3], // Sarah Wilson
      resumeFile: '/uploads/resumes/sarah_wilson_resume.pdf',
      coverLetter: 'Dear Hiring Team,\n\nI am passionate about creating user-centered designs that solve real problems. My 4+ years of experience in UX/UI design, combined with my strong portfolio, demonstrate my ability to deliver exceptional user experiences.\n\nI would love to bring my creativity and technical skills to your team.\n\nBest,\nSarah Wilson',
      status: 'shortlisted',
      appliedAt: new Date('2024-01-16T12:15:00Z'),
      reviewedAt: new Date('2024-01-19T15:45:00Z'),
      notes: 'Strong portfolio, excellent design skills. Moving to interview stage.',
      rating: 4.3,
    },
    {
      jobPostingId: jobIds[7], // Marketing Manager
      jobSeekerId: jobSeekerUserIds[3], // Sarah Wilson
      resumeFile: '/uploads/resumes/sarah_wilson_resume.pdf',
      coverLetter: 'Hi Marketing Team,\n\nAs a designer, I understand the importance of visual communication in marketing. I would like to explore opportunities to apply my design skills in a marketing context.\n\nThank you for your consideration.\n\nSarah Wilson',
      status: 'rejected',
      appliedAt: new Date('2024-01-21T10:30:00Z'),
      reviewedAt: new Date('2024-01-23T14:15:00Z'),
      notes: 'Design background doesn\'t align with marketing manager requirements.',
      rating: 2.5,
    },
    // David Brown applications
    {
      jobPostingId: jobIds[5], // Data Scientist
      jobSeekerId: jobSeekerUserIds[4], // David Brown
      resumeFile: '/uploads/resumes/david_brown_resume.pdf',
      coverLetter: 'Dear Data Science Team,\n\nI am excited to apply for the Data Scientist position. With my PhD in Statistics and 5+ years of experience in machine learning and data analysis, I am well-equipped to contribute to your data initiatives.\n\nI have published research in top-tier journals and have practical experience implementing ML models in production environments.\n\nLooking forward to discussing this opportunity.\n\nDavid Brown',
      status: 'interviewed',
      appliedAt: new Date('2024-01-08T09:45:00Z'),
      reviewedAt: new Date('2024-01-10T16:20:00Z'),
      interviewScheduled: new Date('2024-01-24T10:30:00Z'),
      notes: 'Impressive academic background and practical experience. Strong candidate.',
      rating: 4.7,
    },
    // Lisa Garcia applications
    {
      jobPostingId: jobIds[7], // Marketing Manager
      jobSeekerId: jobSeekerUserIds[5], // Lisa Garcia
      resumeFile: '/uploads/resumes/lisa_garcia_resume.pdf',
      coverLetter: 'Dear Marketing Team,\n\nI am thrilled to apply for the Marketing Manager position. My 3+ years of experience in digital marketing, combined with my passion for brand building and customer acquisition, make me a strong candidate for this role.\n\nI have successfully managed multi-channel marketing campaigns and have a proven track record of driving growth.\n\nBest regards,\nLisa Garcia',
      status: 'shortlisted',
      appliedAt: new Date('2024-01-14T15:30:00Z'),
      reviewedAt: new Date('2024-01-17T11:45:00Z'),
      notes: 'Good marketing experience, strong campaign management skills.',
      rating: 4.0,
    },
    {
      jobPostingId: jobIds[4], // UX/UI Designer
      jobSeekerId: jobSeekerUserIds[5], // Lisa Garcia
      resumeFile: '/uploads/resumes/lisa_garcia_resume.pdf',
      coverLetter: 'Hello Design Team,\n\nWhile my background is in marketing, I have always been interested in design and user experience. I believe my marketing perspective could bring valuable insights to your design process.\n\nThank you for considering my application.\n\nLisa Garcia',
      status: 'reviewing',
      appliedAt: new Date('2024-01-19T14:20:00Z'),
      notes: 'Interesting cross-functional perspective but lacks design experience.',
      rating: 2.8,
    },
    // Alex Chen applications
    {
      jobPostingId: jobIds[6], // Backend Engineer
      jobSeekerId: jobSeekerUserIds[6], // Alex Chen
      resumeFile: '/uploads/resumes/alex_chen_resume.pdf',
      coverLetter: 'Dear Engineering Team,\n\nI am excited to apply for the Backend Engineer position. My experience with Java, Spring Boot, and microservices architecture aligns well with your requirements. I am passionate about building scalable and reliable systems.\n\nI look forward to contributing to your engineering team.\n\nBest,\nAlex Chen',
      status: 'applied',
      appliedAt: new Date('2024-01-23T11:15:00Z'),
      notes: 'Application recently submitted, pending initial review.',
    },
    // Emily Davis applications
    {
      jobPostingId: jobIds[8], // Software Engineer Intern
      jobSeekerId: jobSeekerUserIds[7], // Emily Davis
      resumeFile: '/uploads/resumes/emily_davis_resume.pdf',
      coverLetter: 'Dear Internship Team,\n\nI am a computer science student eager to gain hands-on experience in software development. This internship opportunity would be perfect for applying my academic knowledge in a real-world setting.\n\nI am excited about the possibility of learning from experienced engineers and contributing to meaningful projects.\n\nThank you for your consideration.\n\nEmily Davis',
      status: 'shortlisted',
      appliedAt: new Date('2024-01-11T08:30:00Z'),
      reviewedAt: new Date('2024-01-14T13:20:00Z'),
      notes: 'Strong academic background, good potential for growth.',
      rating: 4.2,
    },
    {
      jobPostingId: jobIds[3], // Financial Analyst
      jobSeekerId: jobSeekerUserIds[7], // Emily Davis
      resumeFile: '/uploads/resumes/emily_davis_resume.pdf',
      coverLetter: 'Hello,\n\nWhile my degree is in computer science, I have taken several finance courses and am interested in applying analytical skills to financial data. I believe my technical background could be valuable in a modern finance role.\n\nThank you for your time.\n\nEmily Davis',
      status: 'rejected',
      appliedAt: new Date('2024-01-20T16:45:00Z'),
      reviewedAt: new Date('2024-01-22T10:30:00Z'),
      notes: 'CS background doesn\'t align with finance analyst requirements.',
      rating: 2.0,
    },
    // Additional applications for Healthcare Data Analyst
    {
      jobPostingId: jobIds[9], // Healthcare Data Analyst
      jobSeekerId: jobSeekerUserIds[4], // David Brown (Data Scientist applying for healthcare role)
      resumeFile: '/uploads/resumes/david_brown_resume.pdf',
      coverLetter: 'Dear Healthcare Analytics Team,\n\nI am interested in applying my data science skills to healthcare analytics. My statistical background and experience with large datasets would be valuable for improving patient outcomes and operational efficiency.\n\nI am excited about the opportunity to make a meaningful impact in healthcare.\n\nBest regards,\nDavid Brown',
      status: 'reviewing',
      appliedAt: new Date('2024-01-24T14:30:00Z'),
      notes: 'Strong analytical background but needs healthcare domain knowledge.',
      rating: 3.5,
    },
  ];

  await db.insert(applications).values(applicationsData);

  console.log('✅ Job applications seeded successfully!');
}
