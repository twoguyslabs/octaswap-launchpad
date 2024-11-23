import CreateSaleForm from './components/create-sale-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Rocket } from 'lucide-react';

export default function CreateSalePage() {
  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <Card className='border-t-4 border-t-primary'>
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <Rocket className='h-6 w-6 text-primary' aria-hidden='true' />
            <CardTitle className='text-3xl font-bold'>
              Create Your Token Sale
            </CardTitle>
          </div>
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
