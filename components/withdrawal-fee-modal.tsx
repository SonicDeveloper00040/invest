
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

interface WithdrawalFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feeAmount: number;
  walletAddress: string;
  cryptoSymbol: string;
}

export function WithdrawalFeeModal({
  isOpen,
  onClose,
  feeAmount,
  walletAddress,
  cryptoSymbol,
}: WithdrawalFeeModalProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    // Add a toast notification here to inform the user that the address has been copied.
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdrawal Fee</DialogTitle>
          <DialogDescription>
            A fee is required to process this withdrawal.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <QRCodeCanvas value={walletAddress} size={128} />
            <p className="text-sm text-gray-500">
              Send {feeAmount.toFixed(8)} {cryptoSymbol} to the address below.
            </p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={walletAddress}
                readOnly
                className="w-full p-2 text-sm border rounded-md bg-gray-100"
              />
              <Button variant="outline" size="icon" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> This fee is required for all withdrawals to cover network and processing costs. Your withdrawal will be processed after the fee is confirmed.
                </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
