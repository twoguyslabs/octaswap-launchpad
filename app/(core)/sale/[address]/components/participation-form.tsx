import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import { LAUNCHPAD_ABI, SALE_ABI, STAKING_ABI } from '@/contracts/abis';
import { formatNumber } from '@/lib/utils';
import useSalePool from '@/app/(core)/hooks/use-sale-pool';
import { useOcsPrice } from '@/hooks/use-ocs-price';
import useOctaPrice from '@/hooks/useOctaPrice';
import Contribution from './participation-form/contribution';
import AllocationAndTokens from './participation-form/allocation-and-tokens';
import NoStake from './participation-form/no-stake';
import useTokenInfo from '@/hooks/useTokenInfo';
import { LAUNCHPAD_ADDRESS } from '@/contracts/addresses';

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

  const { data: stakingAddress } = useReadContract({
    account: address as `0x${string}`,
    abi: LAUNCHPAD_ABI,
    address: LAUNCHPAD_ADDRESS,
    functionName: 'staking',
  });

  const { data: stakeOf } = useReadContract({
    account: address as `0x${string}`,
    abi: STAKING_ABI,
    address: stakingAddress as `0x${string}`,
    functionName: 'stakeOf',
    args: [address as `0x${string}`],
  });

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

  const { tokenSymbol } = useTokenInfo(salePool?.tokenAddress);

  const amountStaked = stakeOf ? stakeOf[1] : BigInt(0);
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
          tokenSymbol={tokenSymbol}
        />
        <NoStake amountStaked={amountStaked} />
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
      </CardContent>
    </Card>
  );
}
