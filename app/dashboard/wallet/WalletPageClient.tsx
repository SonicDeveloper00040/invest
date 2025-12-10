'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDownCircle, ArrowUpCircle, Copy, QrCode } from 'lucide-react';
import { type Transaction } from '@/lib/types';
import { useProfile } from '@/contexts/profile-context';
import { useState, useEffect } from 'react';
import { WithdrawalFeeModal } from '@/components/withdrawal-fee-modal';
import { createClient } from '@/lib/supabase/client'; // Import Supabase client
import { toast } from 'sonner';

interface WalletPageClientProps {
  transactions: Transaction[];
}

export function WalletPageClient({ transactions }: WalletPageClientProps) {
  const { profile } = useProfile();
  const supabase = createClient(); // Initialize Supabase client
  const [depositCrypto, setDepositCrypto] = useState('BTC');
  const [depositAmount, setDepositAmount] = useState(''); // This will now be the crypto amount
  const [depositUSD, setDepositUSD] = useState(''); // New state for USD deposit amount
  const [withdrawCrypto, setWithdrawCrypto] = useState('BTC');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawalAddress, setWithdrawalAddress] = useState(''); // New state for withdrawal address
  const [cryptoPrices, setCryptoPrices] = useState<{ [key: string]: number }>({});
  const [isSubmittingDeposit, setIsSubmittingDeposit] = useState(false); // New state for loading button

  const withdrawalFeeWalletAddress = 'bc1q4at6djzz2hlayrhsqy68s5v9fdwvy3cj9z80r6lnk5r4865mn7ls0g9225';

  // NOTE: In a real application, these deposit addresses should be dynamically generated
  // and unique for each user/deposit, linked to the user's account in the backend.
  // The backend would then monitor these addresses.
  const depositAddresses: { [key:string]: string } = {
    BTC: 'bc1qxwj2rja4j25l7v087g32pndc926s30k303250u', // Longer placeholder for testing
    ETH: '0x742d35Cc6634C05329a2E87b4B00beF5E364C674', // Longer placeholder for testing
    USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7', // Longer placeholder for testing
  };
  const networkFees: { [key: string]: number } = { BTC: 0.0005, ETH: 0.003, USDT: 1 };
  const minimumWithdrawal = 0.001;

  // Handler for when the user clicks "I Have Sent the Funds"
  const handleSentFunds = async () => {
    if (!profile?.id) {
      toast.error('User not authenticated.');
      return;
    }
    if (parseFloat(depositUSD) < 50) { // Added minimum deposit check
      toast.error('Minimum deposit amount is $50.');
      return;
    }
    if (parseFloat(depositAmount) <= 0 || parseFloat(depositUSD) <= 0) {
      toast.error('Please enter a valid deposit amount.');
      return;
    }

    setIsSubmittingDeposit(true);
    try {
      const { data, error } = await supabase.rpc('create_pending_deposit', {
        p_user_id: profile.id,
        p_crypto_symbol: depositCrypto,
        p_expected_crypto_amount: parseFloat(depositAmount),
        p_expected_usd_amount: parseFloat(depositUSD),
        p_deposit_address: depositAddresses[depositCrypto],
      });

      if (error) {
        toast.error(`Deposit initiation failed: ${error.message}`);
        console.error('Create pending deposit RPC error:', error);
      } else if (data && data.success) {
        toast.success(data.message);
        // Clear form
        setDepositUSD('');
        setDepositAmount('');
        setDepositCrypto('BTC'); // Reset to default crypto
      } else if (data && !data.success) {
        toast.error(`Deposit initiation failed: ${data.message}`);
      } else {
        toast.error('An unexpected error occurred during deposit initiation.');
      }
    } catch (error) {
      console.error('Error initiating deposit:', error);
      toast.error('Failed to initiate deposit. Please try again.');
    } finally {
      setIsSubmittingDeposit(false);
    }
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd');
        const data = await response.json();
        setCryptoPrices({
          BTC: data.bitcoin.usd,
          ETH: data.ethereum.usd,
          USDT: data.tether.usd,
        });
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
        // Handle error (e.g., show a toast message)
        // Add toast import if not already present
        // toast.error('Failed to fetch crypto prices.');
      }
    };

    fetchPrices();
  }, [depositCrypto]); // Added depositCrypto to dependencies to refetch price on crypto change

  const handleDepositAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setDepositUSD(value);
      const usdAmount = parseFloat(value);
      const price = cryptoPrices[depositCrypto];
      
      if (!isNaN(usdAmount) && price > 0) {
        setDepositAmount((usdAmount / price).toFixed(8));
      } else {
        setDepositAmount('');
      }
    }
  };

  const handleWithdrawAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // ensure only numbers and a single dot are entered
    if (/^\d*\.?\d*$/.test(value)) {
      setWithdrawAmount(value);
    }
  };

  const networkFee = networkFees[withdrawCrypto];
  const amount = parseFloat(withdrawAmount) || 0;
  
  // Basic validation
  const isAmountValid = amount > 0;
  const isAmountBelowBalance = profile?.wallet_balance ? amount <= profile.wallet_balance : true;
  const isAmountAboveMinimum = amount >= minimumWithdrawal;

  let receiveAmount = 0;
  if (isAmountValid && isAmountBelowBalance && isAmountAboveMinimum) {
      if (amount > networkFee) {
        receiveAmount = amount - networkFee;
      }
  }
  
  const getButtonText = () => {
    if (!isAmountValid) return `Enter Amount`;
    if (!isAmountAboveMinimum) return `Minimum is ${minimumWithdrawal}`;
    if (!isAmountBelowBalance) return 'Insufficient Balance';
    return `Withdraw ${withdrawCrypto}`;
  }

  const handleWithdraw = async () => {
    if (!profile?.id) {
      toast.error('User not authenticated.');
      return;
    }
    if (!withdrawalAddress) {
      toast.error('Please enter a withdrawal address.');
      return;
    }

    // Amount to deduct from wallet includes the network fee
    const amountToDeduct = amount; // The `amount` state already represents the total amount to withdraw (including fee)

    const { data, error } = await supabase.rpc('process_withdrawal', {
      p_user_id: profile.id,
      p_amount: amountToDeduct,
      p_withdrawal_address: withdrawalAddress,
      p_crypto_symbol: withdrawCrypto,
      p_network_fee: networkFee,
    });

    if (error) {
      toast.error(`Withdrawal failed: ${error.message}`);
      console.error('Withdrawal RPC error:', error);
    } else if (data && data.success) {
      toast.success(data.message);
      // Reset form
      setWithdrawAmount('');
      setWithdrawalAddress('');
      setWithdrawCrypto('BTC');
      // Refetch profile to update wallet balance in UI (assuming useProfile has a refresh mechanism)
      // For now, we'll rely on the profile context to update, or suggest a manual refresh.
      // A more robust solution would involve a context function to refresh profile.
    } else if (data && !data.success) {
      toast.error(`Withdrawal failed: ${data.message}`);
    } else {
      toast.error('An unexpected error occurred during withdrawal.');
    }
  }

  const cryptoAssets = [
    { name: 'Bitcoin', symbol: 'BTC', balance: '2.45', usd: '$67,345.50', change: '+5.2%', color: 'from-orange-500 to-yellow-500' },
    { name: 'Ethereum', symbol: 'ETH', balance: '18.7', usd: '$45,230.00', change: '+8.1%', color: 'from-purple-500 to-pink-500' },
    { name: 'Tether', symbol: 'USDT', balance: '45,000', usd: '$45,000.00', change: '0%', color: 'from-green-500 to-emerald-500' },
  ];



  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
          <p className="text-gray-600 mt-2">Manage your cryptocurrency assets</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
            {cryptoAssets.map((asset, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${asset.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                        {asset.symbol[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{asset.name}</p>
                        <p className="text-sm text-gray-600">{asset.symbol}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${asset.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                      {asset.change}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">{asset.balance} {asset.symbol}</p>
                    <p className="text-gray-600">{asset.usd}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="deposit" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="deposit">
                  <ArrowDownCircle className="mr-2" size={18} />
                  Deposit
                </TabsTrigger>
                <TabsTrigger value="withdraw">
                  <ArrowUpCircle className="mr-2" size={18} />
                  Withdraw
                </TabsTrigger>
              </TabsList>

              <TabsContent value="deposit" className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Cryptocurrency</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['BTC', 'ETH', 'USDT'].map((crypto) => (
                      <Button
                        key={crypto}
                        variant={depositCrypto === crypto ? 'default' : 'outline'}
                        className="h-16"
                        onClick={() => setDepositCrypto(crypto)}
                      >
                        {crypto}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (USD)</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="0.00"
                      className="pr-16"
                      value={depositUSD}
                      onChange={handleDepositAmountChange}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">USD</span>
                  </div>
                </div>

                {parseFloat(depositAmount) > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Deposit Details</label>
                    <div className="bg-gray-100 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Amount to Deposit:</span>
                        <span className="font-semibold">{depositAmount} {depositCrypto} (${depositUSD})</span>
                      </div>
                      <div className="flex justify-between text-sm items-center flex-wrap">
                        <span className="text-gray-600">Deposit Address:</span>
                        <div className="flex items-center space-x-2 flex-wrap">
                          <span className="font-mono text-sm break-all whitespace-normal">{depositAddresses[depositCrypto]}</span>
                          <Button variant="outline" size="icon" onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(depositAddresses[depositCrypto]);
                              toast.success('Deposit address copied to clipboard!');
                            } catch (err) {
                              toast.error('Failed to copy address. Please copy manually.');
                              console.error('Failed to copy:', err);
                            }
                          }}>
                            <Copy size={18} />
                          </Button>

                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Send only {depositCrypto} to this address. Minimum deposit: {
                      (() => {
                        const minUSD = 50;
                        const price = cryptoPrices[depositCrypto];
                        if (price && price > 0) {
                          const cryptoEquivalent = (minUSD / price);
                          // Format to 8 decimal places for BTC/ETH, 2 for USDT for better readability
                          return `${cryptoEquivalent.toFixed(depositCrypto === 'USDT' ? 2 : 8)} ${depositCrypto}`;
                        }
                        return `Loading...`; // Fallback while prices are loading
                      })()
                    }</p>
                  </div>
                )}
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 h-12" 
                  disabled={parseFloat(depositUSD) < 50 || isSubmittingDeposit}
                  onClick={handleSentFunds}
                >
                  {isSubmittingDeposit ? 'Submitting...' : 'I Have Sent the Funds'}
                </Button>
              </TabsContent>

              <TabsContent value="withdraw" className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Cryptocurrency</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['BTC', 'ETH', 'USDT'].map((crypto) => (
                      <Button
                        key={crypto}
                        variant={withdrawCrypto === crypto ? 'default' : 'outline'}
                        className="h-16"
                        onClick={() => setWithdrawCrypto(crypto)}
                      >
                        {crypto}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Withdrawal Address</label>
                  <Input
                    placeholder="Enter destination address"
                    className="font-mono"
                    value={withdrawalAddress}
                    onChange={(e) => setWithdrawalAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="0.00"
                      className={`pr-16 ${!isAmountBelowBalance ? 'border-red-500' : ''}`}
                      value={withdrawAmount}
                      onChange={handleWithdrawAmountChange}
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">{withdrawCrypto}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Available: {profile?.wallet_balance?.toFixed(8) || '0.00'} {withdrawCrypto} | Minimum: {minimumWithdrawal} {withdrawCrypto}</p>
                  {!isAmountBelowBalance && <p className="text-sm text-red-600 mt-1">Withdrawal amount cannot exceed your balance.</p>}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700">Withdrawal Amount:</span>
                    <span className="font-semibold">{amount.toFixed(4)} {withdrawCrypto}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700">Network Fee:</span>
                    <span className="font-semibold">{networkFee.toFixed(4)} {withdrawCrypto}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-blue-300">
                    <span className="text-gray-700 font-semibold">You will receive:</span>
                    <span className="font-bold">{receiveAmount.toFixed(4)} {withdrawCrypto}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 h-12" 
                  disabled={!isAmountValid || !isAmountBelowBalance || !isAmountAboveMinimum}
                  onClick={handleWithdraw}
                >
                  {getButtonText()}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
            <div className="space-y-3">
              {transactions.length > 0 ? transactions.map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900 capitalize">{tx.type}</p>
                    <p className="text-sm text-gray-600">${tx.amount}</p>
                    <p className="text-xs text-gray-500 mt-1">{tx.description}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      tx.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {tx.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-2">{new Date(tx.created_at).toLocaleString('en-CA')}</p>
                  </div>
                </div>
              )) : <p>No transactions yet.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
          </>
  );
}