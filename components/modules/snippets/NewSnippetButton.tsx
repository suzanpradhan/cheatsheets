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
  Loader,
} from '@mantine/core';
import { IconChevronDown, IconPlus } from '@tabler/icons-react';
import { useGetLanguagesQuery } from '@/store/api';

interface NewSnippetProps {
  onAdd: (
    title: string,
    description: string,
    code_snippet: string,
    language: string,
  ) => void;
  isLoading?: boolean;
}
export const NewSnippetButton = ({
  onAdd,
  isLoading: isCreating = false,
}: NewSnippetProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [code_snippet, setCodeSnippet] = useState('');
  const [language, setLanguage] = useState('');
  const { data: languages, isLoading: languagesLoading } =
    useGetLanguagesQuery();
  const selectedLanguage = language || (languages?.[0]?.name ?? '');

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleDismiss = () => {
    if (isCreating) return;
    setIsExpanded(false);
    setTitle('');
    setCodeSnippet('');
    setLanguage('');
  };

  const handleSave = () => {
    if (title && code_snippet && selectedLanguage) {
      onAdd(title, '', code_snippet, selectedLanguage);
      setTitle('');
      setCodeSnippet('');
      setLanguage('');
      setIsExpanded(false);
    }
  };
  const languageOptions = languages?.map((lang) => lang.name) || [];
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
          placeholder="Sheet title..."
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
              value={code_snippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
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
                {languagesLoading ? (
                  <Loader size={16} />
                ) : (
                  <Select
                    value={selectedLanguage}
                    onChange={(value) => setLanguage(value || '')}
                    data={languageOptions}
                    variant={'unstyled'}
                    w={96}
                    rightSection={<IconChevronDown size={16} />}
                    disabled={isCreating}
                    placeholder={'Select language'}
                  />
                )}
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
                <Button
                  color="dark"
                  onClick={handleSave}
                  size="xs"
                  disabled={!title || !code_snippet || !selectedLanguage}
                  loading={isCreating}
                >
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
