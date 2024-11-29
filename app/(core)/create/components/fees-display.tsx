export function FeesDisplay({ saleFees }: { saleFees: number }) {
  return (
    <div className='flex flex-col sm:flex-row gap-y-6 sm:gap-y-0 sm:justify-around sm:items-center'>
      <div>
        <div className='text-sm text-muted-foreground'>Platform Fee</div>
        <div className='font-medium'>{saleFees.toFixed(4)} OCTA</div>
      </div>
      <div>
        <div className='text-sm text-muted-foreground'>Raised Funds Fee</div>
        <div className='font-medium'>4% of total raised</div>
      </div>
      <div>
        <div className='text-sm text-muted-foreground'>Token Supply Fee</div>
        <div className='font-medium'>1% of total supply</div>
      </div>
    </div>
  );
}
