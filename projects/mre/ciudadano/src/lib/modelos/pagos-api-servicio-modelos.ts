export interface SolicitudCalcularPagoServicio {
    id: string;
    servicioId: string;
    tieneVisa: boolean;
    edad: number;
    porcentajeDiscapacidad: number;
    idUsuario: string;
}

export interface SolicitudObtenerPagoServicio {
    idTramite: string;
    valoresMayoraCero: boolean;
    facturarEn: string;
}

export interface SolicitudGuardarFormaPagoServicio {
    id: string;
    formaPago: number;
    idUsuario: string;
    banco: string;
    numeroCuenta: string;
    tipoCuenta: string;
    titularCuenta: string;
    listaDetalle: SolicitudListaDetalle[];
}

export interface SolicitudListaDetalle {
    id: string;
    valorTotal: number;
}

export interface SolicitudRegistrarPagoServicio {
    id: string;
    idTramite: string;
    idUsuario: string;
    listaRegistroPagoDetalle: SolicitudListaRegistroPagoDetalle[];
}

export interface SolicitudListaRegistroPagoDetalle {
    id: string;
    numeroTransaccion: string;
    comprobantePago: string;
    fechaPago: Date;
}

export interface SolicitudActualizarPagoServicio {
    idPagoDetalle: string;
    claveAcceso: string;
}