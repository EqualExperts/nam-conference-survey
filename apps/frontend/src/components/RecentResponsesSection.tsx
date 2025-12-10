import { useState } from 'react';
import { Table, Text, Anchor, Stack, Skeleton } from '@mantine/core';
import { RecentResponseItem } from '../types/admin';
import { ResponseDetailModal } from './ResponseDetailModal';

export interface RecentResponsesSectionProps {
  responses: RecentResponseItem[] | null;
  loading?: boolean;
}

function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);

  // Format: "Dec 3, 2025 2:34pm"
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

function formatResponseId(id: string): string {
  // Extract just the first 8 characters of the UUID for display
  return `#${id.substring(0, 8)}`;
}

export function RecentResponsesSection({ responses, loading = false }: RecentResponsesSectionProps) {
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedResponseId, setSelectedResponseId] = useState<string | null>(null);

  const handleViewClick = (responseId: string) => {
    setSelectedResponseId(responseId);
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
    setSelectedResponseId(null);
  };

  if (loading) {
    return (
      <Stack gap="md">
        <Text size="xl" fw={600} c="#2c3234">
          Recent Responses
        </Text>
        <Stack gap="xs">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} height={40} />
          ))}
        </Stack>
      </Stack>
    );
  }

  if (!responses || responses.length === 0) {
    return (
      <Stack gap="md">
        <Text size="xl" fw={600} c="#2c3234">
          Recent Responses
        </Text>
        <Text c="dimmed" ta="center" py="xl">
          No responses yet
        </Text>
      </Stack>
    );
  }

  return (
    <>
      <Stack gap="md">
        <Text size="xl" fw={600} c="#2c3234">
          Recent Responses
        </Text>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Response ID</Table.Th>
              <Table.Th>Submitted</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {responses.map((response) => (
              <Table.Tr key={response.id}>
                <Table.Td>
                  <Text ff="monospace" size="sm">
                    {formatResponseId(response.id)}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{formatTimestamp(response.submittedAt)}</Text>
                </Table.Td>
                <Table.Td>
                  <Anchor
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleViewClick(response.id);
                    }}
                    aria-label={`View response ${formatResponseId(response.id)}`}
                  >
                    View →
                  </Anchor>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>

      <ResponseDetailModal
        responseId={selectedResponseId}
        opened={modalOpened}
        onClose={handleModalClose}
      />
    </>
  );
}
