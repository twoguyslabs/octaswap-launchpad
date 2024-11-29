import { useState, useCallback } from 'react';
import { useWriteContract } from 'wagmi';
import { erc20Abi, ReadContractErrorType } from 'viem';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LAUNCHPAD_ADDRESS, VESTING_ADDRESS } from '@/contracts/addresses';
import { delay } from '@/lib/utils';
import { QueryObserverResult } from '@tanstack/react-query';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { TokenApprovalBreakdown } from './token-approval-breakdown';

interface TokenApprovalProps {
  tokenAddress: string;
  isVestingApproved: boolean;
  isLaunchpadApproved: boolean;
  isTokenValid: boolean;
  onRefetchVestingAllowance: () => Promise<
    QueryObserverResult<bigint, ReadContractErrorType>
  >;
  onRefetchLaunchpadAllowance: () => Promise<
    QueryObserverResult<bigint, ReadContractErrorType>
  >;
  vestingEnabled: boolean;
  tokensForSale: bigint;
  tokensForVesting: bigint;
  supplyFees: bigint;
  liquidityTokens: bigint;
}

interface TokenApprovalDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  tokenAddress: string;
  vestingEnabled: boolean;
  tokensForSale: bigint;
  tokensForVesting: bigint;
  supplyFees: bigint;
  liquidityTokens: bigint;
  totalTokensToApprove: bigint;
  isVestingApprovalPending: boolean;
  isLaunchpadApprovalPending: boolean;
  isVestingApproved: boolean;
  isLaunchpadApproved: boolean;
  isTokenValid: boolean;
  approveVesting: () => Promise<void>;
  approveLaunchpad: () => Promise<void>;
}

function TokenApprovalDialog({
  isDialogOpen,
  setIsDialogOpen,
  tokenAddress,
  vestingEnabled,
  tokensForSale,
  tokensForVesting,
  supplyFees,
  liquidityTokens,
  totalTokensToApprove,
  isVestingApproved,
  isLaunchpadApproved,
  isVestingApprovalPending,
  isLaunchpadApprovalPending,
  isTokenValid,
  approveVesting,
  approveLaunchpad,
}: TokenApprovalDialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className='w-full sm:flex-1' variant='outline'>
          Approve
        </Button>
      </DialogTrigger>
      <DialogContent className='h-full flex flex-col justify-center sm:h-fit'>
        <DialogHeader>
          <DialogTitle>Approve Token</DialogTitle>
          <DialogDescription>
            Please confirm the approval of all tokens required for the sale.
          </DialogDescription>
        </DialogHeader>
        <div>
          <TokenApprovalBreakdown
            tokenAddress={tokenAddress}
            vestingEnabled={vestingEnabled}
            tokensForSale={tokensForSale}
            tokensForVesting={tokensForVesting}
            supplyFees={supplyFees}
            liquidityTokens={liquidityTokens}
            totalTokensToApprove={totalTokensToApprove}
            isVestingApproved={isVestingApproved}
            isLaunchpadApproved={isLaunchpadApproved}
            isVestingApprovalPending={isVestingApprovalPending}
            isLaunchpadApprovalPending={isLaunchpadApprovalPending}
            isTokenValid={isTokenValid}
            approveVesting={approveVesting}
            approveLaunchpad={approveLaunchpad}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function TokenApproval({
  tokenAddress,
  isVestingApproved,
  isLaunchpadApproved,
  onRefetchVestingAllowance,
  onRefetchLaunchpadAllowance,
  vestingEnabled,
  tokensForSale,
  tokensForVesting,
  supplyFees,
  liquidityTokens,
  isTokenValid,
}: TokenApprovalProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isVestingApprovalPending, setIsVestingApprovalPending] =
    useState(false);
  const [isLaunchpadApprovalPending, setIsLaunchpadApprovalPending] =
    useState(false);

  const { toast } = useToast();

  const launchpadTotalTokensToApprove =
    tokensForSale + supplyFees + liquidityTokens;

  const totalTokensToApprove =
    tokensForSale +
    (vestingEnabled ? tokensForVesting : BigInt(0)) +
    supplyFees +
    liquidityTokens;

  const { writeContractAsync: approveWriteContractAsync } = useWriteContract();

  const approveVesting = useCallback(async () => {
    setIsVestingApprovalPending(true);

    try {
      await approveWriteContractAsync({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: 'approve',
        args: [VESTING_ADDRESS, tokensForVesting],
      });

      toast({
        title: 'Approval Initiated',
        description: 'Please wait for the transaction to be confirmed.',
      });

      await delay(15000); // Wait for 15 seconds
      await onRefetchVestingAllowance();

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
      setIsVestingApprovalPending(false);
    }
  }, [
    tokenAddress,
    approveWriteContractAsync,
    tokensForVesting,
    toast,
    onRefetchVestingAllowance,
  ]);

  const approveLaunchpad = useCallback(async () => {
    setIsLaunchpadApprovalPending(true);

    try {
      await approveWriteContractAsync({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: 'approve',
        args: [LAUNCHPAD_ADDRESS, launchpadTotalTokensToApprove],
      });

      toast({
        title: 'Approval Initiated',
        description: 'Please wait for the transaction to be confirmed.',
      });

      await delay(15000); // Wait for 15 seconds
      await onRefetchLaunchpadAllowance();

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
      setIsLaunchpadApprovalPending(false);
    }
  }, [
    tokenAddress,
    approveWriteContractAsync,
    launchpadTotalTokensToApprove,
    toast,
    onRefetchLaunchpadAllowance,
  ]);

  return (
    <>
      <TokenApprovalDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        tokenAddress={tokenAddress}
        vestingEnabled={vestingEnabled}
        tokensForSale={tokensForSale}
        tokensForVesting={tokensForVesting}
        supplyFees={supplyFees}
        liquidityTokens={liquidityTokens}
        totalTokensToApprove={totalTokensToApprove}
        isVestingApproved={isVestingApproved}
        isLaunchpadApproved={isLaunchpadApproved}
        isVestingApprovalPending={isVestingApprovalPending}
        isLaunchpadApprovalPending={isLaunchpadApprovalPending}
        isTokenValid={isTokenValid}
        approveVesting={approveVesting}
        approveLaunchpad={approveLaunchpad}
      />
    </>
  );
}
