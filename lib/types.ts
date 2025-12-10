
import { type SupabaseClient } from '@supabase/supabase-js';

export type TypedSupabaseClient = SupabaseClient<Database>;

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  wallet_balance: number;
  total_profit: number;
  referral_earnings: number;
  created_at: string;
}

export interface Plan {
  id: string;
  name: string;
  min_amount: number;
  max_amount: number | null;
  duration_days: number;
  daily_roi_percentage: number;
  description: string | null;
  features: string[] | null;
}

export interface Investment {
  id: string;
  user_id: string;
  plan_id: string;
  amount: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'completed' | 'cancelled';
  profit_earned: number;
  plans?: Plan;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'profit' | 'referral_bonus';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  description: string | null;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  commission_earned: number;
  created_at: string;
}

export interface PortfolioData {
  total_invested: number;
  current_portfolio_value: number;
  total_profit_loss: number;
  roi_percentage: number;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      plans: {
        Row: Plan;
        Insert: Omit<Plan, 'id'>;
        Update: Partial<Omit<Plan, 'id'>>;
      };
      investments: {
        Row: Investment;
        Insert: Omit<Investment, 'id' | 'start_date' | 'end_date' | 'status' | 'profit_earned'>;
        Update: Partial<Omit<Investment, 'id' | 'user_id' | 'plan_id'>>;
      };
      transactions: {
        Row: Transaction;
        Insert: Omit<Transaction, 'id' | 'created_at'>;
        Update: Partial<Omit<Transaction, 'id' | 'user_id'>>;
      };
      referrals: {
        Row: Referral;
        Insert: Omit<Referral, 'id' | 'created_at'>;
        Update: Partial<Omit<Referral, 'id'>>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
