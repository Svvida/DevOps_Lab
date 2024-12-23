import type { IDegreeCourse, IDegreePath, IModule } from 'contract/interfaces/academics/Academics';
import type { IStudent, IAddress, IConsent } from 'contract/interfaces/persons/Persons';

export interface IGetAuthorizedStudentAllDataBackendResponse
  extends Omit<IStudent, 'degreeCourses' | 'degreePaths' | 'modules'> {
  address: IAddress;
  consent: IConsent;
  degreeCourses: IDegreeCourse[];
  degreePaths: IDegreePath[];
  modules: IModule[];
}

export interface IGetAuthorizedStudentAllDataRequest {
  accountId: string;
  studentId: string;
}

export interface IGetAuthorizedStudentAllDataTransformedReponse extends IStudent {}
