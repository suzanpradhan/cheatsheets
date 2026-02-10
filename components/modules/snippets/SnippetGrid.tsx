'use client';
import { NewSnippetButton } from '@/components/modules/snippets/NewSnippetButton';
import { SnippetCard } from '@/components/modules/snippets/SnippetCard';
import { Snippet } from '@/utils/interfaces/snippet';
import { useState } from 'react';

const mockSnippets = [
  {
    id: 1,
    language: 'JAVASCRIPT',
    title: 'Array.reduce() Pattern',
    code: `const sum = arr.reduce((acc, curr) => acc + curr, 0);`,
    author: 'Ali',
    date: 'Oct 24',
  },
  {
    id: 2,
    language: 'CSS',
    title: 'Tailwind Flex Center',
    code: `<div className="flex items-center justify-center">`,
    author: 'JL',
    date: 'Oct 25',
  },
  {
    id: 3,
    language: 'PYTHON',
    title: 'Python List Comp',
    code: `new_list = [x for x in old_list if x > 10]`,
    author: 'SC',
    date: 'Oct 26',
  },
];

export default function SnippetsGrid() {
  const [snippets, setSnippets] = useState<Snippet[]>(mockSnippets);
  const [editingId, setEditingId] = useState<number | null>(null);
  const handleDelete = (id: number) => {
    setSnippets(snippets.filter((snippet) => snippet.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleSave = (
    id: number,
    updatedTitle: string,
    updatedCode: string,
  ) => {
    setSnippets(
      snippets.map((snippet) =>
        snippet.id === id
          ? { ...snippet, title: updatedTitle, code: updatedCode }
          : snippet,
      ),
    );
    setEditingId(null);
  };

  const handleAdd = (title: string, code: string, language: string) => {
    const maxId =
      snippets.length > 0 ? Math.max(...snippets.map((s) => s.id)) : 0;
    const newSnippet = {
      id: maxId + 1,
      title,
      code,
      language,
      author: 'Dikshya',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    };
    setSnippets([newSnippet, ...snippets]);
  };
  return (
    <section className={'w-full my-12'}>
      <NewSnippetButton onAdd={handleAdd} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 md:max-w-5xl mx-auto">
        {snippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            isEditing={editingId === snippet.id}
            onEdit={() => setEditingId(snippet.id)}
            onCancelEdit={() => setEditingId(null)}
            onDelete={() => handleDelete(snippet.id)}
            onSave={handleSave}
          />
        ))}
      </div>
    </section>
  );
}
