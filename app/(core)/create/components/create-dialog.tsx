'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function CreateDialog({
  feesString,
  setFeesString,
  platformFee,
  supplyFee,
  saleFee,
}: {
  feesString: 'standard' | 'alternative';
  setFeesString: (value: 'standard' | 'alternative') => void;
  platformFee: number;
  supplyFee: bigint | undefined;
  saleFee: bigint | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const supplyFeePercentage = useMemo(
    () => (supplyFee ? parseFloat(supplyFee.toString()) / 100 : 0),
    [supplyFee]
  );

  const saleFeePercentage = useMemo(
    () => (saleFee ? parseFloat(saleFee.toString()) / 100 : 0),
    [saleFee]
  );

  useEffect(() => {
    // Show modal immediately when component mounts
    setIsOpen(true);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='h-full flex flex-col justify-center sm:h-fit'>
        <DialogHeader>
          <DialogTitle>Create Sale</DialogTitle>
          <DialogDescription>
            Understand our fees structure and learn about custom options
          </DialogDescription>
        </DialogHeader>
        <div>
          <RadioGroup
            defaultValue='standard'
            value={feesString}
            onValueChange={setFeesString}
          >
            <div className='flex items-center gap-2'>
              <RadioGroupItem value='standard' id='standard' />
              <Label>Standard</Label>
            </div>
            <div className='flex items-center gap-2'>
              <RadioGroupItem value='alternative' id='alternative' />
              <Label>Alternative</Label>
            </div>
          </RadioGroup>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <h3 className='font-medium'>
                <span className='capitalize'>{feesString}</span> Fees Structure
              </h3>
              <ul className='list-disc pl-4 text-sm text-muted-foreground space-y-1'>
                <li>Platform Fee: {platformFee.toFixed(4)} OCTA</li>
                <li>Raised Funds Fee: {saleFeePercentage}% of total raised</li>
                <li>
                  Token Supply Fee: {supplyFeePercentage}% of total supply
                </li>
              </ul>
            </div>
            <div className='space-y-2'>
              <h3 className='font-medium'>Custom Parameters</h3>
              <p className='text-sm text-muted-foreground'>
                Need custom sale parameters? Contact our project owner directly
                on Telegram for personalized solutions.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className='sm:justify-between gap-2'>
          <Button variant='outline' asChild>
            <Link
              href='https://t.me/MisterrD420'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 order-1 sm:order-none'
            >
              Contact on Telegram
              <ExternalLink className='h-4 w-4' />
            </Link>
          </Button>
          <Button variant='secondary' onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
