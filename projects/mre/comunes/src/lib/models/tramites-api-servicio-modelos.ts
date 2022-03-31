export interface SoclicitudCrearMovimientoServicio {
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

export interface SolicitudCrearDocumentoServicio {
    tramiteId: string;
    createdId: string;
    documentos: DetalleSolicitudCrearDocumento[];
}

export interface DetalleSolicitudCrearDocumento {
    nombre: string;
    observacion: string;
    tipoDocumento: string;
}