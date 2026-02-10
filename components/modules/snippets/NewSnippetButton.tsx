'use client';

import { useState } from 'react';
import {
  Paper,
  Stack,
  Group,
  Button,
  TextInput,
  Textarea,
  Select,
} from '@mantine/core';
import { IconChevronDown, IconPlus } from '@tabler/icons-react';

interface NewSnippetProps {
  onAdd: (title: string, code: string, language: string) => void;
}
export const NewSnippetButton = ({ onAdd }: NewSnippetProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleDismiss = () => {
    setIsExpanded(false);
    setTitle('');
    setCode('');
    setLanguage('JavaScript');
  };

  const handleSave = () => {
    if (title && code) {
      onAdd(title, code, language);
      handleDismiss();
    }
  };

  return (
    <Paper
      shadow="sm"
      withBorder
      radius="md"
      className={'max-w-3xl mx-auto mb-12 '}
    >
      <Stack gap="xs">
        <Group
          gap="xs"
          style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}
          px={'lg'}
          py={'xs'}
        >
          <IconPlus size={16} strokeWidth={1} />
          <div className={'text-xs font-bold text-slate-400'}>NEW SNIPPET</div>
        </Group>

        <TextInput
          pt={0}
          p={'sm'}
          placeholder="Snippet title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onClick={handleExpand}
          onFocus={handleExpand}
          variant="unstyled"
          size="md"
        />

        {isExpanded && (
          <>
            <Textarea
              px={'sm'}
              placeholder="Paste code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              minRows={8}
              autosize
              styles={{
                input: {
                  fontFamily: 'var(--mantine-font-family-monospace)',
                },
              }}
            />

            <Group justify="space-between" align="center" p={'sm'}>
              <Group gap="xs" align="center">
                <div className={'text-xs font-bold text-slate-400'}>LANG:</div>
                <Select
                  value={language}
                  onChange={(value) => setLanguage(value || 'JavaScript')}
                  data={['JavaScript', 'Python', 'CSS', 'React', 'HTML']}
                  variant={'unstyled'}
                  w={96}
                  rightSection={<IconChevronDown size={16} />}
                />
              </Group>

              <Group>
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={handleDismiss}
                  size="xs"
                >
                  Dismiss
                </Button>
                <Button color="gray" onClick={handleSave} size="xs">
                  Save Snippet
                </Button>
              </Group>
            </Group>
          </>
        )}
      </Stack>
    </Paper>
  );
};
