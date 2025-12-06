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
  Box,
  Group,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { QuestionRenderer } from '../components/QuestionRenderer';
import { LanguageToggle } from '../components/LanguageToggle';
import { SurveyFormState } from '../types/survey';
import { submitSurvey } from '../api/survey';
import { SURVEY_QUESTIONS, TOTAL_QUESTIONS } from '../config/survey-questions';
import { useLanguage } from '../contexts/LanguageContext';
import { uiTranslations } from '../translations/ui';

export default function SurveyPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = uiTranslations[language];
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
  ): void => {
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

      // Validate Q15 character limit
      if (formData.q15AdditionalFeedback.length > 250) {
        const errorMsg = `${t.pleaseReduceComment} 250 ${t.charactersOrFewer}`;
        setError(errorMsg);
        notifications.show({
          title: t.validationError,
          message: errorMsg,
          color: 'red',
          icon: <IconAlertCircle />,
        });
        setIsSubmitting(false);
        return;
      }

      await submitSurvey(formData);

      notifications.show({
        title: t.successTitle,
        message: t.successMessage,
        color: 'green',
        icon: <IconCheck />,
      });

      navigate('/thanks');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit survey';
      setError(message);
      notifications.show({
        title: t.submissionError,
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
              {t.submittingMessage}
            </Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        {/* Sticky Header and Progress */}
        <Box
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'var(--mantine-color-body)',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            marginTop: '-1rem',
          }}
        >
          <Stack gap="md">
            {/* Language Toggle */}
            <Group justify="flex-end">
              <LanguageToggle />
            </Group>

            {/* Header */}
            <Stack align="center" gap="md">
              <Image
                src="https://www.equalexperts.com/wp-content/uploads/2024/10/2024-Logo.svg"
                alt="Equal Experts"
                h={60}
                w="auto"
              />
              <Title order={1} ta="center" c="equalBlue.4">
                {t.title}
              </Title>
              <Text size="lg" ta="center" c="dimmed">
                {t.subtitle}
              </Text>
            </Stack>

            {/* Progress Indicator */}
            <ProgressIndicator answered={calculateAnswered()} total={TOTAL_QUESTIONS} />
          </Stack>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert
            icon={<IconAlertCircle />}
            title={t.submissionError}
            color="red"
            withCloseButton
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {/* Survey Questions */}
        {SURVEY_QUESTIONS.map((config, index) => (
          <QuestionRenderer
            key={config.id}
            config={config}
            formData={formData}
            updateField={updateField}
            questionNumber={index + 1}
            totalQuestions={TOTAL_QUESTIONS}
          />
        ))}

        {/* Submit Button */}
        <Button
          size="lg"
          color="equalBlue"
          onClick={handleSubmit}
          loading={isSubmitting}
          fullWidth
        >
          {t.submitButton}
        </Button>

        <Text size="sm" c="dimmed" ta="center">
          {t.optionalNote}
        </Text>
      </Stack>
    </Container>
  );
}
