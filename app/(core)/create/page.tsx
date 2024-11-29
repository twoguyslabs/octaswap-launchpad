import CreateSaleForm from './components/create-sale-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CreateSalePage() {
  return (
    <div className='container mx-auto px-4 py-8 max-w-3xl'>
      <Card className='border-t-4 border-t-primary'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>
            Create Your Token Sale
          </CardTitle>
          <CardDescription>
            Fill in the details below to set up your token sale on OctaSwap
            Launchpad.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateSaleForm />
        </CardContent>
      </Card>
    </div>
  );
}
