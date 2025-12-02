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
    q5ConnectionDepth: null,
    q5Comment: '',
    q6LearningValue: null,
    q6Comment: '',
    q7FutureTopics: '',
    q8SaturdayWorth: null,
    q8Comment: '',
    q9PreConferenceCommunication: null,
    q10AccommodationsVenue: null,
    q11SessionRankings: {},
    q12ConferenceLength: '',
    q13ComparisonToPD: null,
    q14LikedMost: '',
    q15AdditionalFeedback: '',
    q16Improvements: '',
    q16Comment: '',
    q17FeedbackConfidence: [],
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

        {/* Q1: Overall Rating */}
        <LikertQuestion
          id="q1OverallRating"
          question="How would you rate your overall conference experience?"
          transparency="This helps us understand attendee satisfaction and improve future events."
          value={formData.q1OverallRating}
          onChange={(value) => updateField('q1OverallRating', value)}
          comment={formData.q1Comment}
          onCommentChange={(comment) => updateField('q1Comment', comment)}
        />

        {/* Q2: Return Intent */}
        <LikertQuestion
          id="q2ReturnIntent"
          question="How likely are you to attend future Equal Experts conferences?"
          transparency="Understanding your return intent helps us plan future events."
          value={formData.q2ReturnIntent}
          onChange={(value) => updateField('q2ReturnIntent', value)}
          comment={formData.q2Comment}
          onCommentChange={(comment) => updateField('q2Comment', comment)}
        />

        {/* Q3: Co-working Effectiveness */}
        <LikertWithNAQuestion
          id="q3CoworkingEffectiveness"
          question="How effective was the co-working space for collaboration?"
          transparency="Your feedback on collaborative spaces helps us optimize future venues."
          value={formData.q3CoworkingEffectiveness}
          onChange={(value) => updateField('q3CoworkingEffectiveness', value)}
          comment={formData.q3Comment}
          onCommentChange={(comment) => updateField('q3Comment', comment)}
        />

        {/* Q4: Connection Types */}
        <MultipleSelectQuestion
          id="q4ConnectionTypes"
          question="What types of connections did you make at the conference? (Select all that apply)"
          transparency="Understanding connection types helps us design better networking opportunities."
          options={[
            { value: 'colleagues', label: 'Colleagues from other teams' },
            { value: 'clients', label: 'Clients' },
            { value: 'prospects', label: 'Prospects/Potential clients' },
            { value: 'partners', label: 'Partners' },
          ]}
          values={formData.q4ConnectionTypes}
          onChange={(values) => updateField('q4ConnectionTypes', values)}
          otherValue={formData.q4ConnectionOther}
          onOtherChange={(value) => updateField('q4ConnectionOther', value)}
        />

        {/* Q5: Connection Depth */}
        <LikertQuestion
          id="q5ConnectionDepth"
          question="How meaningful were the connections you made?"
          transparency="This helps us assess the quality of networking opportunities."
          value={formData.q5ConnectionDepth}
          onChange={(value) => updateField('q5ConnectionDepth', value)}
          comment={formData.q5Comment}
          onCommentChange={(comment) => updateField('q5Comment', comment)}
        />

        {/* Q6: Learning Value */}
        <LikertQuestion
          id="q6LearningValue"
          question="How valuable was the conference for learning and professional development?"
          transparency="Understanding learning outcomes helps us curate better content."
          value={formData.q6LearningValue}
          onChange={(value) => updateField('q6LearningValue', value)}
          comment={formData.q6Comment}
          onCommentChange={(comment) => updateField('q6Comment', comment)}
        />

        {/* Q7: Future Topics */}
        <OpenEndedQuestion
          id="q7FutureTopics"
          question="What topics would you like to see covered at future conferences?"
          transparency="Your suggestions directly influence our future programming."
          value={formData.q7FutureTopics}
          onChange={(value) => updateField('q7FutureTopics', value)}
          placeholder="Share topic ideas..."
        />

        {/* Q8: Saturday Worth */}
        <LikertWithNAQuestion
          id="q8SaturdayWorth"
          question="Was the Saturday session worth attending?"
          transparency="This helps us decide whether to include weekend sessions in future events."
          value={formData.q8SaturdayWorth}
          onChange={(value) => updateField('q8SaturdayWorth', value)}
          comment={formData.q8Comment}
          onCommentChange={(comment) => updateField('q8Comment', comment)}
        />

        {/* Q9: Pre-Conference Communication */}
        <LikertQuestion
          id="q9PreConferenceCommunication"
          question="How would you rate the pre-conference communication and information?"
          transparency="This helps us improve our communication strategy for future events."
          value={formData.q9PreConferenceCommunication}
          onChange={(value) => updateField('q9PreConferenceCommunication', value)}
        />

        {/* Q10: Accommodations and Venue */}
        <LikertWithNAQuestion
          id="q10AccommodationsVenue"
          question="How would you rate the venue and accommodations?"
          transparency="Venue feedback helps us select better locations for future conferences."
          value={formData.q10AccommodationsVenue}
          onChange={(value) => updateField('q10AccommodationsVenue', value)}
        />

        {/* Q11: Session Rankings */}
        <RankingQuestion
          id="q11SessionRankings"
          question="Rank the following session types by value (1 = most valuable, 4 = least valuable)"
          transparency="This helps us balance different session formats in future conferences."
          options={[
            { value: 'workshops', label: 'Hands-on Workshops' },
            { value: 'presentations', label: 'Presentations/Talks' },
            { value: 'networking', label: 'Networking Sessions' },
            { value: 'coworking', label: 'Co-working Time' },
          ]}
          rankings={formData.q11SessionRankings}
          onChange={(rankings) => updateField('q11SessionRankings', rankings)}
        />

        {/* Q12: Conference Length */}
        <SingleChoiceQuestion
          id="q12ConferenceLength"
          question="How did you feel about the length of the conference?"
          transparency="This helps us optimize the conference duration."
          options={[
            { value: 'too_short', label: 'Too short' },
            { value: 'just_right', label: 'Just right' },
            { value: 'too_long', label: 'Too long' },
          ]}
          value={formData.q12ConferenceLength}
          onChange={(value) => updateField('q12ConferenceLength', value)}
        />

        {/* Q13: Comparison to PD */}
        <LikertWithNAQuestion
          id="q13ComparisonToPD"
          question="How does this conference compare to Practice Day?"
          transparency="This helps us understand relative value across our events."
          value={formData.q13ComparisonToPD}
          onChange={(value) => updateField('q13ComparisonToPD', value)}
        />

        {/* Q14: Liked Most */}
        <OpenEndedQuestion
          id="q14LikedMost"
          question="What did you like most about the conference?"
          transparency="Positive feedback helps us identify what to continue doing."
          value={formData.q14LikedMost}
          onChange={(value) => updateField('q14LikedMost', value)}
          placeholder="Share what you enjoyed..."
        />

        {/* Q15: Additional Feedback */}
        <OpenEndedQuestion
          id="q15AdditionalFeedback"
          question="Any additional feedback or comments?"
          transparency="General feedback helps us improve all aspects of the conference."
          value={formData.q15AdditionalFeedback}
          onChange={(value) => updateField('q15AdditionalFeedback', value)}
          placeholder="Share your thoughts..."
        />

        {/* Q16: Improvements */}
        <SingleChoiceQuestion
          id="q16Improvements"
          question="Overall, do you think the conference has improved compared to last year?"
          transparency="This helps us track our progress year over year."
          options={[
            { value: 'much_worse', label: 'Much worse' },
            { value: 'somewhat_worse', label: 'Somewhat worse' },
            { value: 'about_same', label: 'About the same' },
            { value: 'better_than_last', label: 'Better than last year' },
            { value: 'much_better', label: 'Much better' },
          ]}
          value={formData.q16Improvements}
          onChange={(value) => updateField('q16Improvements', value)}
          comment={formData.q16Comment}
          onCommentChange={(comment) => updateField('q16Comment', comment)}
        />

        {/* Q17: Feedback Confidence */}
        <MultipleSelectQuestion
          id="q17FeedbackConfidence"
          question="What makes you confident sharing honest feedback? (Select all that apply)"
          transparency="Understanding what encourages honest feedback helps us maintain trust."
          options={[
            { value: 'transparency', label: 'Transparency about how feedback is used' },
            { value: 'anonymity', label: 'Anonymous submission' },
            { value: 'acknowledgment', label: 'Acknowledgment of feedback' },
            { value: 'action', label: 'Seeing action taken on past feedback' },
          ]}
          values={formData.q17FeedbackConfidence}
          onChange={(values) => updateField('q17FeedbackConfidence', values)}
        />

        {/* Q18: Employment Status */}
        <SingleChoiceQuestion
          id="q18EmploymentStatus"
          question="What is your employment status with Equal Experts?"
          transparency="This helps us understand our attendee demographics."
          options={[
            { value: 'employee', label: 'Employee' },
            { value: 'contractor', label: 'Contractor' },
            { value: 'client', label: 'Client' },
            { value: 'partner', label: 'Partner' },
            { value: 'other', label: 'Other' },
          ]}
          value={formData.q18EmploymentStatus}
          onChange={(value) => updateField('q18EmploymentStatus', value)}
        />

        {/* Q19: Name and Location */}
        <TextFieldQuestion
          id="q19Name"
          question="Optional: Share your name and location (completely optional)"
          transparency="This is entirely optional and helps us with attribution if you choose to share."
          fields={[
            {
              id: 'name',
              label: 'Your Name',
              value: formData.q19Name,
              onChange: (value) => updateField('q19Name', value),
              placeholder: 'Optional',
            },
            {
              id: 'location',
              label: 'Your Location',
              value: formData.q19Location,
              onChange: (value) => updateField('q19Location', value),
              placeholder: 'Optional',
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