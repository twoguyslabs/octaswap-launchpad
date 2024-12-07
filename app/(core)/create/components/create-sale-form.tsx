'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { useState, useMemo, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatEther, isAddress, parseEther } from 'viem';
import { LAUNCHPAD_ABI } from '@/contracts/abis';
import { LAUNCHPAD_ADDRESS, VESTING_ADDRESS } from '@/contracts/addresses';
import useOctaPrice from '@/hooks/useOctaPrice';
import { TokenInfoSection } from './form-sections/token-info-section';
import { SaleDetailsSection } from './form-sections/sale-details-section';
import { TokenEconomicsSection } from './form-sections/token-economics-section';
import { SalePoolParams } from './form-sections/sale-pool-params';
import { SaleDurationSection } from './form-sections/sale-duration-section';
import { formSchema, FormValues } from '../form-schema';
import { TokenValidation } from './token-validation';
import TokenApproval from './token-approval';
import { CreateSaleButton } from './create-sale-button';
import { erc20Abi } from 'viem';
import CreateDialog from './create-dialog';

export default function CreateSaleForm() {
  const [feesString, setFeesString] = useState<'standard' | 'alternative'>(
    'standard'
  );

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
      vestingTokens: false,
      tokensForSale: '',
      tokensForVesting: '',
      vestingPeriod: '',
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

  const { data: fees } = useReadContract({
    abi: LAUNCHPAD_ABI,
    address: LAUNCHPAD_ADDRESS,
    functionName: 'fees',
    args: [feesString],
  });

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

  const { data: vestingAllowance, refetch: refetchVestingAllowance } =
    useReadContract({
      abi: erc20Abi,
      address: formValues.tokenAddress as `0x${string}`,
      functionName: 'allowance',
      args: [address!, VESTING_ADDRESS],
      query: {
        enabled: isAddress(formValues.tokenAddress) && isTokenValid,
        refetchInterval: 5000,
      },
    });

  const { data: launchpadAllowance, refetch: refetchLaunchpadAllowance } =
    useReadContract({
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

  const [platformFee, supplyFee, saleFee] = fees ?? [];

  const baseFee = formatEther(platformFee ?? BigInt(0));

  const saleFees = useMemo(
    () => (baseFee && octaPrice ? parseFloat(baseFee) / octaPrice : 0),
    [baseFee, octaPrice]
  );

  const supplyFees = useMemo(
    () => (tokenTotalSupply ? tokenTotalSupply / BigInt(100) : BigInt(0)),
    [tokenTotalSupply]
  );

  const tokensForSale = formValues.tokensForSale
    ? parseEther(formValues.tokensForSale)
    : BigInt(0);

  const tokensForVesting = formValues.tokensForVesting
    ? parseEther(formValues.tokensForVesting)
    : BigInt(0);

  const liquidityTokens = formValues.liquidityTokens
    ? parseEther(formValues.liquidityTokens)
    : BigInt(0);

  const launchpadTotalTokensToApprove =
    supplyFees + tokensForSale + liquidityTokens;

  const isVestingApproved = vestingAllowance
    ? vestingAllowance >= tokensForVesting
    : false;

  const isLaunchpadApproved = launchpadAllowance
    ? launchpadAllowance >= launchpadTotalTokensToApprove
    : false;

  useEffect(() => {
    if (isTokenValid) {
      // Trigger refetch of tokenTotalSupply
      refetchTokenTotalSupply();
    }
  }, [isTokenValid, refetchTokenTotalSupply]);

  return (
    <>
      <CreateDialog
        feesString={feesString}
        setFeesString={setFeesString}
        platformFee={saleFees}
        supplyFee={supplyFee}
        saleFee={saleFee}
      />
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()} className='space-y-8'>
          <TokenValidation
            tokenAddress={formValues.tokenAddress}
            onValidationChange={setIsTokenValid}
          />
          <TokenInfoSection
            control={form.control}
            isTokenValid={isTokenValid}
          />
          <SaleDetailsSection control={form.control} />
          <TokenEconomicsSection control={form.control} />
          <SalePoolParams control={form.control} />
          <SaleDurationSection control={form.control} />
          <div className='flex flex-col sm:flex-row gap-4'>
            <CreateSaleButton
              formValues={formValues}
              feesString={feesString}
              isLaunchpadApproved={isLaunchpadApproved}
              isTokenValid={isTokenValid}
              octaPrice={octaPrice}
              saleFees={saleFees}
              address={address!}
              onSuccess={() => form.reset()}
            />
            <TokenApproval
              tokenAddress={formValues.tokenAddress}
              isVestingApproved={isVestingApproved}
              isLaunchpadApproved={isLaunchpadApproved}
              isTokenValid={isTokenValid}
              onRefetchVestingAllowance={refetchVestingAllowance}
              onRefetchLaunchpadAllowance={refetchLaunchpadAllowance}
              vestingEnabled={formValues.vestingTokens}
              tokensForSale={tokensForSale}
              tokensForVesting={tokensForVesting}
              supplyFees={supplyFees}
              liquidityTokens={liquidityTokens}
            />
          </div>
        </form>
      </Form>
    </>
  );
}
