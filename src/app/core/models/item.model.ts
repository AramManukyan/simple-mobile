export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'available' | 'reserved' | 'adopted';
  updatedAt: string;
  location?: string;
  notes?: string;
}
