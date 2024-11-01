'use client';

import React, { useCallback, useRef } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Logo } from '@repo/ui/components/ui/logo';
import { Input } from '@repo/ui/components/ui/input';
import { useDebounce } from '@repo/ui/hooks/use-debounce';
import { Label } from '@repo/ui/components/ui/label';
import { useRouter, useSearchParams } from 'next/navigation';

export const InputForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const airport = searchParams.get('airport');

  const debouncedInput = useDebounce((value: string) => {
    router.replace(value.length >= 3 ? `?airport=${value}` : '/', {
      scroll: false,
    });
  }, 300);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => debouncedInput(e.target.value),
    [debouncedInput]
  );

  const reset = useCallback(() => {
    debouncedInput.clear();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    router.replace('/', {
      scroll: false,
    });
  }, [router, debouncedInput, inputRef]);

  return (
    <Card data-testid="input-form" className="w-full">
      <CardHeader>
        <CardTitle className="flex items-start max-md:flex-col md:items-end md:gap-4">
          <Logo height={60} className="mb-1 w-auto" />
          <span className="bg-gradient-pink bg-clip-text text-5xl !leading-tight text-transparent md:text-6xl">
            Flight tracker
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-end gap-2">
        <div className="grid w-full items-center gap-1.5">
          <Label>Airport</Label>
          <Input
            ref={inputRef}
            data-testid="airport-input"
            placeholder="Where is your flight coming from?"
            defaultValue={airport ?? ''}
            onChange={onChange}
          />
        </div>
        <Button data-testid="reset-button" variant="ghost" onClick={reset}>
          Reset
        </Button>
      </CardContent>
    </Card>
  );
};
