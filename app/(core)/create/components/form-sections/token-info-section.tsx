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
import { CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function TokenInfoSection({
  control,
  isTokenValid,
}: {
  control: Control<FormValues>;
  isTokenValid: boolean;
}) {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Token Information</h3>
      <Separator />
      <FormField
        control={control}
        name='tokenAddress'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Token Address</FormLabel>
            <div className='relative'>
              <FormControl>
                <Input
                  placeholder='0x...'
                  {...field}
                  className='pr-10' // Add padding to prevent text from going under the icon
                />
              </FormControl>
              {field.value && (
                <div className='absolute inset-y-0 right-3 flex items-center pointer-events-none'>
                  {isTokenValid ? (
                    <CheckCircle className='h-5 w-5 text-green-500' />
                  ) : (
                    <XCircle className='h-5 w-5 text-red-500' />
                  )}
                </div>
              )}
            </div>
            {field.value && (
              <Alert
                variant={isTokenValid ? 'default' : 'destructive'}
                className='mt-2'
              >
                <AlertDescription>
                  {isTokenValid
                    ? '✓ Token contract verified and ready for sale creation'
                    : '⚠️ Invalid or non-existent token contract. Please check the address'}
                </AlertDescription>
              </Alert>
            )}
            <FormDescription>
              The contract address of your new token on the blockchain.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
