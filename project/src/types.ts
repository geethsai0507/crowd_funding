export interface Campaign {
  id: string;
  title: string;
  description: string;
  target_amount: number;
  current_amount: number;
  end_date: string;
  image_url: string;
  creator_id: string;
  created_at: string;
  category: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}