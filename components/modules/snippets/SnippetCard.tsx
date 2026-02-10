'use client';

import {
  Card,
  Badge,
  Group,
  Button,
  TextInput,
  Textarea,
  Avatar,
} from '@mantine/core';
import {
  IconCopy,
  IconTrash,
  IconPencilMinus,
  IconChecks,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Snippet } from '@/utils/interfaces/snippet';

interface SnippetCardProps {
  snippet: Snippet;
  isEditing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onDelete: () => void;
  onSave: (id: number, title: string, code: string) => void;
}

export const SnippetCard = ({
  snippet,
  isEditing,
  onEdit,
  onCancelEdit,
  onDelete,
  onSave,
}: SnippetCardProps) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editedTitle, setEditedTitle] = useState(snippet.title);
  const [editedCode, setEditedCode] = useState(snippet.code);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEdit = () => {
    setEditedTitle(snippet.title);
    setEditedCode(snippet.code);
    onEdit();
  };

  const handleSave = () => {
    onSave(snippet.id, editedTitle, editedCode);
  };

  const handleCancel = () => {
    setEditedTitle(snippet.title);
    setEditedCode(snippet.code);
    onCancelEdit();
  };

  return (
    <Card
      mt={'xl'}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <Badge variant="transparent" size="sm" className="uppercase">
          <span className={'text-slate-300 '}>#{'  '}</span>
          <span className={'text-slate-400 '}>{snippet.language}</span>
        </Badge>

        {isHovered && (
          <Group gap="xs">
            <IconPencilMinus
              size={14}
              className={
                'text-slate-300 hover:text-black transition-colors cursor-pointer'
              }
              onClick={handleEdit}
            />
            <IconTrash
              size={14}
              className={
                'text-slate-300 hover:text-red-600 transition-colors cursor-pointer'
              }
              onClick={onDelete}
            />
          </Group>
        )}
      </div>
      {!isEditing && (
        <div>
          <div className="font-semibold text-sm my-4">{snippet.title}</div>
          <div className="mb-4 h-32 bg-slate-50 p-4 rounded-md text-[10px] font-mono text-slate-500 border border-slate-100">
            {snippet.code}
          </div>
        </div>
      )}

      {isEditing && (
        <>
          <TextInput
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            my="md"
            styles={{
              input: {
                fontWeight: 700,
                fontSize: '12px',
                border: 'none',
                borderBottom: '1px solid #e2e8f0',
                borderRadius: 0,
                padding: '0',
              },
            }}
          />

          <Textarea
            value={editedCode}
            onChange={(e) => setEditedCode(e.target.value)}
            minRows={6}
            autosize
            mb={8}
            styles={{
              input: {
                fontFamily: 'monospace',
                fontSize: '10px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
              },
            }}
          />

          <Group justify="flex-end" gap="xs" mb="md">
            <Button
              variant="subtle"
              color="gray"
              size="xs"
              style={{ height: '22px', padding: '0 2px', fontSize: '11px' }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              color="dark"
              size="xs"
              style={{ height: '22px', padding: '0 10px', fontSize: '11px' }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Group>
        </>
      )}

      <Group justify="space-between" className="text-xs text-slate-400 mt-4">
        <Group gap="xs">
          <Avatar radius={'sm'} size={20}>
            {snippet.author
              .split(' ')
              .map((word) => word[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </Avatar>
          <div className="text-slate-500 text-xs">{snippet.date}</div>
        </Group>

        <div
          className={`flex items-center gap-2 text-xs transition-colors cursor-pointer ${copied ? 'text-black' : 'text-slate-400 hover:text-black'}`}
          onClick={handleCopy}
        >
          {copied ? <IconChecks size={14} /> : <IconCopy size={14} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </div>
      </Group>
    </Card>
  );
};
