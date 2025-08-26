export interface Task {
  id: string;
  title: string;
  description: string;
  responsibility: boolean | undefined;
  responsibilityReason?: string;
  status: 'nowe' | 'w-trakcie' | 'zrobione';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  dueDate: string;
  tags: string[];
  createdAt: string;
}

export interface CustomerOpinion {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface EmployeeQuote {
  name: string;
  role: string;
  quote: string;
  sentiment: 'positive' | 'negative' | 'mixed';
}
