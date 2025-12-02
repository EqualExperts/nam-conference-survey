import { PrismaClient, Role, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@equalexperts.com' },
    update: {},
    create: {
      email: 'admin@equalexperts.com',
      name: 'Admin User',
      role: Role.ADMIN,
    },
  });
  console.log(`✅ Admin user: ${admin.email}`);

  // Create anonymous user (all anonymous survey submissions use this)
  const anonymous = await prisma.user.upsert({
    where: { email: 'anonymous@survey.local' },
    update: {},
    create: {
      email: 'anonymous@survey.local',
      name: 'Anonymous Survey Respondent',
      role: Role.PARTICIPANT,
    },
  });
  console.log(`✅ Anonymous user created for public survey submissions`);

  // Create sample survey responses
  const response1 = await prisma.surveyResponse.create({
    data: {
      userId: anonymous.id,
      status: Status.SUBMITTED,

      // Likert questions
      q1OverallRating: 5,
      q1Comment: 'Excellent conference! Very well organized.',
      q2ReturnIntent: 5,
      q2Comment: 'Definitely planning to attend next year.',
      q3CoworkingEffectiveness: '4',
      q3Comment: 'Great collaboration opportunities.',
      q5ConnectionDepth: 4,
      q6LearningValue: 5,
      q6Comment: 'Learned so much from the sessions.',
      q8SaturdayWorth: '5',
      q9PreConferenceCommunication: 4,
      q10AccommodationsVenue: '5',
      q13ComparisonToPD: '4',

      // Multiple select
      q4ConnectionTypes: ['colleagues', 'clients', 'prospects'],
      q17FeedbackConfidence: ['transparency', 'acknowledgment'],

      // Ranking
      q11SessionRankings: {
        workshops: 1,
        presentations: 2,
        networking: 3,
        coworking: 4,
      },

      // Single choice
      q12ConferenceLength: 'just_right',
      q16Improvements: 'better_than_last',

      // Open-ended
      q7FutureTopics: 'AI and machine learning, microservices architecture',
      q14LikedMost: 'The networking sessions were fantastic and I made great connections',
      q15AdditionalFeedback: 'Keep up the great work! Looking forward to next year.',

      // Demographics
      q18EmploymentStatus: 'employee',
      q19Name: 'Test Participant 1',
      q19Location: 'New York, NY',
    },
  });

  console.log(`✅ Sample response 1: ${response1.id}`);

  // Create partial response (test zero mandatory fields)
  const response2 = await prisma.surveyResponse.create({
    data: {
      userId: anonymous.id,
      status: Status.SUBMITTED,

      // Only answer Q1 and Q2
      q1OverallRating: 3,
      q2ReturnIntent: 4,
      q2Comment: 'Probably will attend if schedule allows.',

      // Demographics
      q18EmploymentStatus: 'contractor',
    },
  });

  console.log(`✅ Sample response 2 (partial): ${response2.id}`);

  // Create response with N/A values
  const response3 = await prisma.surveyResponse.create({
    data: {
      userId: anonymous.id,
      status: Status.SUBMITTED,

      q1OverallRating: 4,
      q1Comment: 'Overall great experience.',
      q3CoworkingEffectiveness: 'NA', // User selected N/A
      q8SaturdayWorth: 'NA',
      q10AccommodationsVenue: 'NA',
      q13ComparisonToPD: 'NA',

      q4ConnectionTypes: ['colleagues'],
      q7FutureTopics: 'Cloud architecture, DevOps practices',
      q14LikedMost: 'Keynote speakers were inspiring',

      q18EmploymentStatus: 'employee',
      q19Name: 'John Doe',
      q19Location: 'San Francisco, CA',
    },
  });

  console.log(`✅ Sample response 3 (with N/A): ${response3.id}`);

  console.log('');
  console.log('✨ Seeding completed successfully!');
  console.log('');
  console.log('📧 Admin user: admin@equalexperts.com');
  console.log('📊 Anonymous user: anonymous@survey.local (used for all public submissions)');
  console.log('📝 Sample responses: 3');
  console.log('');
  console.log('💡 Survey is now publicly accessible - no login required!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
