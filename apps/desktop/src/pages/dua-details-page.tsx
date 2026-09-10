import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { getDuaById } from '@muslim-zone/core';

import { DuaDetail } from '#components/duas/dua-detail';
import { Button } from '@muslim-zone/ui/components/button';
import { Card, CardContent } from '@muslim-zone/ui/components/card';

const MODULE_KEY = 'daily';

export function DuaDetailsPage() {
  const navigate = useNavigate();
  const { duaId } = useParams<{ duaId: string }>();

  const parsedDuaId = Number(duaId);

  const dua = Number.isInteger(parsedDuaId)
    ? getDuaById(MODULE_KEY, parsedDuaId)
    : undefined;

  if (!dua) {
    return (
      <div className='mx-auto w-full max-w-xl py-20'>
        <Card className='rounded-2xl'>
          <CardContent className='flex flex-col items-center p-8 text-center'>
            <h1 className='text-xl font-semibold'>Dua not found</h1>

            <p className='text-muted-foreground mt-2 text-sm leading-6'>
              The dua you are looking for does not exist.
            </p>

            <Button
              type='button'
              variant='outline'
              onClick={() => navigate(-1)}
              className='mt-6 gap-2'
            >
              <ArrowLeft className='size-4' />
              Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <DuaDetail dua={dua} />;
}
