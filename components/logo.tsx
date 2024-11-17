import Image from 'next/image';
import logo from '@/assets/logos/ocs-logo.svg';

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt='OctaSwap Logo'
      width={0}
      height={0}
      className={className}
    />
  );
}
