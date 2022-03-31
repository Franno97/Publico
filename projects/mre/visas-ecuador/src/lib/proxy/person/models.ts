import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface ActualizarPersonaConfiguracionDto {
  validarPuntoDeAcceso: boolean;
  validarNacionalidad: boolean;
  nacionalidadesPermitidas: string;
  mayoriaEdadPermitidad: number;
  validarEdadMinima: boolean;
  habilitarCaptcha: boolean;
  fechaInicialControl?: string;
  fechaFinalControl?: string;
  duracionCodigoVerificacion: number;
  intentosPermitidos: number;
  duracionBloqueo: number;
}

export interface CreateUpdatePersonDto {
  name: string;
  firtsSurname: string;
  secondSurname?: string;
  birthDate: string;
  birthCountryId: string;
  nationalities: string[];
  email: string;
  hasIdentityDocument: boolean;
  identityDocumentTypeId?: string;
  identityDocumentNumber?: string;
  identityDocumentEmissionCountry?: string;
  identityDocumentEmissionDate?: string;
  identityDocumentExpirationDate?: string;
  gender: string;
  maritalStatusId: string;
  phoneNumber: string;
  address: string;
  regionId: string;
  city: string;
  visaNumber?: string;
  visaTypeId?: string;
  visaEmissionDate?: string;
  visaExpirationDate?: string;
  educationLevelId: string;
  professionId: string;
  occupationId: string;
  photograph: number[];
  permanenceRecordNumber: string;
  fingerPrint: number[];
  countryEntryDate: string;
  regularPointAccess: boolean;
  lastResidenceCountry: string;
  origin: string;
  originId: string;
  userName: string;
}

export interface GetPersonInputDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface IdentityDocumentDto {
  id: string;
  identityDocumentTypeId: string;
  identityDocumentType?: string;
  documentNumber?: string;
  emisionCountryId?: string;
  emissionDate?: string;
  expirationDate?: string;
}

export interface IdentityDocumentTypeDto {
  id: string;
  nombre: string;
  codigoMapeo?: string;
}

export interface OccupationDto {
  id: string;
  nombre: string;
  codigoMapeo?: string;
}

export interface PersonDto {
  id?: string;
  name?: string;
  firtsSurname?: string;
  secondSurname?: string;
  birthDate?: string;
  birthCountryId?: string;
  nationalities: string[];
  nationalitiesText?: string;
  email?: string;
  hasIdentityDocument: boolean;
  hasIdentityDocumentText?: string;
  identityDocumentTypeId?: string;
  identityDocumentTypeName?: string;
  identityDocumentNumber?: string;
  identityDocumentEmissionCountry?: string;
  identityDocumentEmissionDate?: string;
  identityDocumentExpirationDate?: string;
  gender?: string;
  maritalStatusId?: string;
  maritalStatusName?: string;
  phoneNumber?: string;
  address?: string;
  region?: string;
  city?: string;
  visaNumber?: string;
  visaType?: string;
  visaTypeId?: string;
  visaEmissionDate?: string;
  visaExpirationDate?: string;
  educationLevelId?: string;
  educationLevelName?: string;
  professionId?: string;
  professionName?: string;
  occupationId?: string;
  occupationName?: string;
  photograph: number[];
  photoBase64?: string;
  permanenceRecordNumber?: string;
  fingerPrint: number[];
  fingerPrintBase64?: string;
  countryEntryDate?: string;
  regularPointAccess: boolean;
  regularPointAccessText?: string;
  lastResidenceCountry?: string;
  userName?: string;
}

export interface PersonaConfiguracionDto {
  validarPuntoDeAcceso: boolean;
  validarNacionalidad: boolean;
  nacionalidadesPermitidas?: string;
  mayoriaEdadPermitidad: number;
  validarEdadMinima: boolean;
  habilitarCaptcha: boolean;
  fechaInicialControl?: string;
  fechaFinalControl?: string;
  duracionCodigoVerificacion: number;
  intentosPermitidos: number;
  duracionBloqueo: number;
}

export interface ProfessionDto {
  id: string;
  nombre: string;
  codigoMapeo?: string;
}

export interface VisaDto {
  id: string;
  number?: string;
  visaTypeId?: string;
  visaType?: string;
  emissionDate?: string;
  expirationDate?: string;
}

export interface VisaTypeDto {
  id: string;
  nombre: string;
  codigoMapeo?: string;
}
