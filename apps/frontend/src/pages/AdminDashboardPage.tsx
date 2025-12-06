import { useState, useEffect } from 'react';
import { Container, Stack, Title, SimpleGrid, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { MetricCard } from '../components/MetricCard';
import { RecentResponsesSection } from '../components/RecentResponsesSection';
import { getAdminMetrics, getAdminRecentResponses } from '../api/admin';
import { AdminMetricsResponse, AdminRecentResponsesResponse } from '../types/admin';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<AdminMetricsResponse | null>(null);
  const [recentResponses, setRecentResponses] = useState<AdminRecentResponsesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch both endpoints concurrently for optimal performance
        const [metricsData, responsesData] = await Promise.all([
          getAdminMetrics(),
          getAdminRecentResponses(),
        ]);

        setMetrics(metricsData);
        setRecentResponses(responsesData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Title order={1} ta="center" c="equalNavy.5">
          Admin Dashboard
        </Title>

        {/* Error State */}
        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Error Loading Dashboard"
            color="red"
            variant="filled"
          >
            {error}. Please try refreshing the page.
          </Alert>
        )}

        {/* Metrics Section */}
        <Stack gap="md">
          <Title order={2} size="h3">
            Survey Metrics
          </Title>
          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            spacing="lg"
          >
            <MetricCard
              label="Completed"
              value={metrics?.completed ?? null}
              loading={loading}
              ariaLabel="Completed responses count"
            />
            <MetricCard
              label="In Progress"
              value={metrics?.inProgress ?? null}
              loading={loading}
              ariaLabel="In progress responses count"
            />
          </SimpleGrid>
        </Stack>

        {/* Recent Responses Section */}
        <RecentResponsesSection
          responses={recentResponses?.responses ?? null}
          loading={loading}
        />
      </Stack>
    </Container>
  );
}
