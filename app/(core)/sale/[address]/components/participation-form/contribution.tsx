import { Dispatch, SetStateAction } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { parseEther } from 'viem';
import { SALE_ABI } from '@/contracts/abis';
import { useWriteContract } from 'wagmi';
import { allowNumbersAndDot, delay } from '@/lib/utils';
import useTokenInfo from '@/hooks/useTokenInfo';
import { toast } from '@/hooks/use-toast';

interface Balance {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
}

interface ContributionProps {
  isClosed: boolean | undefined;
  octaRaised: bigint | undefined;
  saleAddress: string | undefined;
  contribution: string;
  setContribution: Dispatch<SetStateAction<string>>;
  isParticipating: boolean;
  setIsParticipating: Dispatch<SetStateAction<boolean>>;
  allocation: bigint | undefined;
  stakerAllocation: bigint | undefined;
  purchased: bigint | undefined;
  receive: string;
  balance: Balance | undefined;
  ocsPrice: number;
  octaPrice: number;
  salePool: SalePool;
}

export default function Contribution({
  isClosed,
  octaRaised,
  saleAddress,
  contribution,
  setContribution,
  isParticipating,
  setIsParticipating,
  allocation,
  stakerAllocation,
  purchased,
  receive,
  balance,
  ocsPrice,
  octaPrice,
  salePool,
}: ContributionProps) {
  const { tokenSymbol } = useTokenInfo(salePool.tokenAddress);

  const isSaleSuccess = octaRaised ? octaRaised >= salePool.softcap : false;
  const isRefundable = purchased ? purchased > BigInt(0) : false;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = allowNumbersAndDot(e.target.value);
    setContribution(value);
  };

  const { writeContractAsync: participate } = useWriteContract();
  const { writeContractAsync: claim } = useWriteContract();
  const { writeContractAsync: refund } = useWriteContract();

  const handleParticipate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const contributionValue = parseEther(contribution);

    if (!balance?.value || contributionValue > balance.value) {
      toast({
        title: 'Insufficient Balance',
        description:
          'You do not have enough OCTA in your wallet to participate.',
        variant: 'destructive',
      });
      return;
    }

    if (
      (allocation && contributionValue > allocation) ||
      (stakerAllocation && contributionValue > stakerAllocation)
    ) {
      toast({
        title: 'Exceeds Allocation',
        description:
          'The contribution amount exceeds your available allocation.',
        variant: 'destructive',
      });
      return;
    }

    setIsParticipating(true);

    toast({
      title: 'Participating in sale',
      description: 'Please wait while we process your participation...',
    });

    try {
      await participate({
        abi: SALE_ABI,
        address: saleAddress as `0x${string}`,
        functionName: 'buy',
        args: [
          parseEther(ocsPrice.toString()),
          parseEther(octaPrice.toString()),
        ],
        value: parseEther(contribution),
      });

      await delay(15000);

      toast({
        title: 'Success',
        description: 'You have successfully participated in the sale!',
      });

      setContribution('');
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to participate',
        variant: 'destructive',
      });
    } finally {
      setIsParticipating(false);
    }
  };

  const handleClaim = async () => {
    setIsParticipating(true);

    try {
      await claim({
        abi: SALE_ABI,
        address: saleAddress as `0x${string}`,
        functionName: 'claim',
      });

      await delay(15000);

      toast({
        title: 'Success',
        description: 'You have successfully claimed your tokens!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to claim',
        variant: 'destructive',
      });
    } finally {
      setIsParticipating(false);
    }
  };

  const handleRefund = async () => {
    setIsParticipating(true);

    try {
      await refund({
        abi: SALE_ABI,
        address: saleAddress as `0x${string}`,
        functionName: 'refund',
      });

      await delay(15000);

      toast({
        title: 'Success',
        description: 'You have successfully refunded your contribution!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to refund',
        variant: 'destructive',
      });
    } finally {
      setIsParticipating(false);
    }
  };

  return (
    <form className='space-y-4' onSubmit={handleParticipate}>
      <div>
        <Label htmlFor='contribution'>Contribution Amount</Label>
        <div className='relative mt-1'>
          <Input
            type='text'
            id='contribution'
            placeholder='0.0'
            value={contribution}
            onChange={handleInputChange}
          />
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            OCTA
          </div>
        </div>
      </div>
      <div>
        <Label>You will receive</Label>
        <div className='text-2xl font-bold mt-1'>
          {receive} {tokenSymbol}
        </div>
      </div>
      <div className='space-y-3'>
        <Button
          type='submit'
          className='w-full'
          disabled={isParticipating || !contribution || isClosed}
        >
          Participate in Sale
        </Button>
        <Button
          type='button'
          variant='outline'
          className='w-full'
          disabled={!isClosed || isParticipating || !isRefundable}
          onClick={isSaleSuccess ? handleClaim : handleRefund}
        >
          {isSaleSuccess ? 'Claim Tokens' : 'Claim Refund'}
        </Button>
      </div>
    </form>
  );
}
