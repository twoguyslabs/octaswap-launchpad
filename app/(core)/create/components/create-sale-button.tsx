import { useState, useCallback } from 'react';
import {
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LAUNCHPAD_ABI } from '@/contracts/abis';
import { LAUNCHPAD_ADDRESS } from '@/contracts/addresses';
import { delay } from '@/lib/utils';
import { createSale } from '../../db/functions';
import { FormValues } from '../form-schema';
import { isAddress, parseEther } from 'viem';

interface CreateSaleButtonProps {
  formValues: FormValues;
  isApproved: boolean;
  isTokenValid: boolean;
  octaPrice: number;
  saleFees: number;
  address: string;
  onSuccess: () => void;
}

export function CreateSaleButton({
  formValues,
  isApproved,
  isTokenValid,
  octaPrice,
  saleFees,
  address,
  onSuccess,
}: CreateSaleButtonProps) {
  const { toast } = useToast();
  const [isCreatePending, setIsCreatePending] = useState(false);

  const {
    presaleRate,
    softCap,
    hardCap,
    liquidityPercentage,
    liquidityTokens,
    startDate,
    endDate,
    tokenAddress,
  } = formValues;

  const liquidityBasisPoints = liquidityPercentage
    ? parseFloat(liquidityPercentage) * 100
    : 0;

  const startTimestamp = startDate ? Math.floor(startDate.getTime() / 1000) : 0;
  const endTimestamp = endDate ? Math.floor(endDate.getTime() / 1000) : 0;

  const { data: deploySaleConfig } = useSimulateContract({
    abi: LAUNCHPAD_ABI,
    address: LAUNCHPAD_ADDRESS,
    functionName: 'deploySale',
    args: [
      {
        rate: BigInt(presaleRate || '0'),
        softcap: parseEther(softCap || '0'),
        hardcap: parseEther(hardCap || '0'),
        liquidityFunds: BigInt(liquidityBasisPoints),
        liquidityTokens: parseEther(liquidityTokens || '0'),
        startTimestamp: BigInt(startTimestamp),
        endTimestamp: BigInt(endTimestamp),
        tokenAddress: isAddress(tokenAddress)
          ? (tokenAddress as `0x${string}`)
          : '0x0000000000000000000000000000000000000000',
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

  const {
    writeContractAsync: createWriteContractAsync,
    data: createData,
    error: createError,
  } = useWriteContract();

  const { isLoading: createIsLoading } = useWaitForTransactionReceipt({
    hash: createData,
  });

  const onSubmit = useCallback(async () => {
    if (!isAddress(tokenAddress) || !isTokenValid) {
      toast({
        title: 'Error',
        description: 'Invalid or non-existent token address',
        variant: 'destructive',
      });
      return;
    }

    if (parseFloat(liquidityPercentage) <= 60) {
      toast({
        title: 'Error',
        description:
          'Liquidity percentage must be greater than 60% and less or equal to 100%.',
        variant: 'destructive',
      });
      return;
    }

    setIsCreatePending(true);

    try {
      const result = await createWriteContractAsync(deploySaleConfig!.request);

      if (createError) {
        throw createError;
      }

      toast({
        title: 'Sale contract deployment initiated',
        description: 'Please wait for the transaction to be confirmed.',
      });

      await delay(15000); // Wait for 15 seconds

      if (result) {
        const { error } = await createSale({
          sale_address: deploySaleConfig!.result,
          owner: address,
          project_logo: formValues.projectLogo,
          sale_title: formValues.saleTitle,
          sale_description: formValues.description,
          website_url: formValues.website,
          twitter_url: formValues.twitter,
          telegram_url: formValues.telegram,
          discord_url: formValues.discord,
        });

        if (error) {
          console.error('Database error:', error);
          throw new Error(error.message);
        }

        toast({
          title: 'Success',
          description: 'Sale created and data stored successfully!',
        });

        onSuccess();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to create sale or store data',
        variant: 'destructive',
      });
    } finally {
      setIsCreatePending(false);
    }
  }, [
    createWriteContractAsync,
    deploySaleConfig,
    address,
    formValues,
    toast,
    isTokenValid,
    createError,
    onSuccess,
    tokenAddress,
    liquidityPercentage,
  ]);

  return (
    <Button
      className='w-full sm:flex-1'
      type='button'
      onClick={onSubmit}
      disabled={
        createIsLoading || !isApproved || isCreatePending || !isTokenValid
      }
    >
      {createIsLoading
        ? 'Creating...'
        : isCreatePending
        ? 'Waiting for Confirmation...'
        : 'Create Sale'}
    </Button>
  );
}
