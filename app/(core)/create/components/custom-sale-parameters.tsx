import Link from 'next/link';

export default function CustomSaleParameters() {
  return (
    <div className='text-center mt-7'>
      <p className='text-sm'>
        Need custom parameters for your sale? Contact us on{' '}
        <Link
          href='https://t.me/MisterrD420'
          target='_blank'
          rel='noopener noreferrer'
          className='text-primary hover:underline'
        >
          Telegram
        </Link>
      </p>
    </div>
  );
}
