'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CalendarIcon, Rocket } from 'lucide-react';
import { format } from 'date-fns';
import { useReadContract } from 'wagmi';
import { erc20Abi } from 'viem';
import { useEffect } from 'react';

const formSchema = z.object({
  tokenAddress: z.string().min(42, {
    message: 'Please enter a valid token address.',
  }),
  saleTitle: z.string().min(5, {
    message: 'Sale title must be at least 5 characters.',
  }),
  description: z.string().min(50, {
    message: 'Description must be at least 50 characters.',
  }),
  website: z.string().url({
    message: 'Please enter a valid URL.',
  }),
  twitter: z.string().url({
    message: 'Please enter a valid Twitter URL.',
  }),
  telegram: z.string().url({
    message: 'Please enter a valid Telegram URL.',
  }),
  discord: z.string().url({
    message: 'Please enter a valid Discord URL.',
  }),
  softCap: z.string().min(1, {
    message: 'Soft cap is required.',
  }),
  hardCap: z.string().min(1, {
    message: 'Hard cap is required.',
  }),
  presaleRate: z.string().min(1, {
    message: 'Presale rate is required.',
  }),
  liquidityPercentage: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 60;
    },
    {
      message: 'Liquidity percentage must be greater than 60%.',
    }
  ),
  liquidityTokens: z.string().min(1, {
    message: 'Liquidity in tokens is required.',
  }),
  startDate: z.date({
    required_error: 'Start date is required.',
  }),
  endDate: z.date({
    required_error: 'End date is required.',
  }),
});

const FeesDisplay = () => (
  <div className='bg-muted p-4 rounded-lg mb-4'>
    <h4 className='font-semibold mb-2'>Fees for creating the sale:</h4>
    <ul className='list-disc list-inside'>
      <li>$1,000 base fee</li>
      <li>4% of the raised funds</li>
      <li>1% of the total token supply</li>
    </ul>
  </div>
);

export default function CreateSale() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenAddress: '',
      saleTitle: '',
      description: '',
      website: '',
      twitter: '',
      telegram: '',
      discord: '',
      softCap: '',
      hardCap: '',
      presaleRate: '',
      liquidityPercentage: '',
      liquidityTokens: '',
    },
  });

  const { data: token } = useReadContract({
    address: form.watch('tokenAddress') as `0x${string}`,
    abi: erc20Abi,
    functionName: 'name',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const liquidityPercentage = parseFloat(values.liquidityPercentage);
    if (liquidityPercentage <= 60) {
      alert('Liquidity percentage must be greater than 60%.');
      return;
    }
    console.log(values);
    // Here you would typically send the form data to your backend
    alert('Sale created successfully!');
  }

  useEffect(() => {
    if (form.watch('tokenAddress') && !token) {
      form.setError('tokenAddress', {
        message: 'Token address not found.',
      });
    } else if (token) {
      form.clearErrors('tokenAddress');
    }
  }, [form, token]);

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <Card className='border-t-4 border-t-primary'>
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <Rocket className='h-6 w-6 text-primary' />
            <CardTitle className='text-3xl font-bold'>
              Create Your Token Sale
            </CardTitle>
          </div>
          <CardDescription>
            Fill in the details below to set up your token sale on OctaSwap
            Launchpad.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Token Information</h3>
                <Separator />
                <FormField
                  control={form.control}
                  name='tokenAddress'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Address</FormLabel>
                      <FormControl>
                        <Input placeholder='0x...' {...field} />
                      </FormControl>
                      <FormDescription>
                        The contract address of your token on the blockchain.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Sale Details</h3>
                <Separator />
                <FormField
                  control={form.control}
                  name='saleTitle'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='OctaSwap Token Presale'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='website'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder='https://octaswap.io' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='twitter'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='https://twitter.com/yourproject'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='telegram'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telegram</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='https://t.me/yourproject'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='discord'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discord</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='https://discord.gg/yourproject'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Token Economics</h3>
                <Separator />
                <div className='grid gap-4 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='softCap'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soft Cap</FormLabel>
                        <FormControl>
                          <Input placeholder='1000' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='hardCap'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hard Cap</FormLabel>
                        <FormControl>
                          <Input placeholder='2000' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Pricing and Liquidity</h3>
                <Separator />
                <div className='grid gap-4 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='presaleRate'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Presale Rate</FormLabel>
                        <FormControl>
                          <Input
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
                  control={form.control}
                  name='liquidityPercentage'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Liquidity Percentage</FormLabel>
                      <FormControl>
                        <Input placeholder='70' {...field} />
                      </FormControl>
                      <FormDescription>
                        Percentage of raised funds that will be added as
                        liquidity. Must be greater than 60%.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='liquidityTokens'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Liquidity in Tokens</FormLabel>
                      <FormControl>
                        <Input placeholder='1000000' {...field} />
                      </FormControl>
                      <FormDescription>
                        The number of tokens to be added to the liquidity pool.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Sale Duration</h3>
                <Separator />
                <div className='grid gap-4 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='startDate'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='endDate'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FeesDisplay />
              <Button type='submit' className='w-full'>
                Create Sale
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
