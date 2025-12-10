import { Stack, Text, List, Group, useMantineTheme } from '@mantine/core';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import {
  QuestionAnswer,
  LikertAnswer,
  MultiSelectAnswer,
  RankingAnswer,
  OpenEndedAnswer,
} from '../types/admin';
import { useTheme } from '../contexts/ThemeContext';

export interface QuestionDisplayProps {
  question: QuestionAnswer;
}

function isLikertAnswer(answer: QuestionAnswer['answer']): answer is LikertAnswer {
  return answer !== null && 'value' in answer && 'label' in answer;
}

function isMultiSelectAnswer(answer: QuestionAnswer['answer']): answer is MultiSelectAnswer {
  return answer !== null && 'selectedOptions' in answer;
}

function isRankingAnswer(answer: QuestionAnswer['answer']): answer is RankingAnswer {
  return answer !== null && 'rankedItems' in answer;
}

function isOpenEndedAnswer(answer: QuestionAnswer['answer']): answer is OpenEndedAnswer {
  return answer !== null && 'text' in answer;
}

function LikertDisplay({ answer }: { answer: LikertAnswer }) {
  const stars = [];
  const maxStars = 5;

  // Create star visualization
  for (let i = 1; i <= maxStars; i++) {
    if (i <= answer.value) {
      stars.push(<IconStarFilled key={i} size={20} style={{ color: '#ffd43b' }} />);
    } else {
      stars.push(<IconStar key={i} size={20} style={{ color: '#868e96' }} />);
    }
  }

  return (
    <Group gap="xs" align="center">
      {stars}
      <Text size="sm" c="dimmed">
        ({answer.value} - {answer.label})
      </Text>
    </Group>
  );
}

function MultiSelectDisplay({ answer }: { answer: MultiSelectAnswer }) {
  return (
    <List size="sm" withPadding>
      {answer.selectedOptions.map((option, index) => (
        <List.Item key={index}>{option}</List.Item>
      ))}
    </List>
  );
}

function RankingDisplay({ answer }: { answer: RankingAnswer }) {
  return (
    <List size="sm" withPadding type="ordered">
      {answer.rankedItems.map((item, index) => (
        <List.Item key={index}>{item}</List.Item>
      ))}
    </List>
  );
}

function OpenEndedDisplay({ answer }: { answer: OpenEndedAnswer }) {
  const theme = useMantineTheme();
  const { resolvedTheme } = useTheme();

  return (
    <Text
      size="sm"
      fs="italic"
      p="sm"
      style={{
        whiteSpace: 'pre-wrap',
        backgroundColor: resolvedTheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderLeft: `3px solid ${resolvedTheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`,
        borderRadius: theme.radius.sm,
      }}
    >
      "{answer.text}"
    </Text>
  );
}

function NoResponseDisplay() {
  return (
    <Text size="sm" fs="italic" c="dimmed">
      No response
    </Text>
  );
}

export function QuestionDisplay({ question }: QuestionDisplayProps) {
  const { questionNumber, questionText, answer } = question;

  let answerDisplay;

  if (answer === null) {
    answerDisplay = <NoResponseDisplay />;
  } else if (isLikertAnswer(answer)) {
    answerDisplay = <LikertDisplay answer={answer} />;
  } else if (isMultiSelectAnswer(answer)) {
    answerDisplay = <MultiSelectDisplay answer={answer} />;
  } else if (isRankingAnswer(answer)) {
    answerDisplay = <RankingDisplay answer={answer} />;
  } else if (isOpenEndedAnswer(answer)) {
    answerDisplay = <OpenEndedDisplay answer={answer} />;
  } else {
    answerDisplay = <NoResponseDisplay />;
  }

  return (
    <Stack gap="xs">
      <Text size="sm" fw={600}>
        Q{questionNumber}: {questionText}
      </Text>
      {answerDisplay}
    </Stack>
  );
}
