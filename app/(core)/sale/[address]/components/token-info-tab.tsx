import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { formatNumber, truncateAddress } from '@/lib/utils';
import useSalePool from '@/app/(core)/hooks/use-sale-pool';
import useTokenInfo from '@/hooks/useTokenInfo';
import { formatBigIntEther } from '@/app/(core)/utils';

export function TokenInfoTab({
  saleAddress,
}: {
  saleAddress: string | undefined;
}) {
  const salePool = useSalePool(saleAddress);
  const { tokenName, tokenSymbol, tokenDecimals, tokenTotalSupply } =
    useTokenInfo(salePool.tokenAddress);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Information</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex justify-between'>
          <div className='space-y-5 lg:space-y-6'>
            <div>
              <div className='text-sm text-muted-foreground flex items-center gap-x-1'>
                <span>Address</span>
                <Link
                  href={`https://scan.octa.space/address/${salePool.tokenAddress}`}
                >
                  <ExternalLink size={15} />
                </Link>
              </div>
              <div className='font-medium'>
                {truncateAddress(salePool.tokenAddress)}
              </div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>Name</div>
              <div className='font-medium'>{tokenName}</div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>Decimals</div>
              <div className='font-medium'>{tokenDecimals}</div>
            </div>
          </div>
          <div className='space-y-5 lg:space-y-6'>
            <div>
              <div className='text-sm text-muted-foreground'>Total Supply</div>
              <div className='font-medium'>
                {formatNumber(Number(formatBigIntEther(tokenTotalSupply)), 0)}
              </div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>Symbol</div>
              <div className='font-medium'>{tokenSymbol}</div>
            </div>
            <div>
              <div className='text-sm text-muted-foreground'>Network</div>
              <div className='font-medium'>Octa Space</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
