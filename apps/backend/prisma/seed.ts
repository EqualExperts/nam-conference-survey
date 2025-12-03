import { PrismaClient, Role, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

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
  console.log(`Admin user: ${admin.email}`);

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
  console.log(`Anonymous user created for public survey submissions`);

  // Create sample survey responses
  const response1 = await prisma.surveyResponse.create({
    data: {
      userId: anonymous.id,
      status: Status.SUBMITTED,

      // Q1: Overall rating
      q1OverallRating: 5,
      q1Comment: 'Excellent conference! Very well organized.',

      // Q2: Return intent
      q2ReturnIntent: 5,
      q2Comment: 'Definitely planning to attend next year.',

      // Q3: Coworking effectiveness
      q3CoworkingEffectiveness: '4',
      q3Comment: 'Great collaboration opportunities.',

      // Q4: Connection types
      q4ConnectionTypes: ['leadership', 'technical_experts', 'similar_challenges'],
      q4Comment: 'Made great connections with the technical leads.',

      // Q5: Connection depth
      q5ConnectionDepth: 4,
      q5Comment: 'Had several meaningful conversations.',

      // Q6: Learning value
      q6LearningValue: 5,
      q6Comment: 'Learned so much from the sessions.',

      // Q7: Future topics
      q7FutureTopics: 'AI and machine learning, microservices architecture',

      // Q8: Saturday worth
      q8SaturdayWorth: '5',
      q8Comment: 'Worth every minute.',

      // Q9: Pre-conference communication
      q9PreConferenceCommunication: 4,
      q9Comment: 'Good communication overall.',

      // Q10: Accommodations
      q10AccommodationsVenue: '5',
      q10Comment: 'Hotel was excellent.',

      // Q11: Session rankings
      q11SessionRankings: {
        presentations: 1,
        workshops: 2,
        networking: 3,
        coworking: 4,
      },

      // Q12: Conference length
      q12ConferenceLength: 'just_right',
      q12Comment: 'Perfect duration.',

      // Q13: Comparison to PD
      q13ComparisonToPD: '4',
      q13Comment: 'Better than most PD events I have attended.',

      // Q14: What you liked most
      q14LikedMost: 'The networking sessions were fantastic and I made great connections',

      // Q15: Additional feedback
      q15AdditionalFeedback: 'Keep up the great work! Looking forward to next year.',

      // Q16: Improvements
      q16Improvements: 'yes_clear',
      q16Comment: 'Clear improvements from last year.',

      // Q17: Feedback confidence
      q17FeedbackConfidence: ['public_summary', 'visible_changes'],

      // Q18: Employment status
      q18EmploymentStatus: 'employee',

      // Q19: Name and location
      q19Name: 'Test Participant 1',
      q19Location: 'New York, NY',
    },
  });

  console.log(`Sample response 1: ${response1.id}`);

  // Create partial response (test zero mandatory fields)
  const response2 = await prisma.surveyResponse.create({
    data: {
      userId: anonymous.id,
      status: Status.SUBMITTED,

      // Only answer Q1 and Q2
      q1OverallRating: 3,
      q2ReturnIntent: 4,
      q2Comment: 'Probably will attend if schedule allows.',

      // Q18: Employment status
      q18EmploymentStatus: 'active_associate',
    },
  });

  console.log(`Sample response 2 (partial): ${response2.id}`);

  // Create response with N/A values
  const response3 = await prisma.surveyResponse.create({
    data: {
      userId: anonymous.id,
      status: Status.SUBMITTED,

      q1OverallRating: 4,
      q1Comment: 'Overall great experience.',

      // N/A responses
      q3CoworkingEffectiveness: 'NA',
      q8SaturdayWorth: 'NA',
      q10AccommodationsVenue: 'NA',
      q13ComparisonToPD: 'NA',

      // Connection types
      q4ConnectionTypes: ['associates'],

      // Open-ended
      q7FutureTopics: 'Cloud architecture, DevOps practices',
      q14LikedMost: 'Keynote speakers were inspiring',

      // Improvements
      q16Improvements: 'first_conference',

      // Q18: Employment status
      q18EmploymentStatus: 'active_associate',

      // Q19: Name and location
      q19Name: 'Jane Smith',
      q19Location: 'San Francisco, CA',
    },
  });

  console.log(`Sample response 3 (with N/A): ${response3.id}`);

  console.log('');
  console.log('Seeding completed successfully!');
  console.log('');
  console.log('Admin user: admin@equalexperts.com');
  console.log('Anonymous user: anonymous@survey.local (used for all public submissions)');
  console.log('Sample responses: 3');
  console.log('');
  console.log('Survey is now publicly accessible - no login required!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
