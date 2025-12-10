
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { toast } from 'sonner';

interface WithdrawalFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // This will now mean the user confirmed they sent the fee
  feeToPay: number;
  companyWalletAddress: string;
  cryptoSymbol: string;
}

export function WithdrawalFeeModal({
  isOpen,
  onClose,
  onConfirm,
  feeToPay,
  companyWalletAddress,
  cryptoSymbol,
}: WithdrawalFeeModalProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(companyWalletAddress);
    toast.success('Company address copied to clipboard!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pay Withdrawal Fee</DialogTitle>
          <DialogDescription>
            A 30% service fee is required to process your withdrawal. Please send the fee to the address below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <QRCodeCanvas value={companyWalletAddress} size={128} />
            <p className="text-sm text-gray-500 text-center">
              Please send <span className="font-bold">{feeToPay.toFixed(8)} {cryptoSymbol}</span> to the company address below.
            </p>
            <div className="flex items-center space-x-2 w-full">
              <input
                type="text"
                value={companyWalletAddress}
                readOnly
                className="flex-grow p-2 text-sm border rounded-md bg-gray-100 font-mono break-all"
              />
              <Button variant="outline" size="icon" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800 text-center">
                  <strong>Important:</strong> Your withdrawal will be processed only after this fee payment is confirmed by our team.
                </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>I Have Sent the Fee</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
