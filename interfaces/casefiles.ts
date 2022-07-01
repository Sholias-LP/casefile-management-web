export interface ICasefile {
  caseType: string;
  client: string;
  gender: string;
  occupation: string;
  brief: string;
  email: string;
  letterOfEngagement: string;
  serviceFee: number;
  deposit: number[];
  expenses: IExpenses[];
  courtSitting: ICourtSitting[];
  _id?: string;
}

export interface ICasefilesResponse {
  author: string;
  brief: string;
  case_type: string;
  casefile_id: string;
  client: string;
  court_sitting: ICourtSitting[];
  createdAt: string;
  deposit: string[];
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
}
