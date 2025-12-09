import { useState, FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  Stack,
  Title,
  Button,
  Image,
  Paper,
  TextInput,
  PasswordInput,
  Text,
  Alert,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validate non-empty fields
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    // Attempt login
    const success = login(username, password);

    if (success) {
      // Redirect to intended destination or default to /admin
      const redirectTo = searchParams.get('redirect') || '/admin';
      navigate(redirectTo, { replace: true });
    } else {
      setError('Invalid username or password');
      setPassword(''); // Clear password on failed attempt
    }
  };

  return (
    <Container size="xs" py="xl">
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
            Admin Login
          </Title>
          <Text size="sm" ta="center" c="dimmed">
            Sign in to access the admin dashboard
          </Text>
        </Stack>

        {/* Login Form */}
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              {/* Error Alert */}
              {error && (
                <Alert
                  icon={<IconAlertCircle />}
                  title="Authentication Error"
                  color="red"
                  withCloseButton
                  onClose={() => setError(null)}
                >
                  {error}
                </Alert>
              )}

              {/* Username Field */}
              <TextInput
                label="Username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                required
                autoComplete="username"
                autoFocus
              />

              {/* Password Field */}
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
                autoComplete="current-password"
              />

              {/* Submit Button */}
              <Button type="submit" color="equalBlue" size="md" fullWidth>
                Sign In
              </Button>
            </Stack>
          </form>
        </Paper>

        <Text size="xs" c="dimmed" ta="center">
          For access issues, please contact the system administrator
        </Text>
      </Stack>
    </Container>
  );
}
