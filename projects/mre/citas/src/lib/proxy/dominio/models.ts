
export interface Descanso {
  descansos: Horario[];
}

export interface Horario {
  inicio?: string;
  fin?: string;
}

export interface PlanDiario {
  dia?: string;
  horario: Horario;
  descanso: Descanso;
}

export interface PlanSemanal {
  configuraciones: PlanDiario[];
}
