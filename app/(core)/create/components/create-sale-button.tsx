import { useState, useCallback } from 'react';
import { useReadContract, useSimulateContract, useWriteContract } from 'wagmi';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LAUNCHPAD_ABI, VESTING_ABI } from '@/contracts/abis';
import { LAUNCHPAD_ADDRESS, VESTING_ADDRESS } from '@/contracts/addresses';
import { delay } from '@/lib/utils';
import { createSale, deleteSale } from '../../db/functions';
import { FormValues } from '../form-schema';
import { erc20Abi, formatEther, isAddress, parseEther } from 'viem';

interface CreateSaleButtonProps {
  formValues: FormValues;
  feesString: 'standard' | 'alternative';
  isLaunchpadApproved: boolean;
  isTokenValid: boolean;
  octaPrice: number;
  saleFees: number;
  address: string;
  onSuccess: () => void;
}

export function CreateSaleButton({
  formValues,
  feesString,
  isLaunchpadApproved,
  isTokenValid,
  octaPrice,
  saleFees,
  address,
  onSuccess,
}: CreateSaleButtonProps) {
  const [isSubmitPending, setIsSubmitPending] = useState(false);

  const { toast } = useToast();

  const {
    tokensForSale: tokensForSaleString,
    presaleRate,
    softCap,
    hardCap,
    liquidityPercentage,
    liquidityTokens: lpTokens,
    startDate,
    endDate,
    tokenAddress,
    vestingTokens,
    tokensForVesting: tokensForVestingString,
    vestingPeriod: vestingPeriodString,
  } = formValues;

  const liquidityBasisPoints = liquidityPercentage
    ? parseFloat(liquidityPercentage) * 100
    : 0;

  const rate = BigInt(presaleRate);
  const softcap = parseEther(softCap);
  const hardcap = parseEther(hardCap);
  const liquidityFunds = BigInt(liquidityBasisPoints);
  const liquidityTokens = parseEther(lpTokens);

  const startTimestamp = BigInt(
    startDate ? Math.floor(startDate.getTime() / 1000) : 0
  );

  const endTimestamp = BigInt(
    endDate ? Math.floor(endDate.getTime() / 1000) : 0
  );

  const tokensForSale = parseEther(tokensForSaleString);

  const tokensForVesting = parseEther(tokensForVestingString);
  const vestingStart = BigInt(Math.floor(Date.now() / 1000));
  const vestingPeriod = BigInt(vestingPeriodString);

  const { data: tokenTotalSupply } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress as `0x${string}`,
    functionName: 'totalSupply',
  });

  const totalSupply = tokenTotalSupply ? tokenTotalSupply : BigInt(0);

  const vestingPercent =
    (Number(tokensForVestingString) / Number(formatEther(totalSupply))) * 100;

  const { data: deploySaleConfig } = useSimulateContract({
    abi: LAUNCHPAD_ABI,
    address: LAUNCHPAD_ADDRESS,
    functionName: 'deploySale',
    args: [
      feesString,
      {
        rate,
        softcap,
        hardcap,
        liquidityFunds,
        liquidityTokens,
        startTimestamp,
        endTimestamp,
        tokenAddress: tokenAddress as `0x${string}`,
        tokensForSale,
      },
      parseEther(octaPrice.toString()),
    ],
    value: parseEther(saleFees.toString()),
    query: {
      enabled:
        isAddress(tokenAddress) &&
        isTokenValid &&
        startTimestamp > 0 &&
        endTimestamp > 0,
    },
  });

  const { writeContractAsync: vestingWriteContractAsync } = useWriteContract();
  const { writeContractAsync: createWriteContractAsync } = useWriteContract();

  const onSubmit = useCallback(async () => {
    setIsSubmitPending(true);

    try {
      await createSale({
        sale_address: deploySaleConfig!.result,
        owner: address,
        project_logo: formValues.projectLogo,
        sale_title: formValues.saleTitle,
        sale_description: formValues.description,
        website_url: formValues.website,
        twitter_url: formValues.twitter,
        telegram_url: formValues.telegram,
        discord_url: formValues.discord,
        is_vesting: vestingTokens,
        vesting_percent: vestingPercent,
      });

      if (vestingTokens) {
        await vestingWriteContractAsync({
          abi: VESTING_ABI,
          address: VESTING_ADDRESS,
          functionName: 'deployVesting',
          args: [
            tokenAddress as `0x${string}`,
            tokensForVesting,
            address as `0x${string}`,
            vestingStart,
            vestingPeriod,
          ],
        });

        toast({
          title: 'Vesting contract deployment initiated',
          description: 'Please wait for the transaction to be confirmed.',
        });

        await delay(15000);

        toast({
          title: 'Vesting contract deployed',
          description: 'Sale contract deployment will begin shortly.',
        });
      }

      await createWriteContractAsync(deploySaleConfig!.request);

      toast({
        title: 'Sale contract deployment initiated',
        description: 'Please wait for the transaction to be confirmed.',
      });

      await delay(15000); // Wait for 15 seconds

      toast({
        title: 'Success',
        description: 'Sale created and data stored successfully!',
      });

      onSuccess();
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to create sale or store data',
        variant: 'destructive',
      });

      await deleteSale(deploySaleConfig!.result);
    } finally {
      setIsSubmitPending(false);
    }
  }, [
    vestingWriteContractAsync,
    tokenAddress,
    vestingTokens,
    vestingPercent,
    tokensForVesting,
    vestingStart,
    vestingPeriod,
    createWriteContractAsync,
    deploySaleConfig,
    address,
    formValues,
    toast,
    onSuccess,
  ]);

  return (
    <Button
      className='w-full sm:flex-1'
      type='button'
      onClick={onSubmit}
      disabled={!isLaunchpadApproved || isSubmitPending || !isTokenValid}
    >
      {isSubmitPending ? 'Creating...' : 'Create Sale'}
    </Button>
  );
}
