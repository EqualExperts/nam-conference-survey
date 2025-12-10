import { useEffect, useState } from 'react';
import { Modal, Stack, Text, LoadingOverlay, Alert, ScrollArea } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { getResponseDetail } from '../api/admin';
import { ResponseDetailDto } from '../types/admin';
import { QuestionDisplay } from './QuestionDisplay';

export interface ResponseDetailModalProps {
  responseId: string | null;
  opened: boolean;
  onClose: () => void;
}

function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);

  // Format: "Dec 2, 2025 2:34pm"
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  return new Intl.DateTimeFormat('en-US', options)
    .format(date)
    .replace(',', '')
    .toLowerCase()
    .replace(/\s([ap]m)$/, '$1');
}

export function ResponseDetailModal({ responseId, opened, onClose }: ResponseDetailModalProps) {
  const [responseDetail, setResponseDetail] = useState<ResponseDetailDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!opened || !responseId) {
      // Reset state when modal closes
      setResponseDetail(null);
      setError(null);
      return;
    }

    async function fetchResponseDetail(id: string) {
      try {
        setLoading(true);
        setError(null);
        const data = await getResponseDetail(id);
        setResponseDetail(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load response details';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchResponseDetail(responseId);
  }, [opened, responseId]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        responseDetail ? (
          <Stack gap={4}>
            <Text size="lg" fw={600}>
              Response
            </Text>
            <Text size="sm" c="dimmed">
              Submitted: {formatTimestamp(responseDetail.submittedAt)}
            </Text>
          </Stack>
        ) : (
          <Text size="lg" fw={600}>
            Response
          </Text>
        )
      }
      size="lg"
      centered
      scrollAreaComponent={ScrollArea.Autosize}
      trapFocus
      returnFocus
      closeButtonProps={{
        'aria-label': 'Close response details',
      }}
      styles={{
        body: {
          maxHeight: '60vh',
        },
      }}
    >
      <LoadingOverlay visible={loading} />

      {error && (
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="md">
          {error}
        </Alert>
      )}

      {responseDetail && !loading && (
        <Stack gap="lg">
          {responseDetail.questions.map((question) => (
            <QuestionDisplay key={question.questionNumber} question={question} />
          ))}
        </Stack>
      )}
    </Modal>
  );
}
