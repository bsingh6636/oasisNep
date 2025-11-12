import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Alert, AlertDescription } from './ui/alert';
import { FaWallet, FaMobileAlt, FaUniversity } from 'react-icons/fa';

const PaymentMethod = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMethod = searchParams.get('method') || 'esewa';

  const handleMethodChange = (method) => {
    setSearchParams({ method });
  };

  const paymentOptions = [
    { id: 'esewa', label: 'eSewa', icon: <FaWallet className="mr-2 h-4 w-4" /> },
    { id: 'khalti', label: 'Khalti', icon: <FaMobileAlt className="mr-2 h-4 w-4" /> },
    { id: 'bank', label: 'Bank Transfer', icon: <FaUniversity className="mr-2 h-4 w-4" /> },
  ];

  const renderDetails = () => {
    switch (selectedMethod) {
      case 'esewa':
        return (
          <Card className="w-full p-4 max-w-md bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Avatar className="mr-4">
                  <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQobMXYNheAlDT6Ukz4smf2K33xv3hZ7ELrqA&s" alt="eSewa" />
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>
                eSewa Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p><strong className="font-semibold">Name:</strong> Bijesh Kumar Kushwaha</p>
              <p><strong className="font-semibold">Number:</strong> 9800858635</p>
              <p><strong className="font-semibold">Amount:</strong> Rs __</p>
              <div>
                <p className="font-semibold">How to send❔</p>
                <ul className="list-disc list-inside pl-2 text-gray-300">
                  <li>Use "Send Money" feature</li>
                  <li>Purpose: Personal Use</li>
                  <li>Remarks: Your Name ONLY</li>
                </ul>
              </div>
              <Alert variant="destructive" className="bg-red-900 border-red-700 text-white">
                <AlertDescription>
                  ❌ Do not send top-up/recharge
                </AlertDescription>
              </Alert>
              <Alert className="bg-blue-900 border-blue-700 text-white">
                <AlertDescription>
                  ⚠️ Send screenshot after successful payment
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        );
      case 'khalti':
        return (
          <Card className="w-full max-w-md bg-gray-800 border-gray-700 text-white p-4">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Avatar className="mr-4">
                  <AvatarImage src="https://cdn.aptoide.com/imgs/b/2/c/b2c3c82e2890203b7a4b0cfb188b3f71_icon.png" alt="Khalti" />
                  <AvatarFallback>KH</AvatarFallback>
                </Avatar>
                Khalti Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p><strong className="font-semibold">Name:</strong> Brijesh Kushwaha</p>
              <p><strong className="font-semibold">Number:</strong> 9800858635</p>
              <Alert className="bg-blue-900 border-blue-700 text-white">
                <AlertDescription>
                  ⚠️ Send screenshot after successful payment
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        );
      case 'bank':
        return (
          <Card className="w-full p-4 max-w-md bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-xl">Direct Bank Transfer</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>For direct bank transfer, please contact admin.</p>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {paymentOptions.map((option) => (
            <Button
              key={option.id}
              variant={selectedMethod === option.id ? 'default' : 'outline'}
              onClick={() => handleMethodChange(option.id)}
              className={`flex-1 sm:flex-grow-0 sm:flex-shrink-0 basis-1/3 sm:basis-auto ${selectedMethod === option.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'}`}
            >
              {option.icon}
              {option.label}
            </Button>
          ))}
        </div>
        {renderDetails()}
      </div>
    </div>
  );
};

export default PaymentMethod;
