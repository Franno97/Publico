export interface SolicitudGrabarSoporteGestion {
    archivo: any;
    codigoMDG: string;
}

export interface SolicitudObtenerArchivoBase64PorUrl {
    urlArchivo: any;
}

export interface SolicitudGrabarDocumentoZipGestion {
    tramiteId: string;
    archivos: DetalleArchivo[];
}

export interface DetalleArchivo {
    nombreArchivo: string;
    archivo: any;
}

export interface RespuestaObtenerArchivosCiudadanoPorCodigo {
    Error: string;
    Archivos: ArchivoCiudadanoPorCodigo[];
}

export interface ArchivoCiudadanoPorCodigo {
    Ruta: string;
    ArchivoBase64: string;
    Biblioteca: string;
    TipoDocumento: string;
    Sufijo: string;
}