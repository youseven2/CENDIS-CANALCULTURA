export interface OrgNode {
  id: string;
  dependencyEs: string;
  dependencyEn: string;
  roleTypeEs: string;
  roleTypeEn: string;
  holder: string;
  isVacant?: boolean;
  level: 'rector' | 'superior' | 'apoyo' | 'direccion' | 'asesoria' | 'coordinacion';
  children?: OrgNode[];
}

export interface TextualDependency {
  id: string;
  dependencyEs: string;
  dependencyEn: string;
  entries: {
    cargoEs: string;
    cargoEn: string;
    holder: string;
    isVacant?: boolean;
  }[];
}

export const ORG_HIERARCHY: OrgNode = {
  id: 'mincultura',
  dependencyEs: 'MINISTERIO DEL PODER POPULAR PARA LA CULTURA',
  dependencyEn: "MINISTRY OF PEOPLE'S POWER FOR CULTURE",
  roleTypeEs: 'Ente Rector',
  roleTypeEn: 'Governing Body',
  holder: 'ALEJANDRO LÓPEZ',
  level: 'rector',
  children: [
    {
      id: 'consejo-directivo',
      dependencyEs: 'CONSEJO DIRECTIVO',
      dependencyEn: 'BOARD OF DIRECTORS',
      roleTypeEs: 'Órgano Superior',
      roleTypeEn: 'Supreme Body',
      holder: 'CARGO VACANTE / SIN ASIGNAR',
      isVacant: true,
      level: 'superior',
      children: [
        {
          id: 'atencion-ciudadano',
          dependencyEs: 'OFICINA DE ATENCIÓN AL CIUDADANO',
          dependencyEn: 'CITIZEN SERVICE OFFICE',
          roleTypeEs: 'Oficina de Apoyo',
          roleTypeEn: 'Support Office',
          holder: 'CARGO VACANTE / SIN ASIGNAR',
          isVacant: true,
          level: 'apoyo',
        },
        {
          id: 'auditoria-interna',
          dependencyEs: 'AUDITORÍA INTERNA',
          dependencyEn: 'INTERNAL AUDIT',
          roleTypeEs: 'Control Interno',
          roleTypeEn: 'Internal Control',
          holder: 'CARGO VACANTE / SIN ASIGNAR',
          isVacant: true,
          level: 'apoyo',
        },
        {
          id: 'presidencia',
          dependencyEs: 'PRESIDENCIA',
          dependencyEn: 'PRESIDENCY',
          roleTypeEs: 'Alta Dirección',
          roleTypeEn: 'Senior Management',
          holder: 'MIQUEAS FIGUEROA',
          level: 'direccion',
          children: [
            {
              id: 'direccion-ejecutiva',
              dependencyEs: 'DIRECCIÓN EJECUTIVA',
              dependencyEn: 'EXECUTIVE DIRECTORATE',
              roleTypeEs: 'Alta Dirección / Dirección',
              roleTypeEn: 'Executive Management',
              holder: 'MORRIS LÓPEZ',
              level: 'direccion',
              children: [
                {
                  id: 'consultoria-juridica',
                  dependencyEs: 'CONSULTORÍA JURÍDICA',
                  dependencyEn: 'LEGAL COUNSEL',
                  roleTypeEs: 'Asesoría',
                  roleTypeEn: 'Advisory',
                  holder: 'CARGO VACANTE / SIN ASIGNAR',
                  isVacant: true,
                  level: 'asesoria',
                },
                {
                  id: 'comunicacion',
                  dependencyEs: 'COORDINACIÓN DE COMUNICACIÓN Y RELACIONES INSTITUCIONALES',
                  dependencyEn: 'COMMUNICATION & INSTITUTIONAL RELATIONS COORDINATION',
                  roleTypeEs: 'Coordinación',
                  roleTypeEn: 'Coordination',
                  holder: 'GRISEL MIJARES',
                  level: 'asesoria',
                },
                {
                  id: 'gestion-interna',
                  dependencyEs: 'COORDINACIÓN GENERAL DE GESTIÓN INTERNA',
                  dependencyEn: 'GENERAL INTERNAL MANAGEMENT COORDINATION',
                  roleTypeEs: 'Coordinación General',
                  roleTypeEn: 'General Coordination',
                  holder: 'KATIE MUJICA',
                  level: 'coordinacion',
                  children: [
                    {
                      id: 'admin-finanzas',
                      dependencyEs: 'COORDINACIÓN DE ADMINISTRACIÓN Y FINANZAS',
                      dependencyEn: 'ADMINISTRATION & FINANCE COORDINATION',
                      roleTypeEs: 'Coordinación',
                      roleTypeEn: 'Coordination',
                      holder: 'CARGO VACANTE / SIN ASIGNAR',
                      isVacant: true,
                      level: 'coordinacion',
                    },
                    {
                      id: 'planificacion',
                      dependencyEs: 'COORDINACIÓN DE PLANIFICACIÓN Y PRESUPUESTO',
                      dependencyEn: 'PLANNING & BUDGET COORDINATION',
                      roleTypeEs: 'Coordinación',
                      roleTypeEn: 'Coordination',
                      holder: 'KAREN COELO',
                      level: 'coordinacion',
                    },
                    {
                      id: 'rrhh',
                      dependencyEs: 'COORDINACIÓN DE RECURSOS HUMANOS',
                      dependencyEn: 'HUMAN RESOURCES COORDINATION',
                      roleTypeEs: 'Coordinación',
                      roleTypeEn: 'Coordination',
                      holder: 'YSABEL BOMPART',
                      level: 'coordinacion',
                    },
                    {
                      id: 'tecnologia',
                      dependencyEs: 'COORDINACIÓN DE TECNOLOGÍA E INFORMÁTICA',
                      dependencyEn: 'TECHNOLOGY & IT COORDINATION',
                      roleTypeEs: 'Coordinación',
                      roleTypeEn: 'Coordination',
                      holder: 'ROMEL SUCHMOLIN',
                      level: 'coordinacion',
                    },
                  ],
                },
                {
                  id: 'estrategica',
                  dependencyEs: 'COORDINACIÓN GENERAL ESTRATÉGICA',
                  dependencyEn: 'GENERAL STRATEGIC COORDINATION',
                  roleTypeEs: 'Coordinación General',
                  roleTypeEn: 'General Coordination',
                  holder: 'DANIEL TORREALBA',
                  level: 'coordinacion',
                  children: [
                    {
                      id: 'produccion-artistica',
                      dependencyEs: 'COORDINACIÓN DE PRODUCCIÓN ARTÍSTICA',
                      dependencyEn: 'ARTISTIC PRODUCTION COORDINATION',
                      roleTypeEs: 'Coordinación',
                      roleTypeEn: 'Coordination',
                      holder: 'CARGO VACANTE / SIN ASIGNAR',
                      isVacant: true,
                      level: 'coordinacion',
                    },
                  ],
                },
                {
                  id: 'operaciones',
                  dependencyEs: 'COORDINACIÓN GENERAL DE OPERACIONES',
                  dependencyEn: 'GENERAL OPERATIONS COORDINATION',
                  roleTypeEs: 'Coordinación General',
                  roleTypeEn: 'General Coordination',
                  holder: 'FREDDY FRANQUIZ',
                  level: 'coordinacion',
                  children: [
                    {
                      id: 'produccion-industrial',
                      dependencyEs: 'COORDINACIÓN DE PRODUCCIÓN INDUSTRIAL',
                      dependencyEn: 'INDUSTRIAL PRODUCTION COORDINATION',
                      roleTypeEs: 'Coordinación',
                      roleTypeEn: 'Coordination',
                      holder: 'CARGO VACANTE / SIN ASIGNAR',
                      isVacant: true,
                      level: 'coordinacion',
                    },
                    {
                      id: 'comercializacion',
                      dependencyEs: 'COORDINACIÓN DE COMERCIALIZACIÓN',
                      dependencyEn: 'COMMERCIALIZATION COORDINATION',
                      roleTypeEs: 'Coordinación',
                      roleTypeEn: 'Coordination',
                      holder: 'CARGO VACANTE / SIN ASIGNAR',
                      isVacant: true,
                      level: 'coordinacion',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export function flattenOrgNodes(node: OrgNode): TextualDependency[] {
  const result: TextualDependency[] = [
    {
      id: node.id,
      dependencyEs: node.dependencyEs,
      dependencyEn: node.dependencyEn,
      entries: [
        {
          cargoEs: node.roleTypeEs,
          cargoEn: node.roleTypeEn,
          holder: node.holder,
          isVacant: node.isVacant,
        },
      ],
    },
  ];
  if (node.children) {
    for (const child of node.children) {
      result.push(...flattenOrgNodes(child));
    }
  }
  return result;
}
