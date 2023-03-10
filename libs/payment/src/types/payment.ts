// Transaction
export enum CURRENCY {
  COP = 'COP',
}

export enum COUNTRY {
  CO = 'CO',
}

export enum PAYMENTS_METHOD {
  CARD = 'CARD',
  NEQUI = 'NEQUI',
  PSE = 'PSE',
  BANCOLOMBIA = 'BANCOLOMBIA',
  BANCOLOMBIA_TRANSFER = 'BANCOLOMBIA_TRANSFER',
  BANCOLOMBIA_COLLECT = 'BANCOLOMBIA_COLLECT',
  BANCOLOMBIA_QR = 'BANCOLOMBIA_QR',
}

export enum TRANSACTIONS_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  ERROR = 'ERROR',
  VOIDED = 'VOIDED',
}

export enum LEGAL_ID {
  CC = 'CC',
  CE = 'CE',
  NIT = 'NIT',
  PP = 'PP',
  TI = 'TI',
  DNI = 'DNI',
  RG = 'RG',
  OTHER = 'OTHER',
}

export type TPaymentMethod = {
  type: PAYMENTS_METHOD;
  token: string;
  installments: number;
};

export type TCustomerData = {
  phone_number: string;
  full_name: string;
  legal_id: string;
  legal_id_type: LEGAL_ID;
};

export type TShippingAddress = {
  address_line_1: string;
  address_line_2?: string;
  country: COUNTRY;
  region: string;
  city: string;
  name?: string;
  phone_number: string;
  postal_code?: string;
};

export type TTransaction = {
  acceptance_token?: string;
  signature?: string;
  amount_in_cents: number;
  currency: CURRENCY;
  customer_email: string;
  payment_method: TPaymentMethod;
  payment_source_id?: number;
  redirect_url?: string;
  reference: string;
  customer_data?: TCustomerData;
  shipping_address?: TShippingAddress;
};

export type TErrorResponse = {
  type: string;
  messages: { reference: string[] };
};

// Response merchant
type TPaymentProcesor = {
  name: string;
};

export type TPaymentsMethod = {
  name: string;
  payment_processors: TPaymentProcesor;
};

export type TPresignedAcceptance = {
  acceptance_token: string;
  permalink: string;
  type: string;
};

export type TMerchant = {
  id: number;
  name: string;
  email: string;
  contact_name: string;
  phone_number: string;
  active: boolean;
  logo_url: string;
  legal_name: string;
  legal_id_type: string;
  legal_id: string;
  public_key: string;
  accepted_currencies: string[];
  fraud_javascript_key: string;
  fraud_groups: object[];
  accepted_payment_methods: string[];
  payment_methods: TPaymentsMethod[];
  presigned_acceptance: TPresignedAcceptance;
};

export type TResponseMerchant = {
  data: TMerchant;
  error: TErrorResponse;
  meta: object;
};

// Response transaction
export type TResponsePaymentMethod = {
  type: PAYMENTS_METHOD;
  extra: {
    bin: string;
    name: string;
    brand: string;
    exp_year: string;
    exp_month: string;
    last_four: string;
    card_holder: string;
  };
  installments: number;
};

export type TResultTransaction = {
  id: string;
  created_at: Date | string;
  finalized_at: Date | string;
  amount_in_cents: number;
  reference: string;
  customer_email: string;
  currency: CURRENCY;
  payment_method_type: string;
  payment_method: TResponsePaymentMethod;
  status: TRANSACTIONS_STATUS;
  status_message: null;
  billing_data: null;
  shipping_address: TShippingAddress;
  redirect_url: string;
  payment_source_id: string;
  payment_link_id: string;
  customer_data: TCustomerData;
  bill_id: string;
  taxes: object[];
};

export type TResponseTransaction = {
  data: TResultTransaction;
  error: TErrorResponse;
  meta: object;
};

// Get Transaction
export type TTransactionMerchant = {
  name: string;
  legal_name: string;
  contact_name: string;
  phone_number: string;
  logo_url: string;
  legal_id_type: LEGAL_ID;
  email: string;
  legal_id: string;
};

export type TGetTransaction = {
  id: string;
  created_at: Date | string;
  amount_in_cents: number;
  reference: string;
  currency: CURRENCY;
  payment_method_type: PAYMENTS_METHOD;
  payment_method: TResponsePaymentMethod;
  redirect_url: string;
  status: TRANSACTIONS_STATUS;
  status_message: string;
  merchant: TTransactionMerchant;
  taxes: object[];
};

export type TResponseGetTransaction = {
  data: TGetTransaction;
  error: TErrorResponse;
  meta: string;
};
