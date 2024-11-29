'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Control } from 'react-hook-form';
import { FormValues } from '../../form-schema';
import { DateTimePicker } from '@/app/(core)/components/date-time-picker';

const customStyles = `
.react-datepicker-wrapper {
  display: block;
  width: 100%;
}

.react-datepicker__input-container {
  display: block;
  width: 100%;
}

.react-datepicker-popper {
  z-index: 40;
}
`;

export function SaleDurationSection({
  control,
}: {
  control: Control<FormValues>;
}) {
  return (
    <div className='space-y-4'>
      <style>{customStyles}</style>
      <h3 className='text-lg font-semibold'>Sale Duration</h3>
      <Separator />

      <div className='grid gap-6'>
        <div className='space-y-4'>
          <FormField
            control={control}
            name='startDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date & Time</FormLabel>
                <FormControl>
                  <DateTimePicker
                    date={field.value}
                    onDateChange={field.onChange}
                  />
                </FormControl>
                {field.value && (
                  <p className='text-sm text-muted-foreground mt-1'>
                    Local time: {field.value.toLocaleString()}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='space-y-4'>
          <FormField
            control={control}
            name='endDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date & Time</FormLabel>
                <FormControl>
                  <DateTimePicker
                    date={field.value}
                    onDateChange={field.onChange}
                  />
                </FormControl>
                {field.value && (
                  <p className='text-sm text-muted-foreground mt-1'>
                    Local time: {field.value.toLocaleString()}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
