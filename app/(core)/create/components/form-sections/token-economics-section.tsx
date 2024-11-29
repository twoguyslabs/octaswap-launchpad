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
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectValue,
  SelectItem,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select';

export function TokenEconomicsSection({
  control,
}: {
  control: Control<FormValues>;
}) {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Token Economics</h3>
      <Separator />
      <div className='grid gap-4'>
        <FormField
          control={control}
          name='vestingTokens'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-x-3'>
                <FormLabel>Vesting Tokens</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormDescription>
                If enabled, tokens will be vested over a period of time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='tokensForSale'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tokens for Sale</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  onKeyDown={(e) => {
                    if (e.key === '.' || e.key === '-' || e.key === 'e') {
                      e.preventDefault();
                    }
                  }}
                  placeholder='1000 TOKEN'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The number of tokens allocated for sale.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {control._formValues.vestingTokens && (
          <>
            <FormField
              control={control}
              name='tokensForVesting'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tokens for Vesting</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      onKeyDown={(e) => {
                        if (e.key === '.' || e.key === '-' || e.key === 'e') {
                          e.preventDefault();
                        }
                      }}
                      placeholder='1000 TOKEN'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The number of total tokens allocated for team, development,
                    etc to be vested over a period of time.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='vestingPeriod'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vesting Period</FormLabel>

                  <FormDescription>
                    Choose the vesting period for the tokens.
                  </FormDescription>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select a vesting period' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='2592000'>1 Month</SelectItem>
                        <SelectItem value='7776000'>3 Months</SelectItem>
                        <SelectItem value='15552000'>6 Months</SelectItem>
                        <SelectItem value='31536000'>1 Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
}
