'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Define a version number for the terms
const TERMS_VERSION = '1.0';

export default function LaunchpadDisclaimer() {
  const [isOpen, setIsOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [attemptedClose, setAttemptedClose] = useState(false);

  useEffect(() => {
    const storedAgreement = localStorage.getItem('launchpadDisclaimerAgreed');
    if (storedAgreement !== TERMS_VERSION) {
      setIsOpen(true);
    }
  }, []);

  const handleAgree = () => {
    setAgreed(!agreed);
    setAttemptedClose(false);
  };

  const handleClose = () => {
    if (agreed) {
      setIsOpen(false);
      localStorage.setItem('launchpadDisclaimerAgreed', TERMS_VERSION);
      console.log('User agreed to the disclaimer');
    } else {
      setAttemptedClose(true);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open === false && !agreed) {
          return;
        }
        setIsOpen(open);
      }}
    >
      <DialogContent className='h-full sm:h-fit flex flex-col justify-center'>
        <DialogHeader>
          <DialogTitle>OctaSwap Launchpad Disclaimer</DialogTitle>
          <DialogDescription>
            Please read and agree to the following disclaimer before proceeding.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='text-sm text-muted-foreground'>
            <p>By using OctaSwap launchpad, you acknowledge and agree that:</p>
            <ul className='list-disc pl-5 mt-2 space-y-1'>
              <li>Cryptocurrency investments carry high risk</li>
              <li>Past performance does not guarantee future results</li>
              <li>You are responsible for your own investment decisions</li>
              <li>You should only invest what you can afford to lose</li>
              <li>This platform does not provide financial advice</li>
              <li>You will comply with all applicable laws and regulations</li>
            </ul>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='agree'
              checked={agreed}
              onCheckedChange={handleAgree}
            />
            <label
              htmlFor='agree'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              I have read and agree to the disclaimer
            </label>
          </div>
        </div>
        {attemptedClose && !agreed && (
          <p className='text-sm text-red-500 mt-2'>
            You must agree to the terms before proceeding.
          </p>
        )}
        <DialogFooter>
          <Button onClick={handleClose} disabled={!agreed}>
            I Understand and Agree
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
