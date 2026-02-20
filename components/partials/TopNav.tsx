'use client';
import { TextInput } from '@mantine/core';
import { IconSearch, IconTerminal } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/store/store';
import { RootState } from '@/store/store';

export const TopNav = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);
  return (
    <nav className="border-b border-slate-200 px-6 py-4 sticky top-0 z-20 bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 p-1 rounded-md">
            <IconTerminal size={24} strokeWidth={1.5} color={'white'} />
          </div>
          <div className={'text-sm font-semibold text-slate-900'}>
            CodeSheets
          </div>
        </div>

        {/* Search */}
        <TextInput
          placeholder="Filter..."
          leftSection={<IconSearch size={16} />}
          className="w-40 md:w-60 rounded-md"
          value={query}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>
    </nav>
  );
};
