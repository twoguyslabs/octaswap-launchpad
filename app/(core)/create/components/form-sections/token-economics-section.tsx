import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Control } from 'react-hook-form';
import { FormValues } from '../../form-schema';

export function TokenEconomicsSection({
  control,
}: {
  control: Control<FormValues>;
}) {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Token Economics</h3>
      <Separator />
      <div className='grid gap-4 sm:grid-cols-2'>
        <FormField
          control={control}
          name='softCap'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Soft Cap</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  onKeyDown={(e) => {
                    if (e.key === '.' || e.key === '-' || e.key === 'e') {
                      e.preventDefault();
                    }
                  }}
                  placeholder='1000'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Minimum amount of OCTA tokens needed to be raised for the sale
                to be considered successful.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='hardCap'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hard Cap</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  onKeyDown={(e) => {
                    if (e.key === '.' || e.key === '-' || e.key === 'e') {
                      e.preventDefault();
                    }
                  }}
                  placeholder='2000'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Maximum amount of OCTA tokens that can be raised in the sale.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
