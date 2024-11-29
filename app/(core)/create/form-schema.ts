import * as z from 'zod';
import { isAddress } from 'viem';

export const formSchema = z
  .object({
    projectLogo: z.string().url({
      message: 'Please enter a valid logo URL.',
    }),
    tokenAddress: z
      .string()
      .refine((value) => value === '' || isAddress(value), {
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
    vestingTokens: z.boolean().default(false),
    tokensForSale: z.string().min(1, {
      message: 'Tokens for sale is required.',
    }),
    tokensForVesting: z.string().min(1, {
      message: 'Tokens allocated for vesting is required.',
    }),
    vestingPeriod: z.string().min(1, {
      message: 'Vesting period is required.',
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
        return !isNaN(num) && num > 60 && num <= 100;
      },
      {
        message:
          'Liquidity percentage must be greater than 60% and less or equal to 100%.',
      }
    ),
    liquidityTokens: z.string().min(1, {
      message: 'Liquidity in tokens is required.',
    }),
    startDate: z.date({
      required_error: 'Start date and time (UTC) is required.',
    }),
    endDate: z.date({
      required_error: 'End date and time (UTC) is required.',
    }),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    {
      message: 'End date and time must be after start date and time',
      path: ['endDate'],
    }
  );

export type FormValues = z.infer<typeof formSchema>;
