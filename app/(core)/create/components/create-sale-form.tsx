'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useState, useMemo, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatEther, isAddress } from 'viem';
import { LAUNCHPAD_ABI } from '@/contracts/abis';
import { LAUNCHPAD_ADDRESS } from '@/contracts/addresses';
import useOctaPrice from '@/hooks/useOctaPrice';
import { TokenInfoSection } from './form-sections/token-info-section';
import { SaleDetailsSection } from './form-sections/sale-details-section';
import { TokenEconomicsSection } from './form-sections/token-economics-section';
import { PricingLiquiditySection } from './form-sections/pricing-liquidity-section';
import { SaleDurationSection } from './form-sections/sale-duration-section';
import { FeesDisplay } from './fees-display';
import { formSchema, FormValues } from '../form-schema';
import { TokenValidation } from './token-validation';
import { TokenApproval } from './token-approval';
import { CreateSaleButton } from './create-sale-button';
import { erc20Abi } from 'viem';

export default function CreateSaleForm() {
  const [isTokenValid, setIsTokenValid] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectLogo: '',
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
      startDate: undefined,
      endDate: undefined,
    },
  });

  const formValues = form.watch();

  const { address } = useAccount();
  const octaPrice = useOctaPrice();

  const { data: platformFees } = useReadContract({
    abi: LAUNCHPAD_ABI,
    address: LAUNCHPAD_ADDRESS,
    functionName: 'platformFeesInUsd',
  });

  const baseFee = formatEther(platformFees ?? BigInt(0));

  const saleFees = useMemo(
    () => (baseFee && octaPrice ? parseFloat(baseFee) / octaPrice : 0),
    [baseFee, octaPrice]
  );

  const { data: tokenTotalSupply, refetch: refetchTokenTotalSupply } =
    useReadContract({
      address: isAddress(formValues.tokenAddress)
        ? (formValues.tokenAddress as `0x${string}`)
        : undefined,
      abi: erc20Abi,
      functionName: 'totalSupply',
      query: {
        enabled: isAddress(formValues.tokenAddress) && isTokenValid,
      },
    });

  const supplyFees = useMemo(
    () => (tokenTotalSupply ? tokenTotalSupply / BigInt(100) : BigInt(0)),
    [tokenTotalSupply]
  );

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: erc20Abi,
    address: isAddress(formValues.tokenAddress)
      ? (formValues.tokenAddress as `0x${string}`)
      : undefined,
    functionName: 'allowance',
    args: [address!, LAUNCHPAD_ADDRESS],
    query: {
      enabled: isAddress(formValues.tokenAddress) && isTokenValid,
      refetchInterval: 5000,
    },
  });

  const isApproved = allowance ? allowance >= supplyFees : false;

  useEffect(() => {
    if (isTokenValid) {
      // Trigger refetch of tokenTotalSupply
      refetchTokenTotalSupply();
    }
  }, [isTokenValid, refetchTokenTotalSupply]);

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className='space-y-8'>
        <TokenValidation
          tokenAddress={formValues.tokenAddress}
          onValidationChange={setIsTokenValid}
        />
        <TokenInfoSection control={form.control} isTokenValid={isTokenValid} />
        <SaleDetailsSection control={form.control} />
        <TokenEconomicsSection control={form.control} />
        <PricingLiquiditySection control={form.control} />
        <SaleDurationSection control={form.control} />
        <FeesDisplay saleFees={saleFees} />
        <div className='flex flex-col sm:flex-row gap-4'>
          <CreateSaleButton
            formValues={formValues}
            isApproved={isApproved}
            isTokenValid={isTokenValid}
            octaPrice={octaPrice}
            saleFees={saleFees}
            address={address!}
            onSuccess={() => form.reset()}
          />
          <TokenApproval
            tokenAddress={formValues.tokenAddress}
            isApproved={isApproved}
            isTokenValid={isTokenValid}
            supplyFees={supplyFees}
            onRefetchAllowance={refetchAllowance}
          />
        </div>
      </form>
    </Form>
  );
}
