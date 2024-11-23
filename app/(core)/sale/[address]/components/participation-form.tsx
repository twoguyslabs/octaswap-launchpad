import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import { SALE_ABI } from '@/contracts/abis';
import { formatNumber } from '@/lib/utils';
import useSalePool from '@/app/(core)/hooks/use-sale-pool';
import { useOcsPrice } from '@/hooks/use-ocs-price';
import useOctaPrice from '@/hooks/useOctaPrice';
import Contribution from './participation-form/contribution';
import AllocationAndTokens from './participation-form/allocation-and-tokens';

export default function ParticipationForm({
  saleAddress,
}: {
  saleAddress: string | undefined;
}) {
  const [contribution, setContribution] = useState('');
  const [isParticipating, setIsParticipating] = useState(false);

  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  const ocsPrice = useOcsPrice();
  const octaPrice = useOctaPrice();

  const salePool = useSalePool(saleAddress);

  const { data: isClosed } = useReadContract({
    abi: SALE_ABI,
    address: saleAddress as `0x${string}`,
    functionName: 'isClosed',
  });

  const { data: octaRaised } = useReadContract({
    abi: SALE_ABI,
    address: saleAddress as `0x${string}`,
    functionName: 'octaRaised',
  });

  const { data: allocation } = useReadContract({
    account: address as `0x${string}`,
    abi: SALE_ABI,
    address: saleAddress as `0x${string}`,
    functionName: 'allocation',
    args: [address as `0x${string}`],
  });

  const { data: stakerAllocation } = useReadContract({
    account: address as `0x${string}`,
    abi: SALE_ABI,
    address: saleAddress as `0x${string}`,
    functionName: 'stakerAllocation',
    args: [parseEther(ocsPrice.toString()), parseEther(octaPrice.toString())],
  });

  const { data: purchased } = useReadContract({
    abi: SALE_ABI,
    address: saleAddress as `0x${string}`,
    functionName: 'contribution',
    args: [address as `0x${string}`],
  });

  const { data: tokenToClaim } = useReadContract({
    abi: SALE_ABI,
    address: saleAddress as `0x${string}`,
    functionName: 'tokenToClaim',
    args: [address as `0x${string}`],
  });

  const receive = formatNumber(Number(contribution) * Number(salePool.rate));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Participate in Sale</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <AllocationAndTokens
          allocation={allocation}
          stakerAllocation={stakerAllocation}
          purchased={purchased}
          tokenToClaim={tokenToClaim}
        />
        <Contribution
          isClosed={isClosed}
          octaRaised={octaRaised}
          saleAddress={saleAddress}
          contribution={contribution}
          setContribution={setContribution}
          isParticipating={isParticipating}
          setIsParticipating={setIsParticipating}
          allocation={allocation}
          stakerAllocation={stakerAllocation}
          purchased={purchased}
          receive={receive}
          balance={balance}
          ocsPrice={ocsPrice}
          octaPrice={octaPrice}
          salePool={salePool}
        />
        <div className='p-4 bg-yellow-50 rounded-lg'>
          <div className='flex'>
            <AlertCircle className='h-5 w-5 text-yellow-400 mr-2' />
            <div className='text-sm text-yellow-700'>
              <strong>Note:</strong> Ensure you have sufficient OCTA in your
              wallet to cover the contribution amount plus gas fees.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
