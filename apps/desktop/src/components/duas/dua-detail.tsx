import { ArrowLeft, Bookmark, BookmarkCheck, Check, Copy } from 'lucide-react';
import { useState } from 'react';

import type { Dua } from '@muslim-zone/core';
import { useFeaturedDuas } from '@muslim-zone/react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@muslim-zone/ui/components/button';
import { Card, CardContent } from '@muslim-zone/ui/components/card';

type DuaDetailProps = {
  dua: Dua;
};

export function DuaDetail({ dua }: DuaDetailProps) {
  const { isFavourited, toggle } = useFeaturedDuas();
  const navigate = useNavigate();

  const bookmarked = isFavourited(dua.id);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = [
      dua.title.en,
      '',
      dua.arabic,
      '',
      dua.transliteration?.en,
      '',
      dua.translation.en,
      '',
      dua.source?.reference,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Clipboard access may be unavailable.
    }
  };

  const handleToggleBookmark = () => {
    toggle(dua.id);
  };

  return (
    <div className='mx-auto w-full max-w-[1100px] space-y-6'>
      {/* Navigation */}
      <div className='flex items-center justify-between gap-4'>
        <Button
          type='button'
          variant='outline'
          onClick={() => navigate(-1)}
          className='mt-6 gap-2'
        >
          <ArrowLeft className='size-4' />
          Back
        </Button>

        <Button
          type='button'
          variant={bookmarked ? 'secondary' : 'outline'}
          onClick={handleToggleBookmark}
          className='gap-2'
        >
          {bookmarked ? (
            <BookmarkCheck className='size-4 shrink-0 text-emerald-500' />
          ) : (
            <Bookmark className='size-4' />
          )}

          {bookmarked ? 'Saved' : 'Save Dua'}
        </Button>
      </div>

      {/* Title */}
      <header>
        <p className='text-primary text-sm font-medium'>Dua</p>

        <h1 className='text-foreground mt-1 text-3xl font-semibold tracking-tight'>
          {dua.title.en}
        </h1>

        {dua.title.bn && (
          <p className='text-muted-foreground mt-2 text-sm'>{dua.title.bn}</p>
        )}
      </header>

      {/* Dua */}
      <Card className='rounded-2xl'>
        <CardContent className='p-6 sm:p-8 lg:p-10'>
          {/* Arabic */}
          <div className='rounded-2xl bg-emerald-500/5 px-5 py-8 sm:px-8 sm:py-10'>
            <p
              dir='rtl'
              lang='ar'
              className='text-foreground text-center text-3xl font-medium leading-[2.2] sm:text-4xl'
            >
              {dua.arabic}
            </p>
          </div>

          {/* Transliteration */}
          {dua.transliteration?.en && (
            <section className='mt-8'>
              <h2 className='text-muted-foreground text-xs font-semibold uppercase tracking-wider'>
                Transliteration
              </h2>

              <p className='text-foreground mt-3 text-base italic leading-7'>
                {dua.transliteration.en}
              </p>
            </section>
          )}

          {/* Translation */}
          <section className='mt-8'>
            <h2 className='text-muted-foreground text-xs font-semibold uppercase tracking-wider'>
              Translation
            </h2>

            <p className='text-foreground mt-3 text-lg leading-8'>
              {dua.translation.en}
            </p>
          </section>

          {/* Source */}
          {dua.source && (
            <section className='border-border mt-8 border-t pt-6'>
              <p className='text-muted-foreground text-xs font-semibold uppercase tracking-wider'>
                Source
              </p>

              <p className='text-foreground mt-2 text-sm font-medium'>
                {dua.source.reference}
              </p>
            </section>
          )}

          {/* Actions */}
          <div className='border-border mt-8 flex flex-wrap items-center gap-3 border-t pt-6'>
            <Button
              type='button'
              variant='outline'
              onClick={handleCopy}
              className='gap-2'
            >
              {copied ? (
                <Check className='size-4' />
              ) : (
                <Copy className='size-4' />
              )}

              {copied ? 'Copied' : 'Copy Dua'}
            </Button>

            <Button
              type='button'
              variant={bookmarked ? 'secondary' : 'outline'}
              onClick={handleToggleBookmark}
              className='gap-2'
            >
              {bookmarked ? (
                <BookmarkCheck className='size-4 shrink-0 text-emerald-500' />
              ) : (
                <Bookmark className='size-4' />
              )}

              {bookmarked ? 'Saved' : 'Save'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
