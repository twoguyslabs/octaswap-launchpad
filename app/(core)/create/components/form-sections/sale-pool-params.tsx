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

export function SalePoolParams({ control }: { control: Control<FormValues> }) {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Sale Pool Params</h3>
      <Separator />
      <div className='grid gap-4 sm:grid-cols-2'>
        <FormField
          control={control}
          name='presaleRate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Presale Rate</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  onKeyDown={(e) => {
                    if (e.key === '.' || e.key === '-' || e.key === 'e') {
                      e.preventDefault();
                    }
                  }}
                  placeholder='1 OCTA = 10000 TOKEN'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name='liquidityPercentage'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Liquidity Percentage</FormLabel>
            <FormControl>
              <Input
                type='number'
                onKeyDown={(e) => {
                  if (e.key === '.' || e.key === '-' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
                placeholder='70'
                {...field}
              />
            </FormControl>
            <FormDescription>
              Percentage of raised funds that will be added as liquidity.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='liquidityTokens'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Liquidity in Tokens</FormLabel>
            <FormControl>
              <Input
                type='number'
                onKeyDown={(e) => {
                  if (e.key === '.' || e.key === '-' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
                placeholder='1000000 TOKEN'
                {...field}
              />
            </FormControl>
            <FormDescription>
              The number of tokens allocated to be added to the liquidity pool.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
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
                placeholder='10000 OCTA'
                {...field}
              />
            </FormControl>
            <FormDescription>
              Minimum amount of OCTA tokens needed to be raised for the sale to
              be considered successful.
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
                placeholder='20000 OCTA'
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
  );
}
