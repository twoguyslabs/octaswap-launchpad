import {
  formatBigIntEther,
  calculateAllocationRemaining,
} from '@/app/(core)/utils';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatNumber } from '@/lib/utils';

export default function AllocationAndTokens({
  allocation,
  stakerAllocation,
  purchased,
  tokenToClaim,
}: {
  allocation: bigint | undefined;
  stakerAllocation: bigint | undefined;
  purchased: bigint | undefined;
  tokenToClaim: bigint | undefined;
}) {
  const formattedAllocation = formatNumber(
    Number(
      allocation
        ? formatBigIntEther(allocation)
        : formatBigIntEther(stakerAllocation)
    )
  );

  const formattedPurchased = formatBigIntEther(purchased);

  const allocationRemaining = calculateAllocationRemaining(
    formattedAllocation,
    formattedPurchased
  );

  const formattedTokenToClaim = formatNumber(
    Number(formatBigIntEther(tokenToClaim))
  );

  return (
    <Card className='bg-secondary'>
      <CardHeader>
        <CardTitle>Your Allocation & Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div>Total Allocation:</div>
          <div className='font-medium text-right'>
            {formattedAllocation} OCTA
          </div>
          <div>Purchased:</div>
          <div className='font-medium text-right'>
            {formattedPurchased} OCTA
          </div>
          <div>Remaining:</div>
          <div className='font-medium text-right'>
            {allocationRemaining} OCTA
          </div>
        </div>
        <Separator className='my-3' />
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div>Your Tokens:</div>
          <div className='font-medium text-right'>
            {formattedTokenToClaim} APE
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
