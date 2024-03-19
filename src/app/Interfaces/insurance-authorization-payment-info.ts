export interface InsuranceAuthorizationPaymentInfo {
  insuranceId?: number;
  contactId?: number;
  insuranceCompany?: string;
  policyNumber?: string;
  adjusterContact?: string;
  authorizationSignature?: string;
  creditCardInfo: string;
}
