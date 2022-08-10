export interface ICasefile {
  caseType: string;
  client: string;
  gender: string;
  occupation: string;
  brief: string;
  email: string;
  letterOfEngagement: string;
  serviceFee: number;
  deposit: IDeposit[];
  expenses: IExpenses[];
  courtSitting: ICourtSitting[];
  _id?: string;
  suitNumber: string;
  fileNumber: string;
}

export interface IDeposit {
  amount: number;
  _id?: string;
}

export interface ICasefilesResponse {
  author: string;
  brief: string;
  case_type: string;
  file_number: string;
  suit_number: string;
  client: string;
  court_sitting: ICourtSitting[];
  createdAt: string;
  deposit: IDeposit[];
  expenses: IExpenses[];
  gender: string;
  isDeleted: boolean;
  letter_of_engagement: string;
  occupation: string;
  service_fee: number;
  status: string;
  _id: string;
  case_id: string;
  views: number;
}

export interface ICourtSitting {
  date: string;
  note: string;
  _id?: string;
}

export interface IExpenses {
  amount: number;
  note: string;
  _id?: string;
  status?: string;
}

export interface ICasefileExpense {
  casefileId: string;
  expenseId: string;
  action: string;
}
