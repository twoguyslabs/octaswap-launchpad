'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DateTimePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
}

export function DateTimePicker({ date, onDateChange }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    date
  );
  const [selectedHour, setSelectedHour] = React.useState<string>();
  const [selectedMinute, setSelectedMinute] = React.useState<string>();
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);

  // Generate hours (00-23)
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  // Generate minutes (00-59)
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    setSelectedDate(date);

    // Only call onDateChange if we have both date and time
    if (selectedHour !== undefined && selectedMinute !== undefined) {
      const newDateTime = new Date(date);
      newDateTime.setHours(parseInt(selectedHour));
      newDateTime.setMinutes(parseInt(selectedMinute));
      onDateChange?.(newDateTime);
    } else {
      onDateChange?.(undefined);
    }
  };

  const handleHourChange = (hour: string) => {
    setSelectedHour(hour);

    if (selectedDate && selectedMinute !== undefined) {
      const newDateTime = new Date(selectedDate);
      newDateTime.setHours(parseInt(hour));
      newDateTime.setMinutes(parseInt(selectedMinute));
      onDateChange?.(newDateTime);
    }
  };

  const handleMinuteChange = (minute: string) => {
    setSelectedMinute(minute);

    if (selectedDate && selectedHour !== undefined) {
      const newDateTime = new Date(selectedDate);
      newDateTime.setHours(parseInt(selectedHour));
      newDateTime.setMinutes(parseInt(minute));
      onDateChange?.(newDateTime);
    }
  };

  return (
    <div className='grid gap-2 sm:grid-cols-2'>
      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal',
              !selectedDate && 'text-muted-foreground'
            )}
            aria-label='Pick a date'
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {selectedDate ? (
              format(selectedDate, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            selected={selectedDate}
            onSelect={(date) => {
              handleDateSelect(date);
              setIsDatePickerOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className='flex gap-2'>
        <Select
          value={selectedHour}
          onValueChange={handleHourChange}
          disabled={!selectedDate}
        >
          <SelectTrigger aria-label='Select hour'>
            <SelectValue placeholder='Hour' />
          </SelectTrigger>
          <SelectContent position='popper'>
            {hours.map((hour) => (
              <SelectItem key={hour} value={hour}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedMinute}
          onValueChange={handleMinuteChange}
          disabled={!selectedDate}
        >
          <SelectTrigger aria-label='Select minute'>
            <SelectValue placeholder='Minute' />
          </SelectTrigger>
          <SelectContent position='popper'>
            {minutes.map((minute) => (
              <SelectItem key={minute} value={minute}>
                {minute}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
