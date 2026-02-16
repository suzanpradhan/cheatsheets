'use client';
import { NewSnippetButton } from '@/components/modules/snippets/NewSnippetButton';
import { SnippetCard } from '@/components/modules/snippets/SnippetCard';
import { useState } from 'react';
import {
  useCreateSheetMutation,
  useDeleteSheetMutation,
  useGetSheetsQuery,
  useUpdateSheetMutation,
} from '@/store/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function SnippetsGrid() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const query = useSelector((state: RootState) => state.search.query);
  const { data: sheets, isLoading: sheetloading } = useGetSheetsQuery(query);
  const [createSheet, { isLoading: isCreating }] = useCreateSheetMutation();
  const [updateSheet] = useUpdateSheetMutation();
  const [deleteSheet] = useDeleteSheetMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteSheet(id).unwrap();
      if (editingId === id) setEditingId(null);
    } catch (error) {
      console.error('Failed to delete sheet', error);
    }
  };

  const handleSave = async (
    id: number,
    updatedTitle: string,
    updatedCode: string,
  ) => {
    const sheet = sheets?.find((s) => s.id === id);
    if (!sheet) return;
    const languageName = sheet.language.name;
    try {
      await updateSheet({
        id,
        data: {
          title: updatedTitle,
          description: sheet.description,
          code_snippet: updatedCode,
          language: languageName,
        },
      }).unwrap();
      setEditingId(null);
    } catch (error) {
      console.error('Failed to update sheet', error);
    }
  };

  const handleAdd = async (
    title: string,
    description: string,
    code_snippet: string,
    language: string,
  ) => {
    try {
      await createSheet({
        title,
        description: description || 'Description',
        code_snippet,
        language,
      }).unwrap();
    } catch (error) {
      console.error('Failed to create sheet', error);
    }
  };
  if (sheetloading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className={'w-full my-12'}>
      <NewSnippetButton onAdd={handleAdd} isLoading={isCreating} />
      {!sheets || sheets.length === 0 ? (
        <div className={'text-center text-slate-400 mt-16'}>
          {query
            ? `No sheets found for "${query}". `
            : 'No sheets found. Create your first one! '}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 md:max-w-5xl mx-auto">
          {sheets.map((snippet) => (
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
      )}
    </section>
  );
}
