import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function FeesDisplay({ saleFees }: { saleFees: number }) {
  return (
    <Alert>
      <AlertTitle>Fees for creating the sale:</AlertTitle>
      <AlertDescription>
        <ul className='list-disc list-inside'>
          <li>{saleFees.toFixed(4)} OCTA</li>
          <li>4% of the raised funds</li>
          <li>1% of the total token supply</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}
