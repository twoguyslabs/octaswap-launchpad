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
import { Textarea } from '@/components/ui/textarea';
import { Control } from 'react-hook-form';
import { FormValues } from '../../form-schema';

export function SaleDetailsSection({
  control,
}: {
  control: Control<FormValues>;
}) {
  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Sale Details</h3>
      <Separator />
      <FormField
        control={control}
        name='projectLogo'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Logo</FormLabel>
            <FormControl>
              <Input placeholder='https://domain.com/logo.png' {...field} />
            </FormControl>
            <FormDescription>
              URL of your project&apos;s logo image. URL must be a valid image
              with extension like .png, .jpg, .jpeg, etc.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='saleTitle'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sale Title</FormLabel>
            <FormControl>
              <Input placeholder='Your sale title' {...field} />
            </FormControl>
            <FormDescription>
              The title of your token sale that will appear as the main heading.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder='Describe your project and token sale...'
                className='resize-none'
                {...field}
              />
            </FormControl>
            <FormDescription>
              A detailed description of your project and token sale.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='website'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website</FormLabel>
            <FormControl>
              <Input placeholder='https://website.io' {...field} />
            </FormControl>
            <FormDescription>
              Your project&apos;s official website URL. Must include https://.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='twitter'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Twitter</FormLabel>
            <FormControl>
              <Input placeholder='https://x.com/yourproject' {...field} />
            </FormControl>
            <FormDescription>
              Link to your project&apos;s Twitter/X profile. Must be a valid
              Twitter URL.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='telegram'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telegram</FormLabel>
            <FormControl>
              <Input placeholder='https://t.me/yourproject' {...field} />
            </FormControl>
            <FormDescription>
              Link to your project&apos;s Telegram group or channel. Must be a
              valid Telegram URL.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='discord'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discord</FormLabel>
            <FormControl>
              <Input placeholder='https://discord.gg/yourproject' {...field} />
            </FormControl>
            <FormDescription>
              Link to your project&apos;s Discord server. Must be a valid
              Discord invite URL.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
