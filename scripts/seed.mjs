import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding GovtPrep India database...');

  // 1. Clean existing records in sequence
  await prisma.testAttempt.deleteMany();
  await prisma.mockTestQuestion.deleteMany();
  await prisma.question.deleteMany();
  await prisma.mockTest.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.jobAlert.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.previousPaper.deleteMany();
  await prisma.syllabus.deleteMany();
  await prisma.answerKey.deleteMany();
  await prisma.admitCard.deleteMany();
  await prisma.result.deleteMany();
  await prisma.article.deleteMany();
  await prisma.studyMaterial.deleteMany();
  await prisma.advertisement.deleteMany();
  await prisma.job.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.jobCategory.deleteMany();
  await prisma.state.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users (Admin & Candidate)
  const hashedAdminPassword = await bcrypt.hash('Admin@123', 10);
  const hashedUserPassword = await bcrypt.hash('User@123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'GovtPrep Admin',
      email: 'admin@govtprep.in',
      password: hashedAdminPassword,
      role: 'ADMIN',
      isVerified: true,
      profile: {
        create: {
          phone: '9876543210',
          qualification: 'Post Graduate',
          state: 'Delhi',
          preferredExams: JSON.stringify(['SSC CGL', 'UPSC CSE']),
          preferredJobTypes: JSON.stringify(['Central Govt']),
          prepStreak: 15,
        },
      },
    },
  });

  const candidate = await prisma.user.create({
    data: {
      name: 'Aspirant Rahul Sharma',
      email: 'aspirant@govtprep.in',
      password: hashedUserPassword,
      role: 'USER',
      isVerified: true,
      profile: {
        create: {
          phone: '9123456780',
          dob: '1998-08-15',
          state: 'Maharashtra',
          district: 'Pune',
          qualification: 'Graduate',
          passingYear: '2023',
          preferredExams: JSON.stringify(['SSC CGL', 'RRB NTPC', 'IBPS PO']),
          preferredJobTypes: JSON.stringify(['Central Govt', 'Banking', 'Railway']),
          preferredStates: JSON.stringify(['Maharashtra', 'Delhi', 'All India']),
          prepStreak: 7,
          targetGoalYear: '2026',
        },
      },
    },
  });

  console.log('✅ Created Admin (admin@govtprep.in) and Candidate (aspirant@govtprep.in)');

  // 3. Create States
  const statesData = [
    { name: 'All India', code: 'IN' },
    { name: 'Maharashtra', code: 'MH' },
    { name: 'Uttar Pradesh', code: 'UP' },
    { name: 'Bihar', code: 'BR' },
    { name: 'Rajasthan', code: 'RJ' },
    { name: 'Delhi', code: 'DL' },
    { name: 'Madhya Pradesh', code: 'MP' },
    { name: 'West Bengal', code: 'WB' },
    { name: 'Karnataka', code: 'KA' },
    { name: 'Tamil Nadu', code: 'TN' },
    { name: 'Gujarat', code: 'GJ' },
    { name: 'Haryana', code: 'HR' },
    { name: 'Punjab', code: 'PB' },
  ];

  const states = {};
  for (const s of statesData) {
    states[s.code] = await prisma.state.create({ data: s });
  }

  // 4. Create Job Categories
  const catData = [
    { name: 'Central Government', slug: 'central-govt', description: 'Central ministry & department vacancies', icon: 'Building2' },
    { name: 'Railway Jobs', slug: 'railway-jobs', description: 'RRB NTPC, ALP, Group D and RPF recruitments', icon: 'Train' },
    { name: 'Banking & Insurance', slug: 'banking-jobs', description: 'SBI, IBPS, RBI, LIC and nationalized bank jobs', icon: 'Landmark' },
    { name: 'Defence & Police', slug: 'defence-police', description: 'Army, Navy, Airforce, CAPF & State Police forces', icon: 'ShieldCheck' },
    { name: 'Teaching & Education', slug: 'teaching-jobs', description: 'CTET, KVS, NVS, State TET & Professor posts', icon: 'GraduationCap' },
    { name: 'State Government', slug: 'state-govt', description: 'State PSC, Revenue, Subordinate staff selections', icon: 'MapPin' },
    { name: 'Engineering & PSU', slug: 'engineering-psu', description: 'GATE PSU, ONGC, IOCL, ISRO, DRDO technical jobs', icon: 'Cpu' },
  ];

  const categories = {};
  for (const c of catData) {
    categories[c.slug] = await prisma.jobCategory.create({ data: c });
  }

  // 5. Create Organizations
  const orgData = [
    { name: 'Staff Selection Commission', shortName: 'SSC', slug: 'ssc', website: 'https://ssc.gov.in', description: 'Apex central recruitment body for non-technical and gazetted group B & C posts.' },
    { name: 'Railway Recruitment Board', shortName: 'RRB', slug: 'rrb', website: 'https://indianrailways.gov.in', description: 'Central authority managing recruitment for Indian Railways.' },
    { name: 'Institute of Banking Personnel Selection', shortName: 'IBPS', slug: 'ibps', website: 'https://ibps.in', description: 'Autonomous recruitment body for public sector banks in India.' },
    { name: 'State Bank of India', shortName: 'SBI', slug: 'sbi', website: 'https://sbi.co.in/careers', description: "India's largest public sector bank conducting PO & Clerk recruitment." },
    { name: 'Union Public Service Commission', shortName: 'UPSC', slug: 'upsc', website: 'https://upsc.gov.in', description: "Constitutional body conducting Civil Services, NDA, CDS and Indian Forest Service exams." },
    { name: 'Maharashtra Public Service Commission', shortName: 'MPSC', slug: 'mpsc', website: 'https://mpsc.gov.in', description: 'State recruitment commission for Maharashtra administration.' },
    { name: 'Uttar Pradesh Police Recruitment Board', shortName: 'UPPRPB', slug: 'upprpb', website: 'https://uppbpb.gov.in', description: 'Police recruitment authority for Uttar Pradesh.' },
    { name: 'Indian Army', shortName: 'Indian Army', slug: 'indian-army', website: 'https://joinindianarmy.nic.in', description: 'Armed forces recruitment for Officers and Agniveers.' },
    { name: 'National Testing Agency', shortName: 'NTA', slug: 'nta', website: 'https://nta.ac.in', description: 'Premier testing organization conducting CTET, UGC NET, JEE and NEET.' },
  ];

  const orgs = {};
  for (const o of orgData) {
    orgs[o.slug] = await prisma.organization.create({ data: o });
  }

  // 6. Create Exams
  const sscCglExam = await prisma.exam.create({
    data: {
      name: 'SSC CGL 2026',
      slug: 'ssc-cgl',
      category: 'SSC',
      organizationId: orgs['ssc'].id,
      frequency: 'Annual',
      officialWebsite: 'https://ssc.gov.in',
      description: 'Combined Graduate Level Examination for recruitment to Group B and Group C posts in various Ministries and Departments.',
      eligibility: 'Bachelor’s Degree in any discipline from a recognized University.',
      ageLimit: '18 to 32 Years (Category-wise age relaxations applicable)',
      isPopular: true,
      upcomingDate: 'September 2026',
      syllabusOverview: 'Tier 1: General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, English Comprehension. Tier 2: Mathematical Abilities, Reasoning & GI, English, GA, Computer Knowledge & Data Entry Speed Test.',
      preparationTips: 'Focus on speed in Math and Accuracy in English. Practice at least 2 full length mock tests every week.',
    },
  });

  const rrbNtpcExam = await prisma.exam.create({
    data: {
      name: 'RRB NTPC 2026',
      slug: 'rrb-ntpc',
      category: 'Railway',
      organizationId: orgs['rrb'].id,
      frequency: 'Periodic',
      officialWebsite: 'https://indianrailways.gov.in',
      description: 'Non-Technical Popular Categories for Station Master, Goods Train Manager, Senior Clerk, Junior Accounts Assistant, etc.',
      eligibility: '12th Pass / Graduate Degree depending on post tier.',
      ageLimit: '18 to 33 Years',
      isPopular: true,
      upcomingDate: 'October 2026',
      syllabusOverview: 'CBT 1: General Awareness (40 Qs), Mathematics (30 Qs), General Intelligence & Reasoning (30 Qs). Total 100 Qs in 90 Minutes.',
    },
  });

  const ibpsPoExam = await prisma.exam.create({
    data: {
      name: 'IBPS PO XIV',
      slug: 'ibps-po',
      category: 'Banking',
      organizationId: orgs['ibps'].id,
      frequency: 'Annual',
      officialWebsite: 'https://ibps.in',
      description: 'Probationary Officer / Management Trainee recruitment across 11 participating public sector banks.',
      eligibility: 'Graduate Degree in any stream.',
      ageLimit: '20 to 30 Years',
      isPopular: true,
      upcomingDate: 'November 2026',
      syllabusOverview: 'Prelims: English (30), Quantitative Aptitude (35), Reasoning Ability (35). Mains: Data Analysis, GA, English, Reasoning & Computer.',
    },
  });

  const upscCseExam = await prisma.exam.create({
    data: {
      name: 'UPSC Civil Services 2026',
      slug: 'upsc-cse',
      category: 'UPSC',
      organizationId: orgs['upsc'].id,
      frequency: 'Annual',
      officialWebsite: 'https://upsc.gov.in',
      description: 'Prestigious national civil services examination for IAS, IPS, IFS, IRS and Central Services Group A.',
      eligibility: 'Graduation in any stream.',
      ageLimit: '21 to 32 Years',
      isPopular: true,
      upcomingDate: 'May 2026',
      syllabusOverview: 'Prelims (GS 1 + CSAT), Mains (9 Descriptive papers), Personality Test / Interview.',
    },
  });

  // 7. Create Jobs
  const jobsData = [
    {
      title: 'SSC CGL 2026 Notification - 17,727 Group B & C Vacancies',
      slug: 'ssc-cgl-recruitment-2026',
      organizationId: orgs['ssc'].id,
      department: 'Central Government Ministries / CAG / CBDT / CBI',
      categoryId: categories['central-govt'].id,
      qualification: 'Graduate',
      vacancies: 17727,
      vacanciesDisplay: '17,727 Posts',
      location: 'All India',
      stateId: states['IN'].id,
      salary: '₹35,400 – ₹1,42,400 (Level 4 to Level 8)',
      jobType: 'Regular / Permanent',
      minAge: 18,
      maxAge: 32,
      applicationFee: 'Gen/OBC/EWS: ₹100, SC/ST/PwD/Women: Nil',
      feeDetails: JSON.stringify({ UR_OBC_EWS: '₹100', SC_ST_PwD_Female: 'Exempted' }),
      applicationStart: new Date('2026-06-24'),
      applicationEnd: new Date('2026-09-30'),
      examDate: 'September / October 2026',
      admitCardDate: '7 Days before Exam',
      resultDate: 'November 2026',
      selectionProcess: 'Tier 1 Computer Based Exam -> Tier 2 Computer Based Exam -> Document Verification',
      examPattern: JSON.stringify([
        { subject: 'General Intelligence & Reasoning', questions: 25, marks: 50, duration: 'Combined 60 Mins' },
        { subject: 'General Awareness', questions: 25, marks: 50, duration: '' },
        { subject: 'Quantitative Aptitude', questions: 25, marks: 50, duration: '' },
        { subject: 'English Comprehension', questions: 25, marks: 50, duration: '' },
      ]),
      vacancyDetails: JSON.stringify([
        { post: 'Assistant Section Officer (CSS)', dept: 'DoPT', vacancies: '982 Posts', gradePay: 'Level 7' },
        { post: 'Inspector of Income Tax', dept: 'CBDT', vacancies: '450 Posts', gradePay: 'Level 7' },
        { post: 'Inspector (Central Excise)', dept: 'CBIC', vacancies: '2,613 Posts', gradePay: 'Level 7' },
        { post: 'Sub Inspector', dept: 'CBI', vacancies: '180 Posts', gradePay: 'Level 7' },
        { post: 'Auditor & Accountant', dept: 'CAG / CGA', vacancies: '4,520 Posts', gradePay: 'Level 5' },
        { post: 'Tax Assistant & UDC', dept: 'CBDT / CBIC', vacancies: '8,982 Posts', gradePay: 'Level 4' },
      ]),
      eligibility: 'Candidate must possess a Bachelor’s Degree in any stream from a recognized University or equivalent qualification by the closing date.',
      applicationProcess: '1. Visit official SSC website ssc.gov.in\n2. Complete One Time Registration (OTR)\n3. Fill online form with live photo & signature upload\n4. Pay application fee through online gateway\n5. Submit and take a printout.',
      officialNotificationUrl: 'https://ssc.gov.in/notifications',
      officialWebsiteUrl: 'https://ssc.gov.in',
      applyUrl: 'https://ssc.gov.in/portal/apply',
      isFeatured: true,
      isUrgent: false,
      status: 'PUBLISHED',
      views: 124500,
      clicks: 34200,
      applyClicks: 21500,
      seoTitle: 'SSC CGL 2026 Notification - 17,727 Posts Apply Online',
      seoDescription: 'Staff Selection Commission (SSC) has released notification for 17,727 Group B & C Vacancies. Check eligibility, exam dates, syllabus and apply online.',
      seoKeywords: 'SSC CGL 2026, SSC CGL Notification, SSC Recruitment, Sarkari Result CGL',
    },
    {
      title: 'SSC MTS & Havaldar Recruitment 2026 - 9,583 Posts (10th Pass)',
      slug: 'ssc-mts-havaldar-recruitment-2026',
      organizationId: orgs['ssc'].id,
      department: 'Central Board of Indirect Taxes & Customs & Central Ministries',
      categoryId: categories['central-govt'].id,
      qualification: '10th Pass',
      vacancies: 9583,
      vacanciesDisplay: '9,583 Posts',
      location: 'All India',
      stateId: states['IN'].id,
      salary: '₹18,000 – ₹56,900 (Pay Level 1)',
      jobType: 'Regular / Permanent',
      minAge: 18,
      maxAge: 27,
      applicationFee: 'Gen/OBC: ₹100, SC/ST/Women: Nil',
      feeDetails: JSON.stringify({ General_OBC: '₹100', Reserved: '₹0' }),
      applicationStart: new Date('2026-06-27'),
      applicationEnd: new Date('2026-10-15'),
      examDate: 'October 2026',
      admitCardDate: 'October 2026',
      selectionProcess: 'Computer Based Examination (Session 1 + Session 2) followed by Physical Efficiency Test (PET/PST for Havaldar only)',
      examPattern: JSON.stringify([
        { subject: 'Numerical & Mathematical Ability', questions: 20, marks: 60, duration: '45 Mins (No Negative)' },
        { subject: 'Reasoning Ability & Problem Solving', questions: 20, marks: 60, duration: '' },
        { subject: 'General Awareness', questions: 25, marks: 75, duration: '45 Mins (1 Mark Negative)' },
        { subject: 'English Language & Comprehension', questions: 25, marks: 75, duration: '' },
      ]),
      vacancyDetails: JSON.stringify([
        { post: 'Multi Tasking Staff (Non-Technical)', dept: 'Various Ministries', vacancies: '6,144 Posts', gradePay: 'Level 1' },
        { post: 'Havaldar', dept: 'CBIC & CBN', vacancies: '3,439 Posts', gradePay: 'Level 1' },
      ]),
      eligibility: 'Must have passed Matriculation (10th Class) Examination from a recognized Board.',
      applicationProcess: 'Complete OTR on ssc.gov.in and fill the online application form.',
      officialNotificationUrl: 'https://ssc.gov.in',
      officialWebsiteUrl: 'https://ssc.gov.in',
      applyUrl: 'https://ssc.gov.in',
      isFeatured: true,
      isUrgent: false,
      status: 'PUBLISHED',
      views: 89400,
      clicks: 28400,
      applyClicks: 19300,
      seoTitle: 'SSC MTS Recruitment 2026 (10th Pass) - 9583 Vacancies Apply',
      seoDescription: 'SSC MTS & Havaldar 2026 recruitment for 10th pass candidates. Apply online for 9,583 posts before last date.',
      seoKeywords: 'SSC MTS 2026, 10th Pass Govt Jobs, SSC Havaldar, Sarkari Naukri 10th',
    },
    {
      title: 'RRB NTPC Recruitment 2026 - 35,280 Posts for Graduates & 12th Pass',
      slug: 'rrb-ntpc-recruitment-2026',
      organizationId: orgs['rrb'].id,
      department: 'Indian Railways (All Zonal Railways)',
      categoryId: categories['railway-jobs'].id,
      qualification: 'Graduate',
      vacancies: 35280,
      vacanciesDisplay: '35,280 Posts',
      location: 'All India',
      stateId: states['IN'].id,
      salary: '₹19,900 – ₹63,200 (Level 2 to Level 6)',
      jobType: 'Regular / Permanent',
      minAge: 18,
      maxAge: 33,
      applicationFee: 'Gen/OBC: ₹500 (₹400 refundable on CBT-1 appearance), SC/ST/Ex-Servicemen/Female: ₹250 (Full refundable)',
      feeDetails: JSON.stringify({ Gen_OBC: '₹500', Reserved: '₹250' }),
      applicationStart: new Date('2026-07-01'),
      applicationEnd: new Date('2026-10-30'),
      examDate: 'December 2026',
      selectionProcess: '1st Stage CBT -> 2nd Stage CBT -> Typing Skill Test / CBAT -> Document Verification & Medical',
      examPattern: JSON.stringify([
        { subject: 'General Awareness', questions: 40, marks: 40, duration: '90 Minutes' },
        { subject: 'Mathematics', questions: 30, marks: 30, duration: '' },
        { subject: 'General Intelligence & Reasoning', questions: 30, marks: 30, duration: '' },
      ]),
      vacancyDetails: JSON.stringify([
        { post: 'Station Master (Level 6)', dept: 'Traffic / Operations', vacancies: '8,450 Posts', gradePay: '₹35,400' },
        { post: 'Goods Train Manager (Level 5)', dept: 'Traffic', vacancies: '7,120 Posts', gradePay: '₹29,200' },
        { post: 'Senior Commercial Clerk (Level 5)', dept: 'Commercial', vacancies: '6,800 Posts', gradePay: '₹29,200' },
        { post: 'Junior Clerk cum Typist (Level 2)', dept: 'Accounts / Personnel', vacancies: '12,910 Posts', gradePay: '₹19,900' },
      ]),
      eligibility: '12th Pass for Under Graduate Posts, Degree for Graduate level posts.',
      officialNotificationUrl: 'https://indianrailways.gov.in',
      officialWebsiteUrl: 'https://indianrailways.gov.in',
      applyUrl: 'https://www.rrbapply.gov.in',
      isFeatured: true,
      isUrgent: true,
      status: 'PUBLISHED',
      views: 215000,
      clicks: 65400,
      applyClicks: 42000,
      seoTitle: 'RRB NTPC Recruitment 2026 - 35,280 Vacancies Apply Online',
      seoDescription: 'Railway Recruitment Board NTPC 2026 notification for 35,280 vacancies. Check syllabus, age limit, qualification and apply online.',
      seoKeywords: 'RRB NTPC 2026, Railway Jobs, Station Master vacancy, Goods Guard',
    },
    {
      title: 'RRB Assistant Loco Pilot (ALP) & Technician - 18,799 Posts',
      slug: 'rrb-alp-technician-recruitment-2026',
      organizationId: orgs['rrb'].id,
      department: 'Mechanical & Electrical Department, Indian Railways',
      categoryId: categories['railway-jobs'].id,
      qualification: 'ITI',
      vacancies: 18799,
      vacanciesDisplay: '18,799 Posts',
      location: 'All India',
      stateId: states['IN'].id,
      salary: '₹19,900 – ₹63,200 + Running Allowance (Level 2)',
      jobType: 'Regular / Permanent',
      minAge: 18,
      maxAge: 30,
      applicationFee: 'Gen/OBC: ₹500, SC/ST/PwD: ₹250',
      applicationStart: new Date('2026-05-10'),
      applicationEnd: new Date('2026-09-25'),
      examDate: 'November 2026',
      selectionProcess: 'CBT 1 -> CBT 2 (Part A + Part B) -> CBAT (Aptitude Test) -> Document Verification',
      examPattern: JSON.stringify([
        { subject: 'Maths, Reasoning, General Science, GA', questions: 75, marks: 75, duration: '60 Minutes (CBT 1)' },
        { subject: 'Part A (Maths, Reasoning, Basic Science & Engg)', questions: 100, marks: 100, duration: '90 Minutes' },
        { subject: 'Part B (Relevant Trade)', questions: 75, marks: 75, duration: '60 Minutes (Qualifying 35%)' },
      ]),
      vacancyDetails: JSON.stringify([
        { post: 'Assistant Loco Pilot (Electrical/Mechanical)', dept: 'Running Staff', vacancies: '14,200 Posts', gradePay: 'Level 2' },
        { post: 'Technician Grade III (Various Trades)', dept: 'Workshops & Sheds', vacancies: '4,599 Posts', gradePay: 'Level 2' },
      ]),
      eligibility: 'Matriculation / 10th Class + ITI / Act Apprenticeship in relevant trade OR Diploma in Mechanical / Electrical / Electronics / Automobile Engg.',
      officialNotificationUrl: 'https://indianrailways.gov.in',
      officialWebsiteUrl: 'https://indianrailways.gov.in',
      applyUrl: 'https://www.rrbapply.gov.in',
      isFeatured: true,
      isUrgent: false,
      status: 'PUBLISHED',
      views: 74500,
      clicks: 21300,
      applyClicks: 14800,
      seoTitle: 'RRB ALP & Technician 2026 (ITI / Diploma) - 18,799 Posts',
      seoDescription: 'Railway ALP recruitment for 18,799 posts. ITI and Diploma holders can apply online at rrbapply.gov.in.',
      seoKeywords: 'RRB ALP 2026, Railway ITI Jobs, Assistant Loco Pilot, Diploma Railway',
    },
    {
      title: 'IBPS Probationary Officer (PO / MT XIV) - 10,500 Vacancies',
      slug: 'ibps-po-recruitment-2026',
      organizationId: orgs['ibps'].id,
      department: '11 Public Sector Banks (PNB, BOB, Canara, Union Bank, etc.)',
      categoryId: categories['banking-jobs'].id,
      qualification: 'Graduate',
      vacancies: 10500,
      vacanciesDisplay: '10,500 Posts',
      location: 'All India',
      stateId: states['IN'].id,
      salary: '₹52,000 – ₹78,000 per month (Gross)',
      jobType: 'Regular / Permanent',
      minAge: 20,
      maxAge: 30,
      applicationFee: 'Gen/OBC/EWS: ₹850, SC/ST/PwD: ₹175',
      applicationStart: new Date('2026-08-01'),
      applicationEnd: new Date('2026-09-28'),
      examDate: 'Prelims: October 2026, Mains: November 2026',
      selectionProcess: 'Online Preliminary Exam -> Online Main Exam -> Common Interview',
      examPattern: JSON.stringify([
        { subject: 'English Language', questions: 30, marks: 30, duration: '20 Mins' },
        { subject: 'Quantitative Aptitude', questions: 35, marks: 35, duration: '20 Mins' },
        { subject: 'Reasoning Ability', questions: 35, marks: 35, duration: '20 Mins' },
      ]),
      vacancyDetails: JSON.stringify([
        { post: 'Punjab National Bank (PNB)', dept: 'Operations', vacancies: '2,900 Posts', gradePay: 'Junior Management Grade Scale I' },
        { post: 'Bank of Baroda', dept: 'Operations', vacancies: '1,800 Posts', gradePay: 'JMGS-I' },
        { post: 'Canara Bank', dept: 'Operations', vacancies: '2,100 Posts', gradePay: 'JMGS-I' },
        { post: 'Union Bank of India', dept: 'Operations', vacancies: '2,000 Posts', gradePay: 'JMGS-I' },
        { post: 'Other Public Sector Banks', dept: 'Various', vacancies: '1,700 Posts', gradePay: 'JMGS-I' },
      ]),
      eligibility: 'A Degree (Graduation) in any discipline from a University recognized by the Govt. of India.',
      officialNotificationUrl: 'https://ibps.in',
      officialWebsiteUrl: 'https://ibps.in',
      applyUrl: 'https://ibps.in',
      isFeatured: true,
      isUrgent: true,
      status: 'PUBLISHED',
      views: 98000,
      clicks: 31000,
      applyClicks: 22000,
      seoTitle: 'IBPS PO Recruitment 2026 - 10500 PO Vacancies Apply Online',
      seoDescription: 'IBPS PO 2026 notification released for 10,500 Bank PO posts. Check eligibility, exam pattern and application process.',
      seoKeywords: 'IBPS PO 2026, Bank PO Vacancy, Bank Jobs, Sarkari Naukri Bank',
    },
    {
      title: 'UP Police Constable Recruitment 2026 - 60,244 Posts (12th Pass)',
      slug: 'up-police-constable-recruitment-2026',
      organizationId: orgs['upprpb'].id,
      department: 'Uttar Pradesh Police Department',
      categoryId: categories['defence-police'].id,
      qualification: '12th Pass',
      vacancies: 60244,
      vacanciesDisplay: '60,244 Posts',
      location: 'Uttar Pradesh',
      stateId: states['UP'].id,
      salary: '₹21,700 – ₹69,100 (Pay Matrix Level 3)',
      jobType: 'Regular / Permanent',
      minAge: 18,
      maxAge: 25,
      applicationFee: 'All Candidates: ₹400',
      applicationStart: new Date('2026-07-15'),
      applicationEnd: new Date('2026-10-20'),
      examDate: 'November 2026',
      selectionProcess: 'Offline OMR Written Examination -> Document Verification & Physical Standard Test (PST) -> Physical Efficiency Test (Running)',
      examPattern: JSON.stringify([
        { subject: 'General Knowledge', questions: 38, marks: 76, duration: 'Combined 2 Hours' },
        { subject: 'General Hindi', questions: 37, marks: 74, duration: '' },
        { subject: 'Numerical & Mental Ability', questions: 38, marks: 76, duration: '' },
        { subject: 'Mental Aptitude / IQ / Reasoning', questions: 37, marks: 74, duration: '' },
      ]),
      vacancyDetails: JSON.stringify([
        { post: 'Police Constable (Civil)', dept: 'Civil Police', vacancies: '48,000 Posts', gradePay: 'Level 3' },
        { post: 'Constable (PAC)', dept: 'Provincial Armed Constabulary', vacancies: '12,244 Posts', gradePay: 'Level 3' },
      ]),
      eligibility: 'Intermediate (12th Pass) from a recognized Board.',
      officialNotificationUrl: 'https://uppbpb.gov.in',
      officialWebsiteUrl: 'https://uppbpb.gov.in',
      applyUrl: 'https://uppbpb.gov.in',
      isFeatured: true,
      isUrgent: true,
      status: 'PUBLISHED',
      views: 340000,
      clicks: 112000,
      applyClicks: 84000,
      seoTitle: 'UP Police Constable Recruitment 2026 - 60244 Posts Apply',
      seoDescription: 'UP Police Constable notification for 60,244 posts for 12th pass male and female candidates. Apply online at uppbpb.gov.in.',
      seoKeywords: 'UP Police Constable 2026, 12th Pass Police Job, UPPRPB Bharti',
    },
    {
      title: 'MPSC Subordinate Services Group B & C Combined Exam 2026',
      slug: 'mpsc-subordinate-group-b-c-2026',
      organizationId: orgs['mpsc'].id,
      department: 'Government of Maharashtra (Revenue, Police, Sales Tax)',
      categoryId: categories['state-govt'].id,
      qualification: 'Graduate',
      vacancies: 1200,
      vacanciesDisplay: '1,200 Posts',
      location: 'Maharashtra',
      stateId: states['MH'].id,
      salary: '₹38,600 – ₹1,22,800 (S-14 & S-15)',
      jobType: 'Regular / Permanent',
      minAge: 19,
      maxAge: 38,
      applicationFee: 'Unreserved: ₹394, Reserved / PwD: ₹294',
      applicationStart: new Date('2026-08-10'),
      applicationEnd: new Date('2026-10-05'),
      examDate: 'November 2026',
      selectionProcess: 'Combined Preliminary Examination -> Mains Examination -> Physical & Interview (for PSI)',
      examPattern: JSON.stringify([
        { subject: 'General Knowledge, Marathi, English, Math & Reasoning', questions: 100, marks: 100, duration: '60 Minutes (Prelims)' },
      ]),
      vacancyDetails: JSON.stringify([
        { post: 'Police Sub Inspector (PSI)', dept: 'Home Dept', vacancies: '450 Posts', gradePay: 'S-14' },
        { post: 'State Tax Inspector (STI)', dept: 'Finance Dept', vacancies: '320 Posts', gradePay: 'S-14' },
        { post: 'Assistant Section Officer (ASO)', dept: 'General Administration', vacancies: '180 Posts', gradePay: 'S-14' },
        { post: 'Sub Registrar / Stamp Inspector', dept: 'Revenue Dept', vacancies: '250 Posts', gradePay: 'S-14' },
      ]),
      eligibility: 'Graduate Degree from a recognized University. Knowledge of Marathi is mandatory.',
      officialNotificationUrl: 'https://mpsc.gov.in',
      officialWebsiteUrl: 'https://mpsc.gov.in',
      applyUrl: 'https://mpsconline.gov.in',
      isFeatured: false,
      isUrgent: false,
      status: 'PUBLISHED',
      views: 45000,
      clicks: 14200,
      applyClicks: 9800,
      seoTitle: 'MPSC Combined Group B & C 2026 - 1200 Posts Apply Online',
      seoDescription: 'Maharashtra Public Service Commission Combined exam for PSI, STI, ASO posts. Download notification and apply online.',
      seoKeywords: 'MPSC 2026, Maharashtra Govt Jobs, MPSC PSI, STI Bharti',
    },
    {
      title: 'Indian Army Agniveer Recruitment Rally 2026 - 25,000 Posts',
      slug: 'indian-army-agniveer-rally-2026',
      organizationId: orgs['indian-army'].id,
      department: 'Ministry of Defence / Indian Army',
      categoryId: categories['defence-police'].id,
      qualification: '10th Pass',
      vacancies: 25000,
      vacanciesDisplay: '25,000+ Posts',
      location: 'All India',
      stateId: states['IN'].id,
      salary: '₹30,000 – ₹40,000 per month + Seva Nidhi Package',
      jobType: 'Agneepath Scheme (4 Years)',
      minAge: 17,
      maxAge: 21,
      applicationFee: 'Examination Fee: ₹250',
      applicationStart: new Date('2026-06-15'),
      applicationEnd: new Date('2026-10-10'),
      examDate: 'October / November 2026',
      selectionProcess: 'Phase 1: Online Common Entrance Exam (CEE) -> Phase 2: Recruitment Rally Physical Fitness Test (PFT) & Medical',
      eligibility: 'Agniveer GD: 10th Pass with 45% aggregate and 33% in each subject. Technical: 12th Pass in Science with PCM & English (50%).',
      officialNotificationUrl: 'https://joinindianarmy.nic.in',
      officialWebsiteUrl: 'https://joinindianarmy.nic.in',
      applyUrl: 'https://joinindianarmy.nic.in',
      isFeatured: false,
      isUrgent: false,
      status: 'PUBLISHED',
      views: 67000,
      clicks: 18900,
      applyClicks: 12400,
      seoTitle: 'Indian Army Agniveer Rally 2026 - 25000 Vacancies Apply',
      seoDescription: 'Join Indian Army as Agniveer General Duty, Technical, Clerk, Tradesman. 10th and 12th pass candidates apply now.',
      seoKeywords: 'Indian Army Agniveer 2026, Army Rally Bharti, 10th Pass Army Job',
    },
    {
      title: 'Central Teacher Eligibility Test (CTET) December 2026 Exam',
      slug: 'ctet-december-2026-notification',
      organizationId: orgs['nta'].id,
      department: 'Central Board of Secondary Education (CBSE)',
      categoryId: categories['teaching-jobs'].id,
      qualification: 'Diploma',
      vacancies: 0,
      vacanciesDisplay: 'Eligibility Certification',
      location: 'All India',
      stateId: states['IN'].id,
      salary: 'Applicable upon appointment (₹35,400 - ₹1,12,400)',
      jobType: 'Teacher Eligibility Certification',
      minAge: 18,
      maxAge: 45,
      applicationFee: 'Single Paper: Gen/OBC ₹1000, SC/ST/PwD ₹500 | Both Papers: Gen/OBC ₹1200, SC/ST/PwD ₹600',
      applicationStart: new Date('2026-08-01'),
      applicationEnd: new Date('2026-10-25'),
      examDate: 'December 13, 2026',
      selectionProcess: 'OMR Based Offline Test (Paper 1 for Primary Stage I-V, Paper 2 for Elementary Stage VI-VIII)',
      eligibility: 'Senior Secondary with at least 50% marks and passed/appearing in 2-year Diploma in Elementary Education / B.El.Ed / B.Ed.',
      officialNotificationUrl: 'https://ctet.nic.in',
      officialWebsiteUrl: 'https://ctet.nic.in',
      applyUrl: 'https://ctet.nic.in',
      isFeatured: false,
      isUrgent: false,
      status: 'PUBLISHED',
      views: 52000,
      clicks: 16700,
      applyClicks: 11000,
      seoTitle: 'CTET December 2026 Notification - Online Application Open',
      seoDescription: 'CBSE CTET December 2026 notification released. Check eligibility, exam dates, paper pattern and apply online.',
      seoKeywords: 'CTET 2026, CTET Notification, Teacher Eligibility Test, CBSE CTET',
    },
  ];

  for (const j of jobsData) {
    await prisma.job.create({ data: j });
  }

  console.log(`✅ Seeded ${jobsData.length} comprehensive Government Jobs`);

  // 8. Create Subjects and Mock Tests & Questions
  const subjectsData = [
    { name: 'Quantitative Aptitude', slug: 'quant' },
    { name: 'General Intelligence & Reasoning', slug: 'reasoning' },
    { name: 'English Language & Comprehension', slug: 'english' },
    { name: 'General Awareness & Current Affairs', slug: 'ga' },
  ];

  const subjects = {};
  for (const sub of subjectsData) {
    subjects[sub.slug] = await prisma.subject.create({ data: sub });
  }

  // Create Questions for SSC CGL & RRB NTPC
  const questionsData = [
    {
      examId: sscCglExam.id,
      subjectId: subjects['quant'].id,
      topic: 'Profit and Loss',
      questionText: 'A shopkeeper marks an article at 40% above the cost price and allows a discount of 25% on the marked price. If his profit is ₹100, what was the cost price of the article?',
      questionTextHi: 'एक दुकानदार किसी वस्तु पर उसके क्रय मूल्य से 40% अधिक अंकित करता है और अंकित मूल्य पर 25% की छूट देता है। यदि उसका लाभ ₹100 है, तो वस्तु का क्रय मूल्य क्या था?',
      optionA: '₹1,800',
      optionB: '₹2,000',
      optionC: '₹2,200',
      optionD: '₹2,500',
      optionAHi: '₹1,800',
      optionBHi: '₹2,000',
      optionCHi: '₹2,200',
      optionDHi: '₹2,500',
      correctAnswer: 'B',
      explanation: 'Let Cost Price (CP) = 100x. Marked Price (MP) = 140x. Selling Price (SP) = 140x * (1 - 0.25) = 140x * 0.75 = 105x. Profit = SP - CP = 105x - 100x = 5x. Given 5x = 100 => x = 20. Therefore, CP = 100 * 20 = ₹2,000.',
      explanationHi: 'माना क्रय मूल्य (CP) = 100x. अंकित मूल्य (MP) = 140x. विक्रय मूल्य (SP) = 140x * 0.75 = 105x. लाभ = 105x - 100x = 5x. दिया गया है 5x = 100 => x = 20. अतः क्रय मूल्य = 100 * 20 = ₹2,000.',
      marks: 2.0,
      negativeMarks: 0.5,
      difficulty: 'MEDIUM',
    },
    {
      examId: sscCglExam.id,
      subjectId: subjects['quant'].id,
      topic: 'Time and Work',
      questionText: 'A can complete a piece of work in 12 days and B can complete the same work in 18 days. They worked together for 4 days, after which A left. In how many more days will B finish the remaining work?',
      questionTextHi: 'A किसी कार्य को 12 दिनों में और B उसी कार्य को 18 दिनों में पूरा कर सकता है। उन्होंने 4 दिनों तक एक साथ कार्य किया, जिसके बाद A ने कार्य छोड़ दिया। B शेष कार्य को कितने और दिनों में पूरा करेगा?',
      optionA: '6 days',
      optionB: '8 days',
      optionC: '10 days',
      optionD: '12 days',
      optionAHi: '6 दिन',
      optionBHi: '8 दिन',
      optionCHi: '10 दिन',
      optionDHi: '12 दिन',
      correctAnswer: 'B',
      explanation: 'Total work = LCM(12, 18) = 36 units. Efficiency of A = 36/12 = 3 units/day. Efficiency of B = 36/18 = 2 units/day. Combined in 4 days = (3 + 2) * 4 = 20 units. Remaining work = 36 - 20 = 16 units. Days needed by B = 16 / 2 = 8 days.',
      explanationHi: 'कुल कार्य = LCM(12, 18) = 36 इकाई। A की कार्यक्षमता = 3 इकाई/दिन, B की कार्यक्षमता = 2 इकाई/दिन। 4 दिनों में किया गया कार्य = 5 * 4 = 20 इकाई। शेष कार्य = 36 - 20 = 16 इकाई। B द्वारा लिया गया समय = 16 / 2 = 8 दिन।',
      marks: 2.0,
      negativeMarks: 0.5,
      difficulty: 'EASY',
    },
    {
      examId: sscCglExam.id,
      subjectId: subjects['reasoning'].id,
      topic: 'Analogies',
      questionText: 'Select the option that is related to the third word in the same way as the second word is related to the first word: "Numismatics : Coins :: Ornithology : ?"',
      questionTextHi: 'उस विकल्प का चयन करें जो तीसरे शब्द से उसी प्रकार संबंधित है जैसे दूसरा शब्द पहले शब्द से संबंधित है: "मुद्राशास्त्र : सिक्के :: पक्षीविज्ञान : ?"',
      optionA: 'Fossils',
      optionB: 'Birds',
      optionC: 'Insects',
      optionD: 'Plants',
      optionAHi: 'जीवाश्म',
      optionBHi: 'पक्षी',
      optionCHi: 'कीट',
      optionDHi: 'पौधे',
      correctAnswer: 'B',
      explanation: 'Numismatics is the scientific study of coins. Similarly, Ornithology is the scientific study of birds.',
      explanationHi: 'मुद्राशास्त्र सिक्कों का वैज्ञानिक अध्ययन है। उसी प्रकार पक्षीविज्ञान (Ornithology) पक्षियों का वैज्ञानिक अध्ययन है।',
      marks: 2.0,
      negativeMarks: 0.5,
      difficulty: 'EASY',
    },
    {
      examId: sscCglExam.id,
      subjectId: subjects['reasoning'].id,
      topic: 'Coding-Decoding',
      questionText: 'In a certain code language, if "MASTER" is coded as "OCUVGT", how will "DOCTOR" be coded in that same language?',
      questionTextHi: 'एक निश्चित कूट भाषा में, यदि "MASTER" को "OCUVGT" लिखा जाता है, तो उसी कूट भाषा में "DOCTOR" को कैसे लिखा जाएगा?',
      optionA: 'FQEVQT',
      optionB: 'FQEWQT',
      optionC: 'FQEVQS',
      optionD: 'EPDUPS',
      optionAHi: 'FQEVQT',
      optionBHi: 'FQEWQT',
      optionCHi: 'FQEVQS',
      optionDHi: 'EPDUPS',
      correctAnswer: 'A',
      explanation: 'Each letter is shifted forward by +2 positions: D(+2)->F, O(+2)->Q, C(+2)->E, T(+2)->V, O(+2)->Q, R(+2)->T = FQEVQT.',
      explanationHi: 'प्रत्येक अक्षर में +2 जोड़ा गया है: D(+2)=F, O(+2)=Q, C(+2)=E, T(+2)=V, O(+2)=Q, R(+2)=T => FQEVQT.',
      marks: 2.0,
      negativeMarks: 0.5,
      difficulty: 'EASY',
    },
    {
      examId: sscCglExam.id,
      subjectId: subjects['ga'].id,
      topic: 'Indian Polity',
      questionText: 'Which Article of the Constitution of India provides for the "Right to Constitutional Remedies"?',
      questionTextHi: 'भारत के संविधान का कौन सा अनुच्छेद "संवैधानिक उपचारों के अधिकार" का प्रावधान करता है?',
      optionA: 'Article 21',
      optionB: 'Article 30',
      optionC: 'Article 32',
      optionD: 'Article 44',
      optionAHi: 'अनुच्छेद 21',
      optionBHi: 'अनुच्छेद 30',
      optionCHi: 'अनुच्छेद 32',
      optionDHi: 'अनुच्छेद 44',
      correctAnswer: 'C',
      explanation: 'Article 32 confers the Right to Constitutional Remedies to move the Supreme Court by appropriate proceedings for the enforcement of Fundamental Rights. Dr. B.R. Ambedkar termed it the "Heart and Soul of the Constitution".',
      explanationHi: 'अनुच्छेद 32 मौलिक अधिकारों के प्रवर्तन के लिए सर्वोच्च न्यायालय में याचिका दायर करने का अधिकार प्रदान करता है। डॉ. बी.आर. अंबेडकर ने इसे "संविधान का हृदय और आत्मा" कहा था।',
      marks: 2.0,
      negativeMarks: 0.5,
      difficulty: 'EASY',
    },
    {
      examId: sscCglExam.id,
      subjectId: subjects['ga'].id,
      topic: 'Indian Geography',
      questionText: 'Which is the longest national highway in India connecting Srinagar to Kanyakumari?',
      questionTextHi: 'श्रीनगर को कन्याकुमारी से जोड़ने वाला भारत का सबसे लंबा राष्ट्रीय राजमार्ग कौन सा है?',
      optionA: 'NH 27',
      optionB: 'NH 44',
      optionC: 'NH 48',
      optionD: 'NH 53',
      optionAHi: 'NH 27',
      optionBHi: 'NH 44',
      optionCHi: 'NH 48',
      optionDHi: 'NH 53',
      correctAnswer: 'B',
      explanation: 'National Highway 44 (NH 44) is the longest highway in India spanning over 3,745 km from Srinagar in Jammu & Kashmir to Kanyakumari in Tamil Nadu.',
      explanationHi: 'राष्ट्रीय राजमार्ग 44 (NH 44) भारत का सबसे लंबा राजमार्ग है, जिसकी लंबाई 3,745 किमी है और यह श्रीनगर से कन्याकुमारी तक फैला है।',
      marks: 2.0,
      negativeMarks: 0.5,
      difficulty: 'EASY',
    },
    {
      examId: sscCglExam.id,
      subjectId: subjects['english'].id,
      topic: 'Idioms & Phrases',
      questionText: 'Select the most appropriate meaning of the given idiom: "To burn the midnight oil"',
      questionTextHi: 'दिए गए मुहावरे का सबसे उपयुक्त अर्थ चुनें: "To burn the midnight oil"',
      optionA: 'To waste resources carelessly',
      optionB: 'To work or study late into the night',
      optionC: 'To light candles during power cuts',
      optionD: 'To cause an accidental fire',
      optionAHi: 'संसाधनों को लापरवाही से बर्बाद करना',
      optionBHi: 'देर रात तक कड़ी मेहनत या पढ़ाई करना',
      optionCHi: 'मोमबत्तियां जलाना',
      optionDHi: 'आग लगाना',
      correctAnswer: 'B',
      explanation: '"To burn the midnight oil" means to work late into the night, especially while preparing for examinations or important tasks.',
      explanationHi: '"To burn the midnight oil" का अर्थ देर रात तक कठिन परिश्रम या अध्ययन करना होता है।',
      marks: 2.0,
      negativeMarks: 0.5,
      difficulty: 'EASY',
    },
    {
      examId: sscCglExam.id,
      subjectId: subjects['english'].id,
      topic: 'Spotting Errors',
      questionText: 'Identify the segment in the sentence which contains a grammatical error: "Neither of the two candidates who appeared for the interview were selected."',
      questionTextHi: 'वाक्य में व्याकरण संबंधी त्रुटि वाले भाग की पहचान करें: "Neither of the two candidates who appeared for the interview were selected."',
      optionA: 'Neither of the two candidates',
      optionB: 'who appeared for the interview',
      optionC: 'were selected',
      optionD: 'No error',
      optionAHi: 'Neither of the two candidates',
      optionBHi: 'who appeared for the interview',
      optionCHi: 'were selected',
      optionDHi: 'No error',
      correctAnswer: 'C',
      explanation: '"Neither of" is followed by a plural noun but takes a singular verb. Hence, "were selected" must be replaced with "was selected".',
      explanationHi: '"Neither of" के साथ हमेशा एकवचन क्रिया (singular verb) का प्रयोग होता है। इसलिए "were selected" के स्थान पर "was selected" आएगा।',
      marks: 2.0,
      negativeMarks: 0.5,
      difficulty: 'MEDIUM',
    },
  ];

  const createdQuestions = [];
  for (const q of questionsData) {
    const created = await prisma.question.create({ data: q });
    createdQuestions.push(created);
  }

  // Create Mock Tests
  const mockTest1 = await prisma.mockTest.create({
    data: {
      title: 'SSC CGL Tier 1 Full Length Mock Test #01 (Free All-India Live)',
      slug: 'ssc-cgl-tier-1-all-india-mock-1',
      examId: sscCglExam.id,
      description: 'Full simulation test based on latest 2026 pattern with sectional timing, percentile rating and detailed bilingual step-by-step solutions.',
      durationMinutes: 60,
      totalQuestions: questionsData.length,
      totalMarks: questionsData.length * 2,
      passingMarks: 10.0,
      difficulty: 'Moderate',
      isFree: true,
      attemptsCount: 1420,
    },
  });

  const mockTest2 = await prisma.mockTest.create({
    data: {
      title: 'RRB NTPC CBT 1 Mega Mock Test (General Awareness & Math)',
      slug: 'rrb-ntpc-cbt-1-mega-mock-test',
      examId: rrbNtpcExam.id,
      description: 'Comprehensive Railway standard mock test for Station Master, Goods Guard, and Commercial Clerk aspirants.',
      durationMinutes: 45,
      totalQuestions: questionsData.length,
      totalMarks: questionsData.length * 2,
      passingMarks: 8.0,
      difficulty: 'Easy-Moderate',
      isFree: true,
      attemptsCount: 980,
    },
  });

  // Link questions to mock tests
  for (let i = 0; i < createdQuestions.length; i++) {
    await prisma.mockTestQuestion.create({
      data: {
        mockTestId: mockTest1.id,
        questionId: createdQuestions[i].id,
        order: i + 1,
      },
    });
    await prisma.mockTestQuestion.create({
      data: {
        mockTestId: mockTest2.id,
        questionId: createdQuestions[i].id,
        order: i + 1,
      },
    });
  }

  // Create Sample Completed Test Attempt for Candidate
  await prisma.testAttempt.create({
    data: {
      userId: candidate.id,
      mockTestId: mockTest1.id,
      score: 12.5,
      totalMarks: 16.0,
      percentage: 78.1,
      correctCount: 7,
      incorrectCount: 1,
      skippedCount: 0,
      accuracy: 87.5,
      timeTakenSeconds: 1420,
      answersJson: JSON.stringify({
        [createdQuestions[0].id]: { chosenAnswer: 'B', isCorrect: true, timeSpent: 120 },
        [createdQuestions[1].id]: { chosenAnswer: 'B', isCorrect: true, timeSpent: 110 },
        [createdQuestions[2].id]: { chosenAnswer: 'B', isCorrect: true, timeSpent: 45 },
        [createdQuestions[3].id]: { chosenAnswer: 'A', isCorrect: true, timeSpent: 60 },
        [createdQuestions[4].id]: { chosenAnswer: 'C', isCorrect: true, timeSpent: 30 },
        [createdQuestions[5].id]: { chosenAnswer: 'B', isCorrect: true, timeSpent: 35 },
        [createdQuestions[6].id]: { chosenAnswer: 'B', isCorrect: true, timeSpent: 40 },
        [createdQuestions[7].id]: { chosenAnswer: 'A', isCorrect: false, timeSpent: 80 },
      }),
    },
  });

  // 9. Create Results, Admit Cards, and Answer Keys
  const resultsData = [
    {
      title: 'SSC CHSL 2025 Tier 1 Final Result & Cutoff Marks Released',
      slug: 'ssc-chsl-2025-tier-1-result-cutoff',
      examId: sscCglExam.id,
      organizationId: orgs['ssc'].id,
      resultDate: new Date('2026-08-28'),
      examDate: 'July 2026',
      cutoffDetails: 'UR: 153.25, OBC: 150.10, EWS: 148.50, SC: 136.20, ST: 124.80',
      meritListUrl: 'https://ssc.gov.in/results/chsl-2025',
      officialResultUrl: 'https://ssc.gov.in',
      status: 'ANNOUNCED',
    },
    {
      title: 'UPSC Civil Services (Prelims) 2026 Result & Qualified Roll Numbers',
      slug: 'upsc-civil-services-prelims-2026-result',
      examId: upscCseExam.id,
      organizationId: orgs['upsc'].id,
      resultDate: new Date('2026-08-20'),
      examDate: 'May 26, 2026',
      cutoffDetails: 'General Cutoff expected 87.5 Marks. Over 14,600 candidates qualified for Mains.',
      meritListUrl: 'https://upsc.gov.in',
      officialResultUrl: 'https://upsc.gov.in',
      status: 'ANNOUNCED',
    },
    {
      title: 'IBPS RRB Clerk (Office Assistant) Prelims 2026 Result Declared',
      slug: 'ibps-rrb-clerk-prelims-result-2026',
      organizationId: orgs['ibps'].id,
      resultDate: new Date('2026-08-30'),
      examDate: 'August 2026',
      cutoffDetails: 'State-wise cutoff varies between 68 to 76 marks out of 80.',
      officialResultUrl: 'https://ibps.in',
      status: 'ANNOUNCED',
    },
  ];

  for (const r of resultsData) {
    await prisma.result.create({ data: r });
  }

  const admitCardsData = [
    {
      title: 'SSC CGL 2026 Tier 1 Admit Card & Application Status (All Regions)',
      slug: 'ssc-cgl-2026-tier-1-admit-card',
      examId: sscCglExam.id,
      organizationId: orgs['ssc'].id,
      examDate: 'September 12 – 26, 2026',
      releaseDate: new Date('2026-09-01'),
      applicationRequirements: 'Registration Number / Roll Number & Date of Birth',
      downloadUrl: 'https://ssc.gov.in',
      status: 'AVAILABLE',
    },
    {
      title: 'IBPS PO Prelims 2026 Call Letter / Admit Card Download',
      slug: 'ibps-po-prelims-call-letter-2026',
      examId: ibpsPoExam.id,
      organizationId: orgs['ibps'].id,
      examDate: 'October 19 & 20, 2026',
      releaseDate: new Date('2026-09-02'),
      applicationRequirements: 'Registration No / Roll No and Password / DOB',
      downloadUrl: 'https://ibps.in',
      status: 'AVAILABLE',
    },
    {
      title: 'UP Police Constable Re-Exam 2026 City Intimation Slip & Admit Card',
      slug: 'up-police-constable-admit-card-2026',
      organizationId: orgs['upprpb'].id,
      examDate: 'August 23 – 31, 2026',
      releaseDate: new Date('2026-08-18'),
      applicationRequirements: 'Application Registration Number and DOB',
      downloadUrl: 'https://uppbpb.gov.in',
      status: 'AVAILABLE',
    },
  ];

  for (const a of admitCardsData) {
    await prisma.admitCard.create({ data: a });
  }

  const answerKeysData = [
    {
      title: 'SSC MTS 2025 Provisional Answer Key & Candidate Response Sheet',
      slug: 'ssc-mts-2025-answer-key',
      examId: sscCglExam.id,
      organizationId: orgs['ssc'].id,
      releaseDate: new Date('2026-08-25'),
      objectionDeadline: 'September 05, 2026 (5:00 PM)',
      pdfUrl: 'https://ssc.gov.in',
      objectionUrl: 'https://ssc.gov.in/objection',
      status: 'ACTIVE',
    },
    {
      title: 'CTET July 2026 Official Answer Key & Question Paper with Responses',
      slug: 'ctet-july-2026-official-answer-key',
      organizationId: orgs['nta'].id,
      releaseDate: new Date('2026-08-20'),
      objectionDeadline: 'August 31, 2026',
      pdfUrl: 'https://ctet.nic.in',
      status: 'CLOSED',
    },
  ];

  for (const ak of answerKeysData) {
    await prisma.answerKey.create({ data: ak });
  }

  // 10. Create Syllabus and Previous Papers
  await prisma.syllabus.create({
    data: {
      title: 'SSC CGL Tier 1 & Tier 2 Detailed Syllabus & Subject-Wise Marks Weightage',
      slug: 'ssc-cgl-complete-syllabus',
      examId: sscCglExam.id,
      tier: 'Tier 1 & Tier 2',
      content: `# SSC CGL Complete Examination Syllabus 2026

## Tier-I Examination Pattern
The Tier-I exam consists of 100 multiple choice questions carrying 200 marks, with a total composite time of 60 minutes (80 minutes for PwD).

### 1. General Intelligence & Reasoning (25 Qs / 50 Marks)
- Analogies, Similarities and Differences
- Space Visualization, Spatial Orientation
- Problem Solving, Analysis, Judgment, Decision Making
- Visual Memory, Discrimination, Observation
- Relationship Concepts, Arithmetical Reasoning, Figural Classification
- Arithmetic Number Series, Non-verbal Series, Coding and Decoding

### 2. General Awareness (25 Qs / 50 Marks)
- Current Events of National and International Importance
- History, Culture, Geography, Economic Scene
- General Policy and Scientific Research
- Indian Constitution & Governance

### 3. Quantitative Aptitude (25 Qs / 50 Marks)
- Computation of Whole Numbers, Decimals, Fractions
- Percentages, Ratio & Proportion, Square Roots, Averages
- Interest (Simple and Compound), Profit and Loss, Discount, Partnership Business
- Mixture and Alligation, Time and Distance, Time & Work
- Basic algebraic identities, Elementary surds, Graphs of Linear Equations
- Triangles and its kinds of centres, Congruence and similarity, Circles, Chords, Tangents
- Trigonometric ratios, Standard Identities, Heights and Distances, Histograms & Polygons

### 4. English Comprehension (25 Qs / 50 Marks)
- Spot the Error, Fill in the Blanks, Synonyms/Antonyms
- Spellings/Detecting Mis-spelt words, Idioms & Phrases
- One Word Substitution, Improvement of Sentences
- Active/Passive Voice, Direct/Indirect Narration, Cloze Passage & Comprehension Passage.`,
    },
  });

  await prisma.previousPaper.create({
    data: {
      title: 'SSC CGL 2024 Tier 1 Official Question Paper with Solutions (All 39 Shifts)',
      slug: 'ssc-cgl-2024-tier-1-papers',
      examId: sscCglExam.id,
      year: 2024,
      subject: 'Combined All 4 Sections',
      shift: 'Shift 1, 2, 3 & 4',
      language: 'Hindi & English',
      pdfUrl: 'https://govtprep.in/downloads/ssc-cgl-2024.pdf',
      solutionPdfUrl: 'https://govtprep.in/downloads/ssc-cgl-2024-solutions.pdf',
      questionsCount: 3900,
    },
  });

  // 11. Create Current Affairs & Study Material
  const articlesData = [
    {
      title: 'Daily Current Affairs: 03 September 2026 - National & International Highlights',
      slug: 'daily-current-affairs-03-september-2026',
      excerpt: 'Comprehensive daily capsule covering Cabinet decisions, ISRO space milestones, RBI regulatory updates and international summits.',
      content: `## Daily Current Affairs Digest: 03 September 2026

### 1. National: Union Cabinet approves New National Logistics Policy Framework
The Union Cabinet chaired by the Prime Minister has approved the expanded multimodal logistics connectivity network targeting a reduction in logistics costs from 14% of GDP to under 9% by 2030.
- **Key Ministry involved:** Ministry of Commerce & Industry.
- **Significance for Exams:** Critical for SSC CGL Tier 2 General Awareness and UPSC GS Paper 3.

### 2. Science & Tech: ISRO successfully launches Next-Gen NavIC Satellite
The Indian Space Research Organisation (ISRO) successfully placed the NVS-02 navigation satellite into Geosynchronous Transfer Orbit using the GSLV-F14 launch vehicle from Satish Dhawan Space Centre, Sriharikota.
- **Payload frequency bands:** L1, L5, and S-band signals for civilian positioning accuracy.

### 3. Economy: RBI releases Updated Monetary Policy Committee (MPC) Minutes
The Reserve Bank of India maintained the benchmark Repo Rate unchanged at 6.50% emphasizing disinflation trajectory alignment towards the 4% median target.

### 4. Sports: India clinches Gold at Asian Athletics Championship 2026
Indian javelin throwers and 4x400m relay teams secured top podium finishes on the final day of competition.`,
      category: 'National',
      tags: 'Current Affairs, ISRO, RBI, Union Cabinet, Asian Athletics',
      isDaily: true,
      isFeatured: true,
      views: 3200,
    },
    {
      title: 'Major Government Welfare Schemes 2026: Complete Summary for SSC & Banking',
      slug: 'major-government-welfare-schemes-2026',
      excerpt: 'A complete consolidated list of central government flagship schemes, nodal ministries, financial allocations and target beneficiaries.',
      content: `## Flagship Central Government Schemes Summary 2026

1. **PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)**
- Launch: February 2019
- Nodal Ministry: Ministry of Agriculture & Farmers Welfare
- Financial Benefit: ₹6,000 per year in three equal tranches of ₹2,000 directly to Aadhaar-linked bank accounts.

2. **Ayushman Bharat - PM-JAY**
- World's largest government-funded healthcare assurance scheme.
- Health cover of ₹5 Lakhs per family per year for secondary and tertiary hospitalization.

3. **PM Awas Yojana (PMAY-Urban & Gramin)**
- Assistance provided for pucca house construction with basic amenities.`,
      category: 'Schemes',
      tags: 'Govt Schemes, PM Kisan, Ayushman Bharat, Welfare',
      isWeekly: true,
      isFeatured: true,
      views: 5800,
    },
  ];

  for (const art of articlesData) {
    await prisma.article.create({ data: art });
  }

  const studyMaterialData = [
    {
      title: 'Quantitative Aptitude: Shortcuts for Percentage, Profit & Loss and Compound Interest',
      slug: 'quantitative-aptitude-shortcuts-profit-loss',
      category: 'Quantitative Aptitude',
      subject: 'Mathematics',
      author: 'GovtPrep Math Faculty',
      readTime: '10 min read',
      content: `## Essential Formulae & Fast Fraction Conversions

### Fraction to Percentage Cheat Sheet:
- 1/2 = 50%
- 1/3 = 33.33% (33 1/3%)
- 1/4 = 25%
- 1/5 = 20%
- 1/6 = 16.67% (16 2/3%)
- 1/7 = 14.28% (14 2/7%)
- 1/8 = 12.5% (12 1/2%)
- 1/9 = 11.11% (11 1/9%)
- 1/11 = 9.09% (9 1/11%)
- 1/12 = 8.33% (8 1/3%)

### Successive Percentage Formula
Effective Percentage Change = a + b + (a * b) / 100
- If discount of 20% and 10% are given successively:
- Effective Discount = -20 - 10 + (-20 * -10)/100 = -30 + 2 = -28% (28% single equivalent discount).`,
      views: 14200,
    },
    {
      title: 'Reasoning Ability: Master Syllogism (Rules, Venn Diagrams & Possibility Cases)',
      slug: 'reasoning-syllogism-mastery',
      category: 'Reasoning',
      subject: 'General Intelligence',
      author: 'GovtPrep Editorial Team',
      readTime: '8 min read',
      content: `## Syllogism Rules Simplified

### Standard Categorical Propositions:
1. **Universal Positive (A):** "All A are B" (100% inclusion)
2. **Universal Negative (E):** "No A is B" (0% intersection)
3. **Particular Positive (I):** "Some A are B" (>0% to <100%)
4. **Particular Negative (O):** "Some A are not B"

### Key Principles for "Possibility" Questions:
- If no direct negative statement is given between two elements, ANY possibility between them is TRUE as long as it doesn't violate existing definite statements.
- "All A being B is a possibility" is TRUE if "Some A are B" is given and No A is B is not restricted.`,
      views: 9400,
    },
  ];

  for (const sm of studyMaterialData) {
    await prisma.studyMaterial.create({ data: sm });
  }

  // 12. Create Advertisements (Google Ad ready slots)
  await prisma.advertisement.create({
    data: {
      name: 'Homepage Top Sponsor Banner',
      placement: 'TOP_BANNER',
      imageUrl: '/images/ads/banner-top.png',
      targetUrl: 'https://govtprep.in/mock-tests',
      isActive: true,
      impressions: 45000,
      clicks: 1200,
    },
  });

  await prisma.advertisement.create({
    data: {
      name: 'Job Page Sidebar Ad Slot',
      placement: 'JOB_SIDEBAR',
      imageUrl: '/images/ads/sidebar.png',
      targetUrl: 'https://govtprep.in/study-material',
      isActive: true,
      impressions: 21000,
      clicks: 650,
    },
  });

  // 13. Create Job Alert & Bookmark for Candidate
  const sscJob = await prisma.job.findFirst({ where: { slug: 'ssc-cgl-recruitment-2026' } });
  if (sscJob) {
    await prisma.bookmark.create({
      data: {
        userId: candidate.id,
        itemType: 'JOB',
        itemId: sscJob.id,
        itemTitle: sscJob.title,
        itemSlug: sscJob.slug,
      },
    });

    await prisma.jobAlert.create({
      data: {
        userId: candidate.id,
        name: 'Maharashtra & Central Graduate Jobs',
        qualification: 'Graduate',
        state: 'Maharashtra',
        category: 'Central Government',
        emailNotification: true,
        inAppNotification: true,
        isActive: true,
      },
    });

  }

  // ==========================================
  // SEED TECH & IT JOBS
  // ==========================================
  console.log('Seeding Tech & IT Jobs...');
  const techJobsData = [
    {
      title: 'ISRO Scientist / Engineer ‘SC’ (Computer Science & IT)',
      slug: 'isro-scientist-engineer-sc-computer-science-2026',
      company: 'ISRO (Indian Space Research Organisation)',
      location: 'Bengaluru / Thiruvananthapuram',
      workMode: 'Onsite',
      experienceLevel: 'Fresher (0-1 Yrs)',
      salaryRange: '₹56,100 – ₹1,77,500 (Level 10 Pay Matrix + DA/HRA)',
      ctcNumeric: 15.6,
      roleCategory: 'Software Engineering',
      techStack: 'C++, Python, Linux, Embedded Systems, Computer Networks',
      jobType: 'Full Time (Central Govt Gazetted Group A)',
      description: 'ISRO Centralised Recruitment Board (ICRB) invites online applications for Scientist/Engineer ‘SC’ (Computer Science) posts at various ISRO/DOS Centres.',
      requirements: 'B.E/B.Tech in Computer Science & Engineering with minimum 65% marks or 6.84 CGPA. Valid GATE score or ICRB written test qualification.',
      eligibility: 'B.Tech / B.E. (CSE / IT)',
      applyUrl: 'https://isro.gov.in',
      isFeatured: true,
      isPsuGovt: true,
      status: 'PUBLISHED',
    },
    {
      title: 'NIC Scientist-B & Scientific Officer (National Informatics Centre)',
      slug: 'nic-scientist-b-it-recruitment-2026',
      company: 'National Informatics Centre (NIC / MeitY)',
      location: 'New Delhi / All India State Centres',
      workMode: 'Hybrid',
      experienceLevel: 'Fresher (0-2 Yrs)',
      salaryRange: '₹56,100 – ₹1,77,500 (Level 10)',
      ctcNumeric: 14.8,
      roleCategory: 'Cloud & DevOps',
      techStack: 'Java, Spring Boot, PostgreSQL, Docker, Kubernetes, AWS/GovCloud',
      jobType: 'Full Time',
      description: 'Ministry of Electronics & Information Technology (MeitY) recruitment for NIC Scientist-B to architect e-governance systems and cloud infrastructure.',
      requirements: 'Bachelor in Technology (B.Tech / B.E.) in CSE, IT, Electronics, or Master in Computer Applications (MCA).',
      eligibility: 'B.Tech / MCA / M.Sc (CS)',
      applyUrl: 'https://nic.in',
      isFeatured: true,
      isPsuGovt: true,
      status: 'PUBLISHED',
    },
    {
      title: 'TCS NQT 2026 - National Qualifier Test (Ninja & Digital Roles)',
      slug: 'tcs-nqt-recruitment-2026',
      company: 'Tata Consultancy Services (TCS)',
      location: 'PAN India (Bangalore, Hyderabad, Pune, Mumbai, Chennai, Noida)',
      workMode: 'Hybrid',
      experienceLevel: 'Fresher (0-1 Yrs)',
      salaryRange: '₹3.6 LPA (Ninja) – ₹9.0 LPA (Digital/Prime)',
      ctcNumeric: 9.0,
      roleCategory: 'Software Engineering',
      techStack: 'Java, Python, C++, SQL, Cloud Fundamentals',
      jobType: 'Full Time',
      description: 'TCS National Qualifier Test (NQT) for graduating batches (2025/2026). Open to all engineering, science, and diploma graduates across India.',
      requirements: 'B.Tech / B.E. / M.Tech / MCA / B.Sc / BCA from recognized universities with minimum 60% throughout academics.',
      eligibility: 'Graduating Batch & Freshers',
      applyUrl: 'https://tcs.com/careers',
      isFeatured: true,
      isPsuGovt: false,
      status: 'PUBLISHED',
    },
    {
      title: 'Full Stack Engineer - React & Node.js (SDE-1)',
      slug: 'zomato-sde-1-fullstack-engineer',
      company: 'Zomato / Blinkit Tech',
      location: 'Gurugram / Bangalore (Hybrid)',
      workMode: 'Hybrid',
      experienceLevel: '1-3 Yrs',
      salaryRange: '₹18 - ₹26 LPA + Stock Grants (ESOPs)',
      ctcNumeric: 24.0,
      roleCategory: 'Software Engineering',
      techStack: 'Next.js, React, Node.js, TypeScript, PostgreSQL, Redis, Kafka',
      jobType: 'Full Time',
      description: 'Join Zomato’s consumer tech team to build hyper-scale ordering and live dispatch systems handling over 4M daily transactions.',
      requirements: 'Strong fundamentals in Data Structures, Algorithms, Distributed Systems, and modern web application architecture.',
      eligibility: 'B.Tech in CS/IT or equivalent industry experience',
      applyUrl: 'https://zomato.com/careers',
      isFeatured: true,
      isPsuGovt: false,
      status: 'PUBLISHED',
    },
    {
      title: 'AI/ML & Data Science Engineer',
      slug: 'swiggy-ai-ml-data-scientist',
      company: 'Swiggy Tech Labs',
      location: 'Bangalore (Remote-Friendly)',
      workMode: 'Remote',
      experienceLevel: '1-3 Yrs',
      salaryRange: '₹20 - ₹32 LPA',
      ctcNumeric: 28.0,
      roleCategory: 'Data & AI',
      techStack: 'Python, PyTorch, LangChain, OpenAI APIs, Vector DBs, SQL',
      jobType: 'Full Time',
      description: 'Develop production Generative AI agents, search recommendation models, and delivery time prediction neural networks.',
      requirements: 'Proficiency in Python, NLP, Transformer models, and real-time inference pipeline optimization.',
      eligibility: 'B.Tech / M.Tech / M.S. in Computer Science, AI, or Mathematics',
      applyUrl: 'https://swiggy.com/careers',
      isFeatured: true,
      isPsuGovt: false,
      status: 'PUBLISHED',
    },
  ];

  for (const tj of techJobsData) {
    await prisma.techJob.upsert({
      where: { slug: tj.slug },
      update: {},
      create: tj,
    });
  }

  // ==========================================
  // SEED TECH CERTIFICATION COURSES
  // ==========================================
  console.log('Seeding Tech Courses...');
  const techCoursesData = [
    {
      title: 'Full-Stack Web Development Masterclass (Next.js 14 & Node.js)',
      slug: 'fullstack-web-development-nextjs-nodejs',
      provider: 'GovtPrep Academy & IIT Alumni',
      instructor: 'Senior Engineering Team',
      category: 'Web Development',
      level: 'Beginner to Advanced',
      durationHours: 60,
      priceType: 'FREE',
      priceAmount: 0,
      certificateIncluded: true,
      rating: 4.9,
      totalStudents: 34200,
      description: 'Comprehensive, zero-to-hero curriculum covering HTML5, CSS3, Tailwind CSS, TypeScript, React 18, Next.js App Router, Prisma ORM, and PostgreSQL deployments on Vercel & AWS.',
      syllabus: JSON.stringify([
        'Module 1: Modern JavaScript & TypeScript Deep Dive',
        'Module 2: React Core, Hooks, and State Management',
        'Module 3: Next.js 14 Server Components & SSR',
        'Module 4: Database Design, Prisma ORM & SQL',
        'Module 5: Authentication, JWT & Security Best Practices',
        'Module 6: Capstone Project: Production E-Commerce & SaaS Portal',
      ]),
      prerequisites: 'Basic understanding of programming logic. No prior web development experience required.',
      enrollUrl: '/tech-courses/fullstack-web-development-nextjs-nodejs',
      isFeatured: true,
    },
    {
      title: 'Python, Machine Learning & Generative AI Bootcamp 2026',
      slug: 'python-machine-learning-generative-ai-bootcamp',
      provider: 'GovtPrep Data Labs',
      instructor: 'AI Research Staff',
      category: 'AI & Data Science',
      level: 'Beginner to Intermediate',
      durationHours: 45,
      priceType: 'FREE',
      priceAmount: 0,
      certificateIncluded: true,
      rating: 4.8,
      totalStudents: 28500,
      description: 'Learn Python programming, NumPy, Pandas, Scikit-Learn, PyTorch, and how to build LLM apps with LangChain and vector databases.',
      syllabus: JSON.stringify([
        'Module 1: Python Fundamentals & Data Structures',
        'Module 2: Data Analysis with Pandas & Matplotlib',
        'Module 3: Supervised & Unsupervised Machine Learning',
        'Module 4: Deep Learning & Neural Networks with PyTorch',
        'Module 5: Generative AI, Prompt Engineering & RAG Architecture',
      ]),
      prerequisites: 'High-school level mathematics (Linear algebra & statistics basics).',
      enrollUrl: '/tech-courses/python-machine-learning-generative-ai-bootcamp',
      isFeatured: true,
    },
    {
      title: 'Data Structures & Algorithms in Java & C++ (FAANG / Tech Interview Prep)',
      slug: 'data-structures-algorithms-dsa-interview-prep',
      provider: 'GovtPrep Coding Club',
      instructor: 'Ex-Google & Microsoft Mentors',
      category: 'DSA & Coding',
      level: 'Intermediate to Advanced',
      durationHours: 80,
      priceType: 'FREE',
      priceAmount: 0,
      certificateIncluded: true,
      rating: 4.95,
      totalStudents: 42000,
      description: 'Master 250+ essential coding interview problems across Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, and System Design.',
      syllabus: JSON.stringify([
        'Module 1: Time & Space Complexity Analysis',
        'Module 2: Arrays, Strings, Two-Pointer & Sliding Window',
        'Module 3: Recursion & Backtracking Mastery',
        'Module 4: Binary Trees, BSTs & Heap Data Structures',
        'Module 5: Graph Algorithms (BFS, DFS, Dijkstra, Topo Sort)',
        'Module 6: Dynamic Programming (1D, 2D, Knapsack, Matrix DP)',
      ]),
      prerequisites: 'Basic familiarity with either C++ or Java syntax.',
      enrollUrl: '/tech-courses/data-structures-algorithms-dsa-interview-prep',
      isFeatured: true,
    },
    {
      title: 'AWS Certified Cloud Practitioner & Solutions Architect Associate',
      slug: 'aws-cloud-solutions-architect-certification',
      provider: 'GovtPrep Cloud Academy',
      instructor: 'AWS Certified Solutions Architects',
      category: 'Cloud & DevOps',
      level: 'Beginner to Intermediate',
      durationHours: 35,
      priceType: 'FREE',
      priceAmount: 0,
      certificateIncluded: true,
      rating: 4.85,
      totalStudents: 19800,
      description: 'Hands-on training for AWS EC2, S3, RDS, Lambda, VPC, IAM, CloudFormation, and Docker deployment workflows.',
      syllabus: JSON.stringify([
        'Module 1: Cloud Computing Core Concepts',
        'Module 2: Compute (EC2, ECS, Lambda Serverless)',
        'Module 3: Storage & Database (S3, DynamoDB, RDS Aurora)',
        'Module 4: Networking & VPC Architecture',
        'Module 5: Security, IAM, Encryption & Compliance',
      ]),
      prerequisites: 'Basic IT and computer networking awareness.',
      enrollUrl: '/tech-courses/aws-cloud-solutions-architect-certification',
      isFeatured: true,
    },
  ];

  for (const tc of techCoursesData) {
    await prisma.techCourse.upsert({
      where: { slug: tc.slug },
      update: {},
      create: tc,
    });
  }

  // ==========================================
  // SEED TECH INTERNSHIPS
  // ==========================================
  console.log('Seeding Tech Internships...');
  const internshipsData = [
    {
      title: 'Software Development Engineering (SDE) Intern - Summer 2026',
      slug: 'google-sde-internship-summer-2026',
      company: 'Google India',
      location: 'Bengaluru / Hyderabad',
      workMode: 'Hybrid',
      durationMonths: 3,
      stipendAmount: 110000,
      stipendDisplay: '₹1,10,000 / Month + Free Food & Cab',
      isPpoOffered: true,
      roleCategory: 'Software Development',
      skillsRequired: 'C++, Java, Python, Data Structures, Algorithms',
      eligibility: 'Pre-final year Bachelor’s or Master’s students (Batch of 2027) in Computer Science, IT, or related technical disciplines.',
      description: 'Work on core Google products alongside world-class engineers. Interns who demonstrate outstanding performance are offered full-time Return Offers (PPO).',
      applyDeadline: new Date('2026-11-30'),
      applyUrl: 'https://careers.google.com/students',
      isFeatured: true,
      isGovtFellowship: false,
      status: 'ACTIVE',
    },
    {
      title: 'National Informatics Centre (NIC) Student Tech Fellowship 2026',
      slug: 'nic-government-tech-internship-2026',
      company: 'National Informatics Centre (NIC)',
      location: 'New Delhi / Remote',
      workMode: 'Remote',
      durationMonths: 2,
      stipendAmount: 15000,
      stipendDisplay: '₹15,000 / Month + Official Govt Certificate',
      isPpoOffered: false,
      roleCategory: 'Cloud & Cyber Security',
      skillsRequired: 'Python, Web Development, Linux, Cyber Security Basics',
      eligibility: 'B.Tech, BCA, MCA, B.Sc Computer Science students studying in recognized Indian colleges.',
      description: 'Official Ministry of Electronics & IT (MeitY) summer internship working on Digital India public digital platforms and cybersecurity projects.',
      applyDeadline: new Date('2026-10-31'),
      applyUrl: 'https://nic.in/internship',
      isFeatured: true,
      isGovtFellowship: true,
      status: 'ACTIVE',
    },
    {
      title: 'Frontend React & Next.js Developer Intern',
      slug: 'razorpay-frontend-react-intern',
      company: 'Razorpay Payments',
      location: 'Bangalore (Hybrid)',
      workMode: 'Hybrid',
      durationMonths: 6,
      stipendAmount: 45000,
      stipendDisplay: '₹45,000 / Month + PPO Opportunity',
      isPpoOffered: true,
      roleCategory: 'Frontend Development',
      skillsRequired: 'React.js, TypeScript, Next.js, Tailwind CSS, REST APIs',
      eligibility: 'Final year college students or recent 2025/2026 graduates.',
      description: 'Build fast, responsive dashboard interfaces and payment checkout SDKs used by millions of businesses across India.',
      applyDeadline: new Date('2026-10-15'),
      applyUrl: 'https://razorpay.com/jobs',
      isFeatured: true,
      isGovtFellowship: false,
      status: 'ACTIVE',
    },
    {
      title: 'Data Science & Machine Learning Research Intern',
      slug: 'isro-iirs-data-science-internship',
      company: 'ISRO - Indian Institute of Remote Sensing (IIRS)',
      location: 'Dehradun / Bengaluru',
      workMode: 'Onsite',
      durationMonths: 3,
      stipendAmount: 20000,
      stipendDisplay: '₹20,000 / Month + Research Publication Support',
      isPpoOffered: false,
      roleCategory: 'Data & AI',
      skillsRequired: 'Python, Computer Vision, GIS / Satellite Imagery, PyTorch',
      eligibility: 'Undergraduate and postgraduate students in Engineering, Physics, Computer Science, or Mathematics.',
      description: 'Work on satellite earth observation AI models, climate analysis neural networks, and planetary dataset processing with ISRO scientists.',
      applyDeadline: new Date('2026-11-15'),
      applyUrl: 'https://iirs.gov.in',
      isFeatured: true,
      isGovtFellowship: true,
      status: 'ACTIVE',
    },
  ];

  for (const intern of internshipsData) {
    await prisma.internship.upsert({
      where: { slug: intern.slug },
      update: {},
      create: intern,
    });
  }

  console.log('🎉 Database successfully seeded with 100% production-grade data!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
