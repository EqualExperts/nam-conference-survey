import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Stack,
  Title,
  Button,
  Image,
  Alert,
  Loader,
  Center,
  Text,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { LikertQuestion } from '../components/questions/LikertQuestion';
import { LikertWithNAQuestion } from '../components/questions/LikertWithNAQuestion';
import { MultipleSelectQuestion } from '../components/questions/MultipleSelectQuestion';
import { RankingQuestion } from '../components/questions/RankingQuestion';
import { OpenEndedQuestion } from '../components/questions/OpenEndedQuestion';
import { SingleChoiceQuestion } from '../components/questions/SingleChoiceQuestion';
import { TextFieldQuestion } from '../components/questions/TextFieldQuestion';
import { SurveyFormState } from '../types/survey';
import { submitSurvey } from '../api/survey';

const TOTAL_QUESTIONS = 19;

export default function SurveyPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<SurveyFormState>({
    q1OverallRating: null,
    q1Comment: '',
    q2ReturnIntent: null,
    q2Comment: '',
    q3CoworkingEffectiveness: null,
    q3Comment: '',
    q4ConnectionTypes: [],
    q4ConnectionOther: '',
    q4Comment: '',
    q5ConnectionDepth: null,
    q5Comment: '',
    q6LearningValue: null,
    q6Comment: '',
    q7FutureTopics: '',
    q8SaturdayWorth: null,
    q8Comment: '',
    q9PreConferenceCommunication: null,
    q9Comment: '',
    q10AccommodationsVenue: null,
    q10Comment: '',
    q11SessionRankings: {},
    q12ConferenceLength: '',
    q12Comment: '',
    q13ComparisonToPD: null,
    q13Comment: '',
    q14LikedMost: '',
    q15AdditionalFeedback: '',
    q16Improvements: '',
    q16Comment: '',
    q17FeedbackConfidence: [],
    q17FeedbackOther: '',
    q18EmploymentStatus: '',
    q19Name: '',
    q19Location: '',
  });

  const updateField = <K extends keyof SurveyFormState>(
    field: K,
    value: SurveyFormState[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateAnswered = (): number => {
    let count = 0;

    if (formData.q1OverallRating !== null) count++;
    if (formData.q2ReturnIntent !== null) count++;
    if (formData.q3CoworkingEffectiveness !== null) count++;
    if (formData.q4ConnectionTypes.length > 0) count++;
    if (formData.q5ConnectionDepth !== null) count++;
    if (formData.q6LearningValue !== null) count++;
    if (formData.q7FutureTopics.trim()) count++;
    if (formData.q8SaturdayWorth !== null) count++;
    if (formData.q9PreConferenceCommunication !== null) count++;
    if (formData.q10AccommodationsVenue !== null) count++;
    if (Object.keys(formData.q11SessionRankings).length > 0) count++;
    if (formData.q12ConferenceLength) count++;
    if (formData.q13ComparisonToPD !== null) count++;
    if (formData.q14LikedMost.trim()) count++;
    if (formData.q15AdditionalFeedback.trim()) count++;
    if (formData.q16Improvements) count++;
    if (formData.q17FeedbackConfidence.length > 0) count++;
    if (formData.q18EmploymentStatus) count++;
    if (formData.q19Name.trim() || formData.q19Location.trim()) count++;

    return count;
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      await submitSurvey(formData);

      notifications.show({
        title: 'Success!',
        message: 'Your survey has been submitted successfully',
        color: 'green',
        icon: <IconCheck />,
      });

      navigate('/thanks');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit survey';
      setError(message);
      notifications.show({
        title: 'Submission Error',
        message,
        color: 'red',
        icon: <IconAlertCircle />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <Container size="md" py="xl">
        <Center h={400}>
          <Stack align="center" gap="md">
            <Loader color="equalBlue" size="lg" />
            <Text size="sm" c="dimmed">
              Submitting your survey...
            </Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Stack align="center" gap="md">
          <Image
            src="https://www.equalexperts.com/wp-content/uploads/2024/10/2024-Logo.svg"
            alt="Equal Experts"
            h={60}
            w="auto"
          />
          <Title order={1} ta="center" c="equalBlue.4">
            NAM Conference Survey
          </Title>
          <Text size="lg" ta="center" c="dimmed">
            Your feedback helps us improve future conferences. All questions are optional.
          </Text>
        </Stack>

        {/* Progress Indicator */}
        <ProgressIndicator answered={calculateAnswered()} total={TOTAL_QUESTIONS} />

        {/* Error Alert */}
        {error && (
          <Alert
            icon={<IconAlertCircle />}
            title="Submission Error"
            color="red"
            withCloseButton
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {/* Q1: Overall NAM Conference Experience */}
        <LikertQuestion
          id="q1OverallRating"
          question="How would you rate your overall NAM Conference experience?"
          transparency="This helps leadership understand overall event quality and justify future investment in conferences."
          options={[
            { value: '5', label: '5 - Excellent' },
            { value: '4', label: '4 - Good' },
            { value: '3', label: '3 - Neutral' },
            { value: '2', label: '2 - Fair' },
            { value: '1', label: '1 - Poor' },
          ]}
          value={formData.q1OverallRating}
          onChange={(value) => updateField('q1OverallRating', value)}
          comment={formData.q1Comment}
          onCommentChange={(comment) => updateField('q1Comment', comment)}
          commentPlaceholder="Additional context about your rating..."
        />

        {/* Q2: Attend Again Next Year */}
        <LikertQuestion
          id="q2ReturnIntent"
          question="Would you want to attend NAM Conference again next year?"
          transparency="This helps us gauge sustained interest and plan future conference capacity."
          options={[
            { value: '5', label: '5 - Definitely yes' },
            { value: '4', label: '4 - Probably yes' },
            { value: '3', label: '3 - Unsure' },
            { value: '2', label: '2 - Probably not' },
            { value: '1', label: '1 - Definitely not' },
          ]}
          value={formData.q2ReturnIntent}
          onChange={(value) => updateField('q2ReturnIntent', value)}
          comment={formData.q2Comment}
          onCommentChange={(comment) => updateField('q2Comment', comment)}
          commentPlaceholder="Additional context about your response..."
        />

        {/* Q3: Coworking Day Value */}
        <LikertWithNAQuestion
          id="q3CoworkingEffectiveness"
          question="How valuable was the coworking day for networking and collaboration?"
          transparency="This helps us evaluate whether structured coworking time is an effective networking format for future conferences."
          options={[
            { value: '5', label: '5 - Extremely valuable' },
            { value: '4', label: '4 - Very valuable' },
            { value: '3', label: '3 - Moderately valuable' },
            { value: '2', label: '2 - Slightly valuable' },
            { value: '1', label: '1 - Not at all valuable' },
          ]}
          naLabel="N/A - Did not attend coworking day"
          value={formData.q3CoworkingEffectiveness}
          onChange={(value) => updateField('q3CoworkingEffectiveness', value)}
          comment={formData.q3Comment}
          onCommentChange={(comment) => updateField('q3Comment', comment)}
          commentPlaceholder="Additional context about the coworking day..."
        />

        {/* Q4: Connection Types */}
        <MultipleSelectQuestion
          id="q4ConnectionTypes"
          question="Who did you most value connecting with at this conference? (Select all that apply)"
          transparency="This helps us understand what types of connections attendees value most, so we can design networking opportunities accordingly."
          options={[
            { value: 'leadership', label: 'EE leadership team' },
            { value: 'associates', label: 'Fellow associates in general' },
            { value: 'technical_experts', label: 'Technical experts in specific areas' },
            { value: 'similar_challenges', label: 'People working on similar challenges' },
            { value: 'different_work', label: "People I wouldn't normally interact with in day-to-day work" },
          ]}
          values={formData.q4ConnectionTypes}
          onChange={(values) => updateField('q4ConnectionTypes', values)}
          otherValue={formData.q4ConnectionOther}
          onOtherChange={(value) => updateField('q4ConnectionOther', value)}
          comment={formData.q4Comment}
          onCommentChange={(comment) => updateField('q4Comment', comment)}
          commentPlaceholder="Additional context about connections you made..."
        />

        {/* Q5: Quality of Connections */}
        <LikertQuestion
          id="q5ConnectionDepth"
          question="How would you describe the quality of connections you made at this conference?"
          transparency="This helps us understand whether the conference format supports deep connection-building versus just surface-level networking."
          options={[
            { value: '5', label: '5 - Deep, meaningful professional relationships' },
            { value: '4', label: '4 - Strong connections with potential for follow-up' },
            { value: '3', label: '3 - Good conversations and exchanges' },
            { value: '2', label: '2 - Mostly surface-level introductions' },
            { value: '1', label: '1 - Minimal meaningful interaction' },
          ]}
          value={formData.q5ConnectionDepth}
          onChange={(value) => updateField('q5ConnectionDepth', value)}
          comment={formData.q5Comment}
          onCommentChange={(comment) => updateField('q5Comment', comment)}
          commentPlaceholder="Additional context about connection quality..."
        />

        {/* Q6: Learning Value */}
        <LikertQuestion
          id="q6LearningValue"
          question="How would you rate the educational/learning value of the conference content?"
          transparency="This helps us understand whether the conference delivers meaningful learning outcomes beyond networking."
          options={[
            { value: '5', label: '5 - Excellent - learned significant new skills/knowledge' },
            { value: '4', label: '4 - Good - learned useful things' },
            { value: '3', label: '3 - Neutral - some learning but limited' },
            { value: '2', label: '2 - Fair - minimal learning value' },
            { value: '1', label: '1 - Poor - did not learn anything meaningful' },
          ]}
          value={formData.q6LearningValue}
          onChange={(value) => updateField('q6LearningValue', value)}
          comment={formData.q6Comment}
          onCommentChange={(comment) => updateField('q6Comment', comment)}
          commentPlaceholder="Additional context about learning value..."
        />

        {/* Q7: Future Topics */}
        <OpenEndedQuestion
          id="q7FutureTopics"
          question="What topics would you like to see at future conferences?"
          transparency="This gives us ideas for future conference programming based on what you want to learn."
          value={formData.q7FutureTopics}
          onChange={(value) => updateField('q7FutureTopics', value)}
          placeholder="Share topic ideas..."
        />

        {/* Q8: Saturday Time Commitment */}
        <LikertWithNAQuestion
          id="q8SaturdayWorth"
          question="The conference asks you to use personal time on a Saturday. Was this time commitment worth it for you?"
          transparency="We're conscious this uses your personal Saturday time. This feedback helps leadership understand if the Saturday format is working for attendees and worth continuing."
          options={[
            { value: '5', label: '5 - Absolutely worth it' },
            { value: '4', label: '4 - Mostly worth it' },
            { value: '3', label: '3 - Neutral' },
            { value: '2', label: '2 - Questionable value for my time' },
            { value: '1', label: '1 - Not worth my Saturday' },
          ]}
          naLabel="N/A - Did not attend Saturday"
          value={formData.q8SaturdayWorth}
          onChange={(value) => updateField('q8SaturdayWorth', value)}
          comment={formData.q8Comment}
          onCommentChange={(comment) => updateField('q8Comment', comment)}
          commentPlaceholder="Additional context about the Saturday time commitment..."
        />

        {/* Q9: Pre-Conference Communication */}
        <LikertQuestion
          id="q9PreConferenceCommunication"
          question="How clear were your expectations before arriving at the conference? (Schedule, what to bring, hotel details, etc.)"
          transparency="This helps us improve our pre-conference communication so you know what to expect before you arrive."
          options={[
            { value: '5', label: '5 - Very clear - knew exactly what to expect' },
            { value: '4', label: '4 - Mostly clear' },
            { value: '3', label: '3 - Somewhat clear' },
            { value: '2', label: '2 - Unclear in some areas' },
            { value: '1', label: '1 - Very unclear - arrived unsure what to expect' },
          ]}
          value={formData.q9PreConferenceCommunication}
          onChange={(value) => updateField('q9PreConferenceCommunication', value)}
          comment={formData.q9Comment}
          onCommentChange={(comment) => updateField('q9Comment', comment)}
          commentPlaceholder="Additional context about pre-conference communication..."
        />

        {/* Q10: Accommodations and Venue */}
        <LikertWithNAQuestion
          id="q10AccommodationsVenue"
          question="How would you rate the hotel accommodations, conference venue, and catered meals and snacks?"
          transparency="This helps us evaluate hotel quality, choose appropriate venues, and ensure food meets dietary needs and preferences."
          options={[
            { value: '5', label: '5 - Excellent' },
            { value: '4', label: '4 - Good' },
            { value: '3', label: '3 - Neutral' },
            { value: '2', label: '2 - Fair' },
            { value: '1', label: '1 - Poor' },
          ]}
          naLabel="N/A - Did not stay at conference hotel"
          value={formData.q10AccommodationsVenue}
          onChange={(value) => updateField('q10AccommodationsVenue', value)}
          comment={formData.q10Comment}
          onCommentChange={(comment) => updateField('q10Comment', comment)}
          commentLabel="Please comment if you answered Neutral or below"
          commentPlaceholder="Additional context about accommodations, venue, or food..."
        />

        {/* Q11: Session Rankings */}
        <RankingQuestion
          id="q11SessionRankings"
          question="Rank the following session types in order of value to you (1 = most valuable, 4 = least valuable)"
          transparency="This helps us balance the event schedule between different session types based on what attendees value most."
          options={[
            { value: 'presentations', label: 'Main presentations' },
            { value: 'workshops', label: 'Interactive workshops' },
            { value: 'coworking', label: 'Co-working time' },
            { value: 'networking', label: 'Networking / social time' },
          ]}
          rankings={formData.q11SessionRankings}
          onChange={(rankings) => updateField('q11SessionRankings', rankings)}
        />

        {/* Q12: Conference Length */}
        <SingleChoiceQuestion
          id="q12ConferenceLength"
          question="Was the overall conference length appropriate?"
          transparency="This helps us determine the optimal conference duration that provides value without overwhelming attendees."
          options={[
            { value: 'too_short', label: 'Too short - wanted more time' },
            { value: 'just_right', label: 'Just right' },
            { value: 'too_long', label: 'Too long - felt too much time commitment' },
            { value: 'unsure', label: 'Unsure' },
          ]}
          value={formData.q12ConferenceLength}
          onChange={(value) => updateField('q12ConferenceLength', value)}
          comment={formData.q12Comment}
          onCommentChange={(comment) => updateField('q12Comment', comment)}
        />

        {/* Q13: Comparison to Other PD */}
        <LikertWithNAQuestion
          id="q13ComparisonToPD"
          question="How does NAM Conference compare to other professional development opportunities you've experienced?"
          transparency="This helps us understand how the conference stacks up against other learning and networking opportunities available to you."
          options={[
            { value: '5', label: '5 - Much better than other opportunities' },
            { value: '4', label: '4 - Somewhat better' },
            { value: '3', label: '3 - About the same' },
            { value: '2', label: '2 - Somewhat worse' },
            { value: '1', label: '1 - Much worse' },
          ]}
          naLabel="N/A - Haven't attended other professional development events"
          value={formData.q13ComparisonToPD}
          onChange={(value) => updateField('q13ComparisonToPD', value)}
          comment={formData.q13Comment}
          onCommentChange={(comment) => updateField('q13Comment', comment)}
          commentPlaceholder="Additional context about the comparison..."
        />

        {/* Q14: Liked Most */}
        <OpenEndedQuestion
          id="q14LikedMost"
          question="What did you like most about the conference?"
          transparency="This helps us understand what's working well so we can preserve and enhance those elements."
          value={formData.q14LikedMost}
          onChange={(value) => updateField('q14LikedMost', value)}
          placeholder="Share what you enjoyed..."
        />

        {/* Q15: Additional Feedback */}
        <OpenEndedQuestion
          id="q15AdditionalFeedback"
          question="Is there anything else you'd like us to know about your conference experience?"
          transparency="This gives you space to share anything we didn't specifically ask about."
          value={formData.q15AdditionalFeedback}
          onChange={(value) => updateField('q15AdditionalFeedback', value)}
          placeholder="Share your thoughts..."
        />

        {/* Q16: Improvements from Last Year */}
        <SingleChoiceQuestion
          id="q16Improvements"
          question="If you attended the last NAM Conference, did you notice improvements based on previous feedback?"
          transparency="This helps us understand whether attendees see their feedback being acted upon year over year."
          options={[
            { value: 'yes_clear', label: 'Yes - clear improvements' },
            { value: 'some', label: 'Some improvements noticed' },
            { value: 'no_changes', label: 'No noticeable changes' },
            { value: 'not_sure', label: "Not sure / can't remember specific improvements" },
            { value: 'did_not_attend', label: 'Did not attend last conference' },
            { value: 'first_conference', label: 'This is my first NAM Conference' },
          ]}
          value={formData.q16Improvements}
          onChange={(value) => updateField('q16Improvements', value)}
          comment={formData.q16Comment}
          onCommentChange={(comment) => updateField('q16Comment', comment)}
        />

        {/* Q17: Feedback Confidence */}
        <MultipleSelectQuestion
          id="q17FeedbackConfidence"
          question="What would make you most confident that your feedback will be acted upon? (Select all that apply)"
          transparency="This helps us design a feedback loop that builds trust and shows we take your input seriously."
          options={[
            { value: 'public_summary', label: 'Public summary of all feedback shared with attendees' },
            { value: 'action_plan', label: 'Action plan showing what will change based on feedback' },
            { value: 'visible_changes', label: "Visible changes at next conference addressing this year's issues" },
            { value: 'direct_response', label: 'Direct response acknowledging my specific feedback' },
            { value: 'explain_decisions', label: 'Conference organizers explaining decisions and trade-offs' },
            { value: 'already_confident', label: 'Nothing - I already feel confident feedback is valued' },
            { value: 'other', label: 'Other' },
          ]}
          values={formData.q17FeedbackConfidence}
          onChange={(values) => updateField('q17FeedbackConfidence', values)}
          otherValue={formData.q17FeedbackOther}
          onOtherChange={(value) => updateField('q17FeedbackOther', value)}
        />

        {/* Q18: Employment Status */}
        <SingleChoiceQuestion
          id="q18EmploymentStatus"
          question="What is your current status with Equal Experts?"
          transparency="This helps us understand experience differences between employees and associates."
          options={[
            { value: 'employee', label: 'Employee' },
            { value: 'active_associate', label: 'Active Associate' },
            { value: 'alumni_associate', label: 'Alumni Associate' },
            { value: 'client', label: 'Client' },
            { value: 'prefer_not', label: 'Prefer not to answer' },
          ]}
          value={formData.q18EmploymentStatus}
          onChange={(value) => updateField('q18EmploymentStatus', value)}
        />

        {/* Q19: Name and Location */}
        <TextFieldQuestion
          id="q19Name"
          question="If comfortable please provide your name and home city and state. (This helps us follow up on specific feedback if needed)"
          transparency="Providing your name and home location is completely optional. Anonymous responses are equally valuable."
          fields={[
            {
              id: 'name',
              label: 'Your Name',
              value: formData.q19Name,
              onChange: (value) => updateField('q19Name', value),
              placeholder: 'Leave blank to remain anonymous',
            },
            {
              id: 'location',
              label: 'City and State',
              value: formData.q19Location,
              onChange: (value) => updateField('q19Location', value),
              placeholder: 'Leave blank to remain anonymous',
            },
          ]}
        />

        {/* Submit Button */}
        <Button
          size="lg"
          color="equalBlue"
          onClick={handleSubmit}
          loading={isSubmitting}
          fullWidth
        >
          Submit Survey
        </Button>

        <Text size="sm" c="dimmed" ta="center">
          All questions are optional. Submit with as many or as few answers as you like.
        </Text>
      </Stack>
    </Container>
  );
}
