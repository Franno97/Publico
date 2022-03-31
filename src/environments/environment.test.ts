import { MreEnvironment } from 'src/app/models/Mre-environment';

const baseUrl = 'http://localhost';

export const environment = {
  production: false,
  application: {
    baseUrl: 'http://localhost',
    name: 'Ministerio de Relaciones Exteriores y Movilidad Humana',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'http://localhost:91',
    redirectUri: baseUrl,
    clientId: 'Public_App',
    responseType: 'code',
    scope: 'offline_access openid profile role email phone Base UnidadAdministrativa RegistroPersona Cita Notificacion Tramite',
    
    requireHttps: false,
    showDebugInformation: true
  },
  apis: {
    default: {
      url: 'http://localhost:92',
      rootNamespace: 'Mre.Sb.Base',
    },
    PersonRegistration: {
      url: 'http://localhost:94',
      rootNamespace: 'Mre.Sb.PersonRegistration',
    },
    Cita: {
      url: 'http://172.31.3.40:91',
      rootNamespace: 'Mre.Sb.Cita',
    },
    UnidadAdministrativa: {
      url: 'http://172.31.3.40:84',
      rootNamespace: 'Mre.Sb.AdministrativeUnit',
    },
    Pago: {
      url: 'http://172.31.3.40:94',
      rootNamespace: 'Mre.Sb.Pago',
    },
    Tramite: {
      url: 'http://172.31.3.40:86',
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
      url: 'http://172.31.3.40:88',
      rootNamespace: 'Mre.Visas.Multa',
    },
  },

  //Establecer el site key para captcha
  captchaSiteKey: '6LeBZWwdAAAAAOxpoemopWE2St5FhWzZhjskloQG'
} as MreEnvironment;
