import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export default function NoStake({ amountStaked }: { amountStaked: bigint }) {
  return (
    !amountStaked && (
      <Alert className='border-yellow-500 text-yellow-700'>
        <AlertTitle className='font-bold'>No stake found</AlertTitle>
        <AlertDescription>
          You must stake OCS to participate in the sale.{' '}
          <Link href='https://app.octaswap.io/staking' className='underline'>
            Click here to stake OCS
          </Link>
        </AlertDescription>
      </Alert>
    )
  );
}
