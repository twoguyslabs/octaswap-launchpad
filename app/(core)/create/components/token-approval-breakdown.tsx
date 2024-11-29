import { Button } from '@/components/ui/button';
import useTokenInfo from '@/hooks/useTokenInfo';
import { cn, formatNumber } from '@/lib/utils';
import { formatEther } from 'viem';

interface TokenApprovalBreakdownProps {
  tokenAddress: string;
  vestingEnabled: boolean;
  tokensForSale: bigint;
  tokensForVesting?: bigint;
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

export function TokenApprovalBreakdown({
  tokenAddress,
  vestingEnabled,
  tokensForSale,
  tokensForVesting = BigInt(0),
  supplyFees,
  liquidityTokens,
  totalTokensToApprove,
  isVestingApproved,
  isLaunchpadApproved,
  isVestingApprovalPending,
  isLaunchpadApprovalPending,
  approveVesting,
  approveLaunchpad,
  isTokenValid,
}: TokenApprovalBreakdownProps) {
  const { tokenSymbol } = useTokenInfo(tokenAddress);

  const tokensForSaleFormatted = formatNumber(
    Number(formatEther(tokensForSale))
  );

  const tokensForVestingFormatted = formatNumber(
    Number(formatEther(tokensForVesting))
  );

  const liquidityTokensFormatted = formatNumber(
    Number(formatEther(liquidityTokens))
  );

  const supplyFeesFormatted = formatNumber(Number(formatEther(supplyFees)));

  const totalTokensToApproveFormatted = formatNumber(
    Number(formatEther(totalTokensToApprove))
  );

  return (
    <div className='mt-4'>
      <h3 className='font-semibold mb-2'>Token Approval Breakdown</h3>
      <div className='space-y-2'>
        <div className='flex justify-between'>
          <span>Sale:</span>
          <span>
            {tokensForSaleFormatted} {tokenSymbol}
          </span>
        </div>
        {vestingEnabled && (
          <div className='flex justify-between'>
            <span>Vesting:</span>
            <span>
              {tokensForVestingFormatted} {tokenSymbol}
            </span>
          </div>
        )}
        <div className='flex justify-between'>
          <span>Liquidity:</span>
          <span>
            {liquidityTokensFormatted} {tokenSymbol}
          </span>
        </div>
        <div className='flex justify-between'>
          <span>Supply Fee:</span>
          <span>
            {supplyFeesFormatted} {tokenSymbol}
          </span>
        </div>
        <div className='border-t pt-2 flex justify-between font-semibold'>
          <span>Total:</span>
          <span>
            {totalTokensToApproveFormatted} {tokenSymbol}
          </span>
        </div>
      </div>
      <p className='text-yellow-600 dark:text-yellow-400 text-sm mt-4'>
        ⚠️ Please ensure you have sufficient tokens in your wallet before
        approving and proceeding
      </p>
      <div
        className={cn(
          'grid gap-2 mt-4',
          vestingEnabled ? 'sm:grid-cols-2' : 'sm:grid-cols-1'
        )}
      >
        {vestingEnabled && (
          <Button
            onClick={approveVesting}
            disabled={
              isVestingApproved || isVestingApprovalPending || !isTokenValid
            }
          >
            {isVestingApprovalPending ? 'Approving...' : 'Approve Vesting'}
          </Button>
        )}
        <Button
          onClick={approveLaunchpad}
          disabled={
            isLaunchpadApproved || isLaunchpadApprovalPending || !isTokenValid
          }
        >
          {isLaunchpadApprovalPending ? 'Approving...' : 'Approve Launchpad'}
        </Button>
      </div>
    </div>
  );
}
