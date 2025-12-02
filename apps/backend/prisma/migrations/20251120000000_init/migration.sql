-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PARTICIPANT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'SUBMITTED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "picture" TEXT,
    "role" "Role" NOT NULL DEFAULT 'PARTICIPANT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "survey_responses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'SUBMITTED',
    "q1OverallRating" INTEGER,
    "q1Comment" TEXT,
    "q2ReturnIntent" INTEGER,
    "q2Comment" TEXT,
    "q3CoworkingEffectiveness" TEXT,
    "q3Comment" TEXT,
    "q5ConnectionDepth" INTEGER,
    "q5Comment" TEXT,
    "q6LearningValue" INTEGER,
    "q6Comment" TEXT,
    "q8SaturdayWorth" TEXT,
    "q8Comment" TEXT,
    "q9PreConferenceCommunication" INTEGER,
    "q10AccommodationsVenue" TEXT,
    "q13ComparisonToPD" TEXT,
    "q4ConnectionTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "q4ConnectionOther" TEXT,
    "q17FeedbackConfidence" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "q11SessionRankings" JSONB,
    "q12ConferenceLength" TEXT,
    "q16Improvements" TEXT,
    "q16Comment" TEXT,
    "q7FutureTopics" TEXT,
    "q14LikedMost" TEXT,
    "q15AdditionalFeedback" TEXT,
    "q18EmploymentStatus" TEXT,
    "q19Name" TEXT,
    "q19Location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "survey_responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "survey_responses_userId_idx" ON "survey_responses"("userId");

-- CreateIndex
CREATE INDEX "survey_responses_status_idx" ON "survey_responses"("status");

-- CreateIndex
CREATE INDEX "survey_responses_createdAt_idx" ON "survey_responses"("createdAt");

-- AddForeignKey
ALTER TABLE "survey_responses" ADD CONSTRAINT "survey_responses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;