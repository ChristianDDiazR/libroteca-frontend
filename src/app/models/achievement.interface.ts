export interface Achievement {
  id: number;
  user_id: number;
  achievement_type: string;
  unlocked_at: string;
  progress?: number;
  description?: string;
}
