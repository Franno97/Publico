import { MreEnvironment } from 'src/app/models/Mre-environment';

const baseUrl = 'http://172.31.2.24';

export const environment = {
  production: false,
  application: {
    baseUrl: 'http://172.31.2.24',
    name: 'Ministerio de Relaciones Exteriores y Movilidad Humana',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'http://172.31.2.25:85',
    redirectUri: baseUrl,
    clientId: 'Public_App',
    responseType: 'code',
    scope: 'offline_access openid profile role email phone Base UnidadAdministrativa RegistroPersona Cita Notificacion Tramite',
    
    requireHttps: false,
    showDebugInformation: true,
    PostLogoutRedirectUri: baseUrl
  },
  apis: {
    default: {
      url: 'http://172.31.2.25:83',
      rootNamespace: 'Mre.Sb.Base',
    },
    RegistroPersona: {
      url: 'http://172.31.2.25:82',
      rootNamespace: 'Mre.Sb.PersonRegistration',
    },
    Cita: {
      url: 'http://172.31.2.25:91',
      rootNamespace: 'Mre.Sb.Cita',
    },
    UnidadAdministrativa: {
      url: 'http://172.31.2.25:84',
      rootNamespace: 'Mre.Sb.AdministrativeUnit',
    },
    Pago: {
      url: 'http://172.31.2.25:94',
      rootNamespace: 'Mre.Sb.Pago',
    },
    Tramite: {
      url: 'http://172.31.2.25:86',
      rootNamespace: 'Mre.Visas.Tramite',
    },
    Documento: {
      url: 'http://172.31.3.18/SharePointArchivos',
      rootNamespace: 'Mre.Visas.Documento',
    },
    Requisito: {
      url: 'http://172.31.3.18/requisitos',
      rootNamespace: 'Mre.Visas.Requisito',
    },
    SharePointMensaje: {
      url: 'http://172.31.3.18/SharePointMensajes',
      rootNamespace: 'Mre.Visas.SharePointMensaje',
    },
    Multa: {
      url: 'http://172.31.2.25:88',
      rootNamespace: 'Mre.Visas.Multa',
    },
  },

  //Establecer el site key para captcha
  captchaSiteKey: '6LeBZWwdAAAAAOxpoemopWE2St5FhWzZhjskloQG'
} as MreEnvironment;
