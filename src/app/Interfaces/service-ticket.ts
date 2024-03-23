import { VehicleInfo } from './VehicleInfo';
import { InsuranceAuthorizationPaymentInfo } from './insurance-authorization-payment-info';
import { MaintenanceHistory } from './maintenance-history';
import { ProblemDescription } from './problem-description';

export interface ServiceTicket {
  firstName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  physicalAddress?: string;
  carMakerr?: string;
  carModel?: string;
  carYear?: number;
  vin?: string;
  licensePlate: string;
  currentMileage?: number;
  maintenanceDetails?: string;
  issueDescription?: string;
  dashboardLights?: string;
  /*
  vehicleInfo: VehicleInfo[]
  insuranceAuthorizationPaymentInfo: InsuranceAuthorizationPaymentInfo[];
  maintenanceHistory: MaintenanceHistory[];
  problemDescription: ProblemDescription[];*/
}
