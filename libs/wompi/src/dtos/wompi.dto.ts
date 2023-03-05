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
  acceptance_token: string;
  amount_in_cents: number;
  currency: CURRENCY;
  customer_email: string;
  payment_method: TPaymentMethod;
  payment_source_id: number;
  redirect_url: string;
  reference: string;
  customer_data: TCustomerData;
  shipping_address: TShippingAddress;
};
