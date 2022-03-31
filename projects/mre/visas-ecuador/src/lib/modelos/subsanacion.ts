

export interface Domicilio {
    id: string;
    telefonoCelular: string;
    telefonoDomicilio: string;
    telefonoTrabajo: string;
    pais: string;
}

export interface Pasaporte {
    id: string;
    ciudadEmision: string;
}

export interface BeneficiarioDtoSubsanacion {
    domicilio: Domicilio;
    pasaporte: Pasaporte;
    foto: string;
    carnetConadis: string;
    porcentajeDiscapacidad: number;
    poseeDiscapacidad: boolean;
}

export interface Documento {
    id?: string;
    nombre: string;
    ruta: string;
    observacion: string;
    tipoDocumento: string;
    DescripcionDocumento: string;
    IconoNombre: string;
    ImagenNombre: string;
}

export interface CrearMovimientoRequest {
    tramiteId: string;
    estado: number;
    observacionDatosPersonales: string;
    observacionSoportesGestion: string;
    observacionDomicilios: string;
    observacionMovimientoMigratorio: string;
    observacionMultas: string;
    fechaHoraCita: string;
    creatorId: string;
}

export interface Subsanacion {
    tramiteId: string;
    usuarioId: string;
    beneficiarioDtoSubsanacion: BeneficiarioDtoSubsanacion;
    documentos: Documento[];
    crearMovimientoRequest: CrearMovimientoRequest;
}
export interface JsonFile {
    tipoDocumental: string;
    file?: File;
    maxElement?: number;
    base64?: string;
    nombreArchivo?: string;
}


