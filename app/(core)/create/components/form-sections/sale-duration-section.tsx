'use client';

import { useState, useEffect } from 'react';
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
import DatePicker from 'react-datepicker';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [minStartDate, setMinStartDate] = useState<Date>(new Date());

  useEffect(() => {
    // Update minStartDate every minute to ensure it's always current
    const interval = setInterval(() => {
      setMinStartDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    return (
      date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
        hour12: false,
      }) + ' UTC'
    );
  };

  const isInPast = (date: Date) => {
    return date < minStartDate;
  };

  const getLocalTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  return (
    <div className='space-y-4'>
      <style>{customStyles}</style>
      <h3 className='text-lg font-semibold'>Sale Duration (UTC)</h3>
      <Separator />

      <Alert variant='default' className='mb-6'>
        <Info className='h-4 w-4' />
        <AlertDescription>
          Times are automatically converted from your local timezone (
          {getLocalTimezone()}) to UTC. The displayed UTC time may differ from
          your local time due to timezone conversion.
        </AlertDescription>
      </Alert>

      <div className='grid gap-6'>
        <div className='space-y-4'>
          <FormField
            control={control}
            name='startDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date & Time</FormLabel>
                <FormControl>
                  <div className='grid w-full items-center'>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => {
                        if (date && !isInPast(date)) {
                          field.onChange(date);
                          setStartDate(date);
                          if (endDate && date > endDate) {
                            setEndDate(null);
                          }
                        }
                      }}
                      showTimeSelect
                      timeFormat='HH:mm'
                      timeIntervals={30}
                      dateFormat='MMMM d, yyyy h:mm aa'
                      timeCaption='Time'
                      minDate={minStartDate}
                      maxDate={endDate || undefined}
                      filterTime={(time) => !isInPast(time)}
                      customInput={
                        <Button
                          type='button'
                          variant='outline'
                          className='w-full justify-start text-left font-normal'
                        >
                          <span className='truncate'>
                            {field.value
                              ? formatDate(field.value)
                              : 'Pick a date and time'}
                          </span>
                          <div className='ml-auto flex shrink-0 items-center'>
                            <CalendarIcon className='h-4 w-4 opacity-50' />
                            <Clock className='ml-2 h-4 w-4 opacity-50' />
                          </div>
                        </Button>
                      }
                    />
                  </div>
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
                  <div className='grid w-full items-center'>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => {
                        if (date && !isInPast(date)) {
                          field.onChange(date);
                          setEndDate(date);
                        }
                      }}
                      showTimeSelect
                      timeFormat='HH:mm'
                      timeIntervals={30}
                      dateFormat='MMMM d, yyyy h:mm aa'
                      timeCaption='Time'
                      minDate={startDate || minStartDate}
                      filterTime={(time) => !isInPast(time)}
                      customInput={
                        <Button
                          type='button'
                          variant='outline'
                          className='w-full justify-start text-left font-normal'
                        >
                          <span className='truncate'>
                            {field.value
                              ? formatDate(field.value)
                              : 'Pick a date and time'}
                          </span>
                          <div className='ml-auto flex shrink-0 items-center'>
                            <CalendarIcon className='h-4 w-4 opacity-50' />
                            <Clock className='ml-2 h-4 w-4 opacity-50' />
                          </div>
                        </Button>
                      }
                    />
                  </div>
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
