

export interface Domicilio {
    id?: string;
    ciudad: string;
    direccion: string;
    pais: string;
    provincia: string;
    telefonoCelular: string;
    telefonoDomicilio: string;
    telefonoTrabajo: string;
}

export interface Pasaporte {
    id?: string;
    ciudadEmision: string;
    fechaEmision: string;
    fechaExpiracion: string;
    fechaNacimiento: string;
    nombres: string;
    numero: string;
    paisEmision: string;
    tipoDocumentoIdentidadId: string;
}

export interface Visa {
    fechaCaducidad?: string;
    fechaConcesion?: string;
    numero?: string;
    poseeVisa?: boolean;
    tipo?: string;
    confirmacionVisa?: boolean;
    estadoVisa?: string;
    idActoConsularVisa?: string;
    idCentroAdministrativo?: string;
    idPersona?: string;
    idTramite?: string;
    nombreActoConsularVisa?: string;
    nombreCentroAdministrativo?: string;
    nombres?: string;
    numeroPasaporte?: string;
    numeroVisa?: string;
    primerApellido?: string;
    segundoApellido?: string;
}

export interface Beneficiario {
    tipoCiudadano: number;
    carnetConadis: string;
    ciudadNacimiento: string;
    codigoMDG: string;
    correo: string;
    domicilio: Domicilio;
    estadoCivil: string;
    fechaNacimiento: string;
    foto: string;
    genero: string;
    nacionalidad: string;
    nacionalidadId: string;
    ocupacion: string;
    nombres: string;
    paisNacimiento: string;
    pasaporte: Pasaporte;
    edad: number;
    porcentajeDiscapacidad: number;
    poseeDiscapacidad: boolean;
    primerApellido: string;
    segundoApellido: string;
    visa: Visa;
}

export interface Documento {
    nombre: string;
    ruta: string;
    observacion: string;
    tipoDocumento: string;
    DescripcionDocumento: string;
    IconoNombre: string;
    ImagenNombre: string;

}

export interface Solicitante {
    cedula: string;
    ciudad: string;
    consuladoNombre: string;
    consuladoPais: string;
    direccion: string;
    edad: number;
    correo: string;
    nacionalidad: string;
    nombres: string;
    pais: string;
    telefono: string;
    identificacion: string;
    tipoIdentificacion: string;
}

export interface SoporteGestione {
    nombre: string;
    ruta: string;
    observacion: string;
}

export interface Movimiento {
    id?: string;
    unidadAdministrativaId: string;
    unidadAdministrativaNombre: string;
    usuarioId: string;
    nombreRol: string;
}

export interface formularioVisasFull {
    unidadAdministrativaIdCEV: string
    actividad: string;
    actividadId?: string;
    calidadMigratoria: string;
    calidadMigratoriaId?: string;
    grupo: string;
    tipoConvenioId?: string;
    tipoVisa: string;
    tipoVisaId?: string;
    beneficiario: Beneficiario;
    documentos: Documento[];
    solicitante: Solicitante;
    // soporteGestiones: SoporteGestione[];
    // movimiento: Movimiento;
    usuarioId: string;
    servicioId: string;
    codigoPais: string;
    observacion?: string;
    PersonaId?: string;

}
//----------------------------------------------------------
export interface InfoContext {
    info: string;
    imagen: string;
}
//----------------------------------------------------------
export interface MovimientoRequest {
    tramiteId: string;
    estado: number;
    estadoOrigen: number;
    observacionDatosPersonales: string;
    observacionSoportesGestion: string;
    observacionDomicilios: string;
    observacionMovimientoMigratorio: string;
    observacionMultas: string;
    creatorId: string;

    created: Date;
    diasTranscurridos: string;
    id: string;
    nombreRol: string;
    usuarioId: string;
    unidadAdministrativaId: string;
    nombreEstado: string;
    //-------------------------
    fechaCitaDesde: string;
    fechaCitaHasta: string;
}
export interface SoporteGestion {
    created: string;
    creatorId: string;
    id: string;
    isDeleted: boolean;
    lastModified: string;
    lastModifierId: string;
    nombre: string;
    ruta: string;
}


export interface TramitesObj {
    actividad: string;

    beneficiario: Beneficiario
    beneficiarioId: string;

    calidadMigratoria: string;
    created: string;
    creatorId: string;

    documentos: Array<Documento>;

    fecha: string;
    grupo: string;
    id: string;
    isDelete: boolean;
    lastModifierdId: string;

    movimientos: Array<MovimientoRequest>;

    numero: string;

    solicitante: Solicitante;
    solicitanteId: string;

    soporteGestiones: Array<SoporteGestion>

    tipoVisa: string;
}
export interface DatoVisa {
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    idNacionalidad: number;
    fechaNacimiento: string;
    usuario: string;
    contrasenia: string;
}





