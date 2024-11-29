'use client';

import { useState, useEffect } from 'react';
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

export default function CreateDialog({ saleFees }: { saleFees: number }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal immediately when component mounts
    setIsOpen(true);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='h-full flex flex-col justify-center sm:h-fit'>
        <DialogHeader>
          <DialogTitle>Create Sale Info</DialogTitle>
          <DialogDescription>
            Understand our fee structure and learn about custom options
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <h3 className='font-medium'>Standard Fee Structure</h3>
            <ul className='list-disc pl-4 text-sm text-muted-foreground space-y-1'>
              <li>Platform Fee: $1,000 / {saleFees.toFixed(4)} OCTA</li>
              <li>Raised Funds Fee: 4% of total raised</li>
              <li>Token Supply Fee: 1% of total supply</li>
            </ul>
          </div>
          <div className='space-y-2'>
            <h3 className='font-medium'>Custom Parameters</h3>
            <p className='text-sm text-muted-foreground'>
              Need custom sale parameters? Contact our project owner directly on
              Telegram for personalized solutions.
            </p>
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
