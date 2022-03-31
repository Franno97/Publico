import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TramitesObj } from 'projects/mre/visas-ecuador/src/lib/modelos/models';

@Injectable({
  providedIn: 'root'
})
export class EnviarDatosModalService {
  data: any;
  formData: FormGroup;

  constructor() { }
  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  setReactiveForm(data: FormGroup) {
    this.formData = data;
  }

  getReacitveForm(): FormGroup {
    return this.formData;
  }

  patchValuetoForm(data: TramitesObj) {

    this.formData.patchValue({
      numberMDG: ['OJOJOJOJ'],
      cedulaSolicitante: data.solicitante.identificacion,
      nacionalidadSolicitante: data.solicitante.nacionalidad,
      nombreCompletSolicitanteo: data.solicitante.nombres,
      paisSolicitante: data.solicitante.pais,
      ciudadSolicitante: data.solicitante.ciudad,
      paisConsuladoUnidadAdministrativaSolicitante: data.solicitante.consuladoPais,
      direccionSolicitante: data.solicitante.direccion,
      telefonoSolicitante: data.solicitante.telefono,
      edadSolicitante: data.solicitante.edad,
      nombreConsuladoUnidadAdministrativaSolicitante: data.solicitante.consuladoNombre,
      correoSolicitante: data.solicitante.correo,
      // --------------------------------------
      fechaSolicitudBeneficiario: (new Date(data.fecha)).toISOString().substring(0, 10),
      primerApellidoBeneficiario: data.beneficiario.primerApellido,
      segundoApellidoBeneficiario: data.beneficiario.segundoApellido,
      nombreCompletoBeneficiario: data.beneficiario.nombres,
      numberMDGBeneficiario: data.beneficiario.codigoMDG,
      paisNacimientoBeneficiario: data.beneficiario.paisNacimiento,
      ciudadNacimientoBeneficiario: data.beneficiario.ciudadNacimiento,
      fechaNacimientoBeneficiario: (new Date(data.beneficiario.fechaNacimiento)).toISOString().substring(0, 10),
      // edadBeneficiario:data.beneficiario.edad,
      edadBeneficiario: (new Date()).getFullYear() - (new Date(data.beneficiario.fechaNacimiento)).getFullYear(),
      estadoCivilBeneficiario: data.beneficiario.estadoCivil,
      nacionalidadBeneficiario: data.beneficiario.nacionalidad,
      generoBeneficiario: data.beneficiario.genero,
      emailBeneficiario: data.beneficiario.correo,
      calidadMigratoria: data.calidadMigratoria,
      grupoBeneficiario: data.grupo,
      tipoVisaBeneficiario: data.tipoVisa,
      actividadDesarrollarBeneficiario: data.actividad,
      discapacidadBeneficiario: data.beneficiario.poseeDiscapacidad,
      porcientoDiscapacidadBeneficiario: data.beneficiario.porcentajeDiscapacidad,
      numeroCarnetConadisBeneficiario: data.beneficiario.carnetConadis,
      // --------------------------------------
      // Domicilio
      // --------------------------------------
      paisDomicilioBeneficiario: data.beneficiario.domicilio.pais,
      provinciaDomicilioBeneficiario: data.beneficiario.domicilio.provincia,
      ciudadDomicilioBeneficiario: data.beneficiario.domicilio.ciudad,
      telefonoDomicilioBeneficiario: data.beneficiario.domicilio.telefonoDomicilio,
      celularDomicilioBeneficiario: data.beneficiario.domicilio.telefonoCelular,
      direccionDomicilioBeneficiario: data.beneficiario.domicilio.direccion,
      telefonoTrabajoDomicilioBeneficiario: data.beneficiario.domicilio.telefonoTrabajo,
      // --------------------------------------
      // Pasaporte
      // --------------------------------------
      numeroPasaporteBeneficiario: data.beneficiario.pasaporte.numero,
      fechaEmisionPasaporteBeneficiario: (new Date(data.beneficiario.pasaporte.fechaEmision)).toISOString().substring(0, 10),
      paisEmisionPasaporteBeneficiario: data.beneficiario.pasaporte.paisEmision,
      nombreCompletoPasaporteBeneficiario: data.beneficiario.pasaporte.nombres,
      fechaExpiracionPasaporteBeneficiario: (new Date(data.beneficiario.pasaporte.fechaExpiracion)).toISOString().substring(0, 10),
      ciudadEmisionPasaporteBeneficiario: data.beneficiario.pasaporte.ciudadEmision,
      fechaNacimientoPasaporteBeneficiario: (new Date(data.beneficiario.pasaporte.fechaNacimiento)).toISOString().substring(0, 10),
      // --------------------------------------
      // Visa
      // --------------------------------------
      tieneVisaBeneficiario: data.beneficiario.visa.poseeVisa,
      numeroVisaBeneficiario: data.beneficiario.visa.numero,
      fechaEmisionVisaBeneficiario: (new Date(data.beneficiario.visa.fechaConcesion)).toISOString().substring(0, 10),
      numero1VisaBeneficiario: ["OJOJOJO falta"],
      fechaExpiracionVisaBeneficiario: (new Date(data.beneficiario.visa.fechaCaducidad)).toISOString().substring(0, 10),

    });
  }
  copiarCiertasPropiedadesObj(Obj1: any, Obj2: any) {
    let propiedadesObj: Array<string> = ['observacionDatosPersonales', 'observacionDomicilios', 'observacionMovimientoMigratorio', 'observacionMultas', 'observacionSoportesGestion', 'fechaCitaDesde', 'fechaCitaHasta'];
    propiedadesObj.forEach(x => {
      if (Obj2[x] == undefined)
        Obj1[x] = '';
      else
        Obj1[x] = Obj2[x];
    });
  }
}
