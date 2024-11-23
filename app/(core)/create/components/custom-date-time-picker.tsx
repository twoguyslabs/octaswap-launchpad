import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { FormValues } from '../form-schema';

interface CustomDateTimePickerProps {
  control: Control<FormValues>;
  name: 'startDate' | 'endDate';
  label: string;
}

export function CustomDateTimePicker({
  control,
  name,
  label,
}: CustomDateTimePickerProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-2'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type='datetime-local'
              {...field}
              value={
                field.value
                  ? new Date(field.value).toISOString().slice(0, 16)
                  : ''
              }
              onChange={(e) => {
                const date = new Date(e.target.value);
                field.onChange(date);
              }}
              className='w-full'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
