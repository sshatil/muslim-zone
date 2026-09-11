import { ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  getCategories,
  getDuasByCategory,
  searchDuas,
  type Dua,
} from '@muslim-zone/core';
import { Button } from '@muslim-zone/ui/components/button';

import { DuaCategoryCard } from '#components/duas/dua-category-card';
import { DuaEmptyState } from '#components/duas/dua-empty-state';
import { DuaListCard } from '#components/duas/dua-list-card';
import { DuaSearch } from '#components/duas/dua-search';

const MODULE_KEY = 'daily';

function getDuaSearchText(dua: Dua) {
  return [
    dua.key,
    dua.title.en,
    dua.title.bn,
    dua.arabic,
    dua.transliteration?.en,
    dua.transliteration?.bn,
    dua.translation.en,
    dua.translation.bn,
    ...(dua.tags ?? []),
    dua.source?.reference,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function DuasPage() {
  const navigate = useNavigate();

  const { categoryId } = useParams<{
    categoryId?: string;
  }>();

  const categories = useMemo(() => getCategories(), []);

  const [search, setSearch] = useState('');

  const normalizedSearch = search.trim().toLowerCase();

  const selectedCategory = useMemo(() => {
    if (!categoryId) {
      return null;
    }

    const id = Number(categoryId);

    if (!Number.isInteger(id)) {
      return null;
    }

    return categories.find((category) => category.id === id) ?? null;
  }, [categoryId, categories]);

  const searchResults = useMemo(() => {
    if (!normalizedSearch) {
      return [];
    }

    return searchDuas(MODULE_KEY, normalizedSearch);
  }, [normalizedSearch]);

  const filteredCategories = useMemo(() => {
    if (!normalizedSearch) {
      return categories;
    }

    return categories.filter((category) => {
      const categoryText = [category.key, category.name.en, category.name.bn]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const categoryDuas = getDuasByCategory(MODULE_KEY, category.id);

      return (
        categoryText.includes(normalizedSearch) ||
        categoryDuas.some((dua) =>
          getDuaSearchText(dua).includes(normalizedSearch),
        )
      );
    });
  }, [categories, normalizedSearch]);

  const categoryDuas = selectedCategory
    ? getDuasByCategory(MODULE_KEY, selectedCategory.id)
    : [];

  const displayedCategoryDuas = normalizedSearch
    ? categoryDuas.filter((dua) =>
        getDuaSearchText(dua).includes(normalizedSearch),
      )
    : categoryDuas;

  const showingGlobalSearch = Boolean(normalizedSearch) && !selectedCategory;

  return (
    <div className='mx-auto w-full max-w-[1500px] space-y-8'>
      <header className='space-y-4'>
        <div>
          <p className='text-primary text-sm font-medium'>Duas</p>

          <h1 className='text-foreground mt-1 text-3xl font-semibold tracking-tight'>
            {selectedCategory ? selectedCategory.name.en : 'Duas Collection'}
          </h1>

          <p className='text-muted-foreground mt-2 max-w-2xl text-sm leading-6'>
            {selectedCategory
              ? `Duas for ${selectedCategory.name.en.toLowerCase()}.`
              : 'Explore authentic daily duas and supplications organized by category.'}
          </p>
        </div>

        <DuaSearch value={search} onChange={setSearch} />
      </header>

      {selectedCategory && (
        <Button
          type='button'
          variant='outline'
          onClick={() => navigate('/duas')}
          className='mt-6 gap-2'
        >
          <ArrowLeft className='size-4' />
          All Categories
        </Button>
      )}

      {showingGlobalSearch && (
        <section className='space-y-5'>
          <div>
            <h2 className='text-xl font-semibold'>Search Results</h2>

            <p className='text-muted-foreground mt-1 text-sm'>
              {searchResults.length}{' '}
              {searchResults.length === 1 ? 'dua' : 'duas'} found
            </p>
          </div>

          {searchResults.length > 0 ? (
            <div className='grid gap-4'>
              {searchResults.map((dua) => (
                <DuaListCard key={dua.id} dua={dua} />
              ))}
            </div>
          ) : (
            <DuaEmptyState />
          )}
        </section>
      )}

      {!selectedCategory && !showingGlobalSearch && (
        <>
          <section className='space-y-5'>
            <div>
              <h2 className='text-xl font-semibold'>Browse by Category</h2>

              <p className='text-muted-foreground mt-1 text-sm'>
                {categories.length} categories available
              </p>
            </div>

            {filteredCategories.length > 0 ? (
              <div className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
                {filteredCategories.map((category) => (
                  <DuaCategoryCard
                    key={category.id}
                    category={category}
                    onClick={() => {
                      setSearch('');

                      navigate(`/duas/category/${category.id}`);
                    }}
                  />
                ))}
              </div>
            ) : (
              <DuaEmptyState
                title='No categories found'
                description='Try another search term.'
              />
            )}
          </section>
        </>
      )}

      {selectedCategory && (
        <section className='space-y-5'>
          <div>
            <h2 className='text-xl font-semibold'>
              {selectedCategory.name.en} Duas
            </h2>

            <p className='text-muted-foreground mt-1 text-sm'>
              {displayedCategoryDuas.length}{' '}
              {displayedCategoryDuas.length === 1 ? 'dua' : 'duas'}
            </p>
          </div>

          {displayedCategoryDuas.length > 0 ? (
            <div className='grid gap-4'>
              {displayedCategoryDuas.map((dua) => (
                <DuaListCard key={dua.id} dua={dua} />
              ))}
            </div>
          ) : (
            <DuaEmptyState />
          )}
        </section>
      )}
    </div>
  );
}
