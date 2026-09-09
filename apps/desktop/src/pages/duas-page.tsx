import { ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  getCategories,
  getDuaById,
  getDuasByCategory,
  searchDuas,
  type Dua,
  type DuaCategory,
} from '@muslim-zone/core';

import { useFeaturedDuas } from '@muslim-zone/react';

import { Button } from '@muslim-zone/ui/components/button';

import { DuaCategoryCard } from '../components/duas/dua-category-card';
import { DuaDetail } from '../components/duas/dua-detail';
import { DuaEmptyState } from '../components/duas/dua-empty-state';
import { DuaListCard } from '../components/duas/dua-list-card';
import { DuaSearch } from '../components/duas/dua-search';

type ViewState =
  | {
      type: 'categories';
    }
  | {
      type: 'category';
      category: DuaCategory;
    }
  | {
      type: 'dua';
      dua: Dua;
    };

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
  const categories = useMemo(() => getCategories(), []);

  const [search, setSearch] = useState('');

  const [view, setView] = useState<ViewState>({
    type: 'categories',
  });

  const { featuredIds } = useFeaturedDuas();

  const normalizedSearch = search.trim().toLowerCase();

  /*
   * Global search
   */
  const searchResults = useMemo(() => {
    if (!normalizedSearch) {
      return [];
    }

    return searchDuas(MODULE_KEY, normalizedSearch);
  }, [normalizedSearch]);

  //  Saved duas
  const savedDuas = useMemo(
    () =>
      featuredIds
        .map((id) => getDuaById(MODULE_KEY, id))
        .filter((dua): dua is Dua => dua !== undefined),
    [featuredIds],
  );

  //  Categories filtered by search
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

  //  Dua detail view
  if (view.type === 'dua') {
    return (
      <DuaDetail
        dua={view.dua}
        onBack={() => {
          setView({
            type: 'categories',
          });
        }}
      />
    );
  }

  //  Selected category
  const selectedCategory = view.type === 'category' ? view.category : null;

  //  Category duas
  const categoryDuas = selectedCategory
    ? getDuasByCategory(MODULE_KEY, selectedCategory.id)
    : [];

  const displayedCategoryDuas = normalizedSearch
    ? categoryDuas.filter((dua) =>
        getDuaSearchText(dua).includes(normalizedSearch),
      )
    : categoryDuas;

  //  Global search is active only
  //  when we're on the main categories view.
  const showingGlobalSearch =
    Boolean(normalizedSearch) && view.type === 'categories';

  //  Main page
  return (
    <div className='mx-auto w-full max-w-[1500px] space-y-8'>
      {/* Header */}
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

        {/* Search */}
        <DuaSearch value={search} onChange={setSearch} />
      </header>

      {/* Category back button */}
      {selectedCategory && (
        <Button
          type='button'
          variant='ghost'
          onClick={() => {
            setSearch('');

            setView({
              type: 'categories',
            });
          }}
          className='-ml-2 gap-2'
        >
          <ArrowLeft className='size-4' />
          All Categories
        </Button>
      )}

      {/* Global search results */}
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
            <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
              {searchResults.map((dua) => (
                <DuaListCard
                  key={dua.id}
                  dua={dua}
                  onClick={() => {
                    setView({
                      type: 'dua',
                      dua,
                    });
                  }}
                />
              ))}
            </div>
          ) : (
            <DuaEmptyState />
          )}
        </section>
      )}

      {/* Categories */}
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

                      setView({
                        type: 'category',
                        category,
                      });
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

          {/* Saved Duas */}
          {savedDuas.length > 0 && (
            <section className='space-y-5'>
              <div>
                <h2 className='text-xl font-semibold'>Saved Duas</h2>

                <p className='text-muted-foreground mt-1 text-sm'>
                  Your bookmarked duas
                </p>
              </div>

              <div className='grid gap-4'>
                {savedDuas.slice(0, 4).map((dua) => (
                  <DuaListCard
                    key={dua.id}
                    dua={dua}
                    onClick={() => {
                      setView({
                        type: 'dua',
                        dua,
                      });
                    }}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Category duas */}
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
                <DuaListCard
                  key={dua.id}
                  dua={dua}
                  onClick={() => {
                    setView({
                      type: 'dua',
                      dua,
                    });
                  }}
                />
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
