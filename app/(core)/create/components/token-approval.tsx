import { useState, useCallback } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { erc20Abi, isAddress, ReadContractErrorType } from 'viem';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LAUNCHPAD_ADDRESS } from '@/contracts/addresses';
import { delay } from '@/lib/utils';
import { QueryObserverResult } from '@tanstack/react-query';

interface TokenApprovalProps {
  tokenAddress: string;
  isApproved: boolean;
  isTokenValid: boolean;
  supplyFees: bigint;
  onRefetchAllowance: () => Promise<
    QueryObserverResult<bigint, ReadContractErrorType>
  >;
}

export function TokenApproval({
  tokenAddress,
  isApproved,
  isTokenValid,
  supplyFees,
  onRefetchAllowance,
}: TokenApprovalProps) {
  const { toast } = useToast();
  const [isApprovalPending, setIsApprovalPending] = useState(false);

  const {
    writeContractAsync: approveWriteContractAsync,
    data: approveData,
    error: approveError,
  } = useWriteContract();

  const { isLoading: approveIsLoading } = useWaitForTransactionReceipt({
    hash: approveData,
  });

  const approve = useCallback(async () => {
    if (!isAddress(tokenAddress) || !isTokenValid) {
      toast({
        title: 'Error',
        description: 'Invalid or non-existent token address',
        variant: 'destructive',
      });
      return;
    }

    setIsApprovalPending(true);

    try {
      await approveWriteContractAsync({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: 'approve',
        args: [LAUNCHPAD_ADDRESS, supplyFees],
      });

      if (approveError) {
        throw approveError;
      }

      toast({
        title: 'Approval Initiated',
        description: 'Please wait for the transaction to be confirmed.',
      });

      await delay(15000); // Wait for 15 seconds

      await onRefetchAllowance();

      toast({
        title: 'Success',
        description: 'Token approval successful',
      });
    } catch (error) {
      console.error('Approval error:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Token approval failed. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsApprovalPending(false);
    }
  }, [
    tokenAddress,
    isTokenValid,
    approveWriteContractAsync,
    supplyFees,
    toast,
    onRefetchAllowance,
    approveError,
  ]);

  return (
    <Button
      className='w-full sm:flex-1'
      variant='outline'
      onClick={approve}
      disabled={
        approveIsLoading || isApproved || isApprovalPending || !isTokenValid
      }
    >
      {approveIsLoading
        ? 'Approving...'
        : isApprovalPending
        ? 'Waiting for Confirmation...'
        : 'Approve'}
    </Button>
  );
}
