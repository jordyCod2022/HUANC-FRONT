import { InterpolationConfig } from "@angular/compiler"

export interface RequestConsumo{
    tipoIdentificacion: string,
    identificacion: string
}


interface CamposComunes {
    manejoCuentasCorrientes: manejoCuentasCorrientes[],
    deudaVigenteTotal: deudaVigenteTotal[],
    gastoFinanciero: gastoFinanciero[],
    operacionesCodeudorGarante: operacionesCodeudorGarante[],
    operacionesVigentesTarjeta: operacionesVigentesTarjeta[],
    detalleTarjetaSaldoVigente: detalleTarjetaSaldoVigente[],
    indicadoresTarjeta: indicadoresTarjeta[],
    detalleTarjetaCredito: detalleTarjetaCredito[],
    operacionesVigentesBanco: operacionesVigentesBanco[],
    estructuraOperacionBancosDetalle: estructuraOperacionBancosDetalle[],
    operacionesVigentesCooperativa: operacionesVigentesCooperativa[],
    estructuraOperacionCooperativaDetalle: estructuraOperacionCooperativaDetalle[],
    operacionesVigentesEmpresa: operacionesVigentesEmpresa[],
    operacionesVigentesServicio: operacionesVigentesServicio[],
    operacionesVigentesCobranza: operacionesVigentesCobranza[],
    evolucionScoreFinanciero: evolucionScoreFinanciero[],
    semaforoMaximoDiasVencido: semaforoMaximoDiasVencido[],
    tendenciaDeuda: tendenciaDeuda[],
    indicadoresDeuda: indicadoresDeuda[],
    operacionesHistoricasTarjeta: operacionesHistoricasTarjeta[],
    operacionesHistoricasBanco: operacionesHistoricasBanco[],
    operacionesHistoricasCooperativa: operacionesHistoricasCooperativa[],
    operacionesHistoricasEmpresa: operacionesHistoricasEmpresa[],
    operacionesHistoricasServicio: operacionesHistoricasServicio[],
    operacionesHistoricasCobranza: operacionesHistoricasCobranza[],
    titularConsultado12Meses: titularConsultado12Meses[]
  }
    

  export interface ResponseConsumo extends CamposComunes {

    identificacionTitular?: identificacionTitular[],
    scoreFinanciero?: scoreFinanciero[],
    factoresScore?: factoresScore[],
    informacionComoRUC?: informacionComoRUC[],
    relacionEmpresas?: relacionEmpresas[],
    datosContacto?: datosContacto[],
    datosGeneralesEmpresa?: datosGeneralesEmpresa[],
    scoreEmpresa?: scoreEmpresa[],
    detalleEmpresa?: detalleEmpresa[],
    resumenPrincipalesCuentasFinancieras?: resumenPrincipalesCuentasFinancieras[],
    cuentasEstadosFinancieros?: cuentasEstadosFinancieros[],
    indicesFinancieros?: indicesFinancieros[],
    principalesAccionistas?: principalesAccionistas[],
    representantesLegales?: representantesLegales[],
    contactabilidad?: contactabilidad[]
  }

export interface identificacionTitular{
    tipoIdentificacionSujetoDescripcion:string,
    identificacionSujeto:string,
    nombreRazonSocial:string

}

export interface datosGeneralesEmpresa{
    tipoIdentificacionSujetoDescripcion:string,
    identificacionSujeto:string,
    nombreRazonSocial:string,
    tipoCompania:string,
    fechaConstitucion:string,
    objetoSocial:string,
    estadoSocial:string
}

export interface scoreFinanciero{
    score:number;
    clientesPeorScore:number,
    tasaMalos:string
}


export interface factoresScore{
    factor:string,
    valor:number,
    efecto:string
}

export interface scoreEmpresa{
    scoreEmpresa:number,
    empresasPeorScore:number,
    tasaMalos:string

}

export interface manejoCuentasCorrientes{
    tiempoInhabilitadoDescripcion:string,
    fechaInhabilitado:string,
    fechaCumplimientoSancion:string,
    accionDescripcion:string,
    motivoInhabilitadoDescripcion:string
}

export interface deudaVigenteTotal{
    sistemaCrediticio:string,
    valorPorVencer:number,
    noDevengaIntereses:number,
    valorVencido:number,
    valorDemandaJudicial:number,
    carteraCastigada:number,
    totalDeuda:number
}

export interface gastoFinanciero{
    cuotaEstimadaTitular:number,
    cuotaTotalOperaciones:number,
    cuotaTotalTarjeta:number,
    cuotaTotalServicios:number,
    cuotaVencidos:number,
    numOperacionesExcluidasCuota:number,
    saldoExcluidoCuota:number
}

export interface operacionesCodeudorGarante{
    identificacionTitular:string,
    nombreRazonSocial:string,
    tipoDeudorDescripcion:string,
    fechaCorte:string
}

export interface informacionComoRUC{
    identificacionSujeto:string,
    nombreRazonSocial:string,
    tipoRelacion:string
}

export interface operacionesVigentesTarjeta{
    fechaCorte:string,
    sistemaCrediticio:string,
    clasificacion:string,
    marcaTarjeta:string,
    codigoInstitucionFinanciera:string,
    razonSocial:string,
    marcaTarjetaDescripcion:string,
    rankingTarjetas:string,
    porcentajeUso:string,
    cupoTarjeta:number,
    capitalConsumo:number,
    saldoTotal:number,
    capitalxVencerTotal:number,
    saldoVencido:number,
    valorNoDevengaInteresTotal:number,
    valorDemandaJudicial:number,
    carteraCastigada:number,
    diasMorosidad:number,
    valorPagado:number,
    valorMinimoPagar:number,
    cuotaEstimadaTarjetas:number
}

export interface detalleTarjetaSaldoVigente{
    fechaCorte:string,
    razonSocial:string,
    marcaTarjetaDescripcion:string,
    antiguedadTarjetaMeses:number,
    fechaVencimiento:string,
    fechaCancelacion:string,
    peorEdadVencidoTarjetas:string

}

export interface indicadoresTarjeta{
    numTarjetasVigentes:number,
}

export interface detalleTarjetaCredito{
    fechaCorte:string,
    sistemaCrediticio:string,
    clasificación:string,
    codigoInstitucionFinanciera:string,
    marcaTarjeta:string,
    tipoIdentificacionSujeto:string,
    identificacionSujeto:string,
    razonSocial:string,
    numeroTarjeta:string,
    marcaTarjetaDescripcion:string,
    tipoCreditoDescripcion:string,
    claseTarjetaDescripcion:string,
    formaPagoDescripcion:string,
    fechaEmisión:string,
    fechaVencimiento:string,
    fechaCancelacion:string,
    estadoOperacionDescripcion:string,
    saldoTotal:number,
    capitalxVencerTotal:number,
    saldoVencido:number,
    valorNoDevengaInteresTotal:number,
    valorDemandaJudicial:number,
    carteraCastigada:number,
    diasMorosidad:number,
    capitalxVencer1a30:number,
    capitalxVencer31a90:number,
    capitalxVencer91a180:number,
    capitalxVencer181a360:number,
    capitalxVencerMas360:number,
    valorNoDevengaInteres1a30:number,
    valorNoDevengaInteres31a90:number,
    valorNoDevengaInteres91a180:number,
    valorNoDevengaInteres181a360:number,
    valorNoDevengaInteresMas360:number,
    capitalVencido1a30:number,
    capitalVencido31a90:number,
    capitalVencido91a180:number,
    capitalVencido181a360:number,
    capitalVencidoMas360:number,
    capitalVencido181a270:number,
    capitalVencidoMas270:number,
    interesVencido1a30:number,
    interesVencido31a60:number,
    interesVencido61a90:number,
    interesVencido91a180:number,
    interesVencido181a270:number,
    interesVencidoMas270:number,
    interesSobreMora:number,
    totalCostoOperativoVencido:number,
    valorPagado:number,
    valorMinimoPagar:number

}


export interface operacionesVigentesBanco{
    sistemaCrediticio:string,
    codigoInstitucionFinanciera:string,
    fechaCorte:string,
    razonSocial:string,
    tipoDeudorDescripcion:string,
    tipoCreditoDescripcion:string,
    numeroOperacion:string,
    valorOperacion:number,
    plazoXOperacion:number,
    plazoXOpPendiente:number,
    saldoTotalCalculado:number,
    valorxVencerTotal:number,
    valorVencidoTotal:number,
    valorNoDevengaInteresTotal:number,
    valorDemandaJudicial:number,
    carteraCastigada:number,
    diasMorosidad:number,
    cuotaEstimadaOperacion:number

}

export interface estructuraOperacionBancosDetalle {
    fechaCorte: string,
    clasificación: string,
    codigoInstitucionFinanciera: string,
    sistemaCrediticio: string,
    tipoIdentificacionSujetoDescripcion: string,
    tipoIdentificacionSujeto: string,
    identificacionSujeto: string,
    razonSocial: string,
    tipoDeudorDescripcion: string,
    tipoCreditoDescripcion: string,
    numeroOperacion: string,
    tipoOperacionDescripcion: string,
    fechaConcesion: string,
    fechaVencimiento: string,
    fechaCancelacion: string,
    estadoOperacionDescripcion: string,
    situacionOperacionDescripcion: string,
    valorOperacion: number,
    saldoTotalCalculado: number,
    valorxVencerTotal: number,
    valorVencidoTotal: number,
    valorNoDevengaInteresTotal: number,
    valorDemandaJudicial: number,
    carteraCastigada: number,
    diasMorosidad: number,
    valorxVencer1a30: number,
    valorxVencer31a90: number,
    valorxVencer91a180: number,
    valorxVencer181a360: number,
    valorxVencerMas360: number,
    valorNoDevengaInteres1a30: number,
    valorNoDevengaInteres31a90: number,
    valorNoDevengaInteres91a180: number,
    valorNoDevengaInteres181a360: number,
    valorNoDevengaInteresMas360: number,
    valorVencido1a30: number,
    valorVencido31a90: number,
    valorVencido91a180: number,
    valorVencido181a360: number,
    valorVencidoMas360: number,
    valorVencido181a270: number,
    valorVencidoMas270: number,
    valorVencido91a270: number,
    valorVencido271a360: number,
    valorVencido361a720: number,
    valorVencidoMas720: number
}

export interface operacionesVigentesCooperativa {
    sistemaCrediticio: string,
    codigoInstitucionFinanciera: string,
    fechaCorte: string,
    razonSocial: string,
    tipoDeudorDescripcion: string,
    tipoCreditoDescripcion: string,
    numeroOperacion: string,
    valorOperacion: number,
    plazoXOperacion: number,
    plazoXOpPendiente: number,
    saldoTotalCalculado: number,
    valorxVencerTotal: number,
    valorVencidoTotal: number,
    valorNoDevengaInteresTotal: number,
    valorDemandaJudicial: number,
    carteraCastigada: number,
    peorEdadVenXOp119: string,
    diasMorosidad: number,
    cuotaEstimadaOperacion: number
}

export interface estructuraOperacionCooperativaDetalle {
    fechaCorte: string,
    clasificación: string,
    sistemaCrediticio: string,
    codigoInstitucionFinanciera: string,
    tipoIdentificacionSujetoDescripcion: string,
    tipoIdentificacionSujeto: string,
    identificacionSujeto: string,
    razonSocial: string,
    tipoDeudorDescripcion: string,
    tipoCreditoDescripcion: string,
    numeroOperacion: string,
    tipoOperacionDescripcion: string,
    fechaConcesion: string,
    fechaVencimiento: string,
    fechaCancelacion: string,
    estadoOperacionDescripcion: string,
    situacionOperacionDescripcion: string,
    valorOperacion: number,
    saldoTotalCalculado: number,
    valorxVencerTotal: number,
    valorVencidoTotal: number,
    valorNoDevengaInteresTotal: number,
    valorDemandaJudicial: number,
    carteraCastigada: number,
    diasMorosidad: number,
    valorxVencer1a30: number,
    valorxVencer31a90: number,
    valorxVencer91a180: number,
    valorxVencer181a360: number,
    valorxVencerMas360: number,
    valorNoDevengaInteres1a30: number,
    valorNoDevengaInteres31a90: number,
    valorNoDevengaInteres91a180: number,
    valorNoDevengaInteres181a360: number,
    valorNoDevengaInteresMas360: number,
    valorVencido1a30: number,
    valorVencido31a90: number,
    valorVencido91a180: number,
    valorVencido181a360: number,
    valorVencidoMas360: number,
    valorVencido181a270: number,
    valorVencidoMas270: number,
    valorVencido91a270: number,
    valorVencido271a360: number,
    valorVencido361a720: number,
    valorVencidoMas720: number
}

export interface operacionesVigentesEmpresa{
    fechaCorte:string,
    tipoEntidad:string,
    razonSocial:string,
    tipoDeudorDescripcion:string,
    numeroOperacion:string,
    valorOperacion:number,
    plazoXOperacion:number,
    plazoXOpPendiente:number,
    saldoTotalCalculado:number,
    valorxVencerTotal:number,
    valorVencidoTotal:number,
    valorNoDevengaInteresTotal:number,
    valorDemandaJudicial:number,
    carteraCastigada:number,
    diasVencido:number,
    cuotaEstimadaOperacion:number

}

export interface operacionesVigentesServicio{
    fechaCorte:string,
    razonSocial:string,
    tipoServicioDescripcion:string,
    estadoServicioDescripcion:string,
    codigoServicioContrato:string,
    cuotaEstimadaOperacion:number,
    valorPorVencer:number,
    totalDeuda:number,
    valorVencido:number,
    numeroDiasVencido:number

}

export interface operacionesVigentesCobranza{
    fechaCorte:string,
    nombreCasaCobranza:string,
    numeroOperacion:string,
    montoInicialCasaCobranza:number,
    plazoOriginal:number,
    saldoDeuda:number,
    valorPorVencer:number,
    valorVencido:number,
    valorNoDevengaInteres:number,
    demandaJudicial:number,
    carteraCastigada:number,
    numeroDiasVencido:number,
    cuotaEstimadaOperacion:number
}

export interface evolucionScoreFinanciero{
    fechaCorte:string,
    diasVencido:string,
    ejeY:number,
    ejeX:number,
    radio:number,
    color:string
}

export interface semaforoMaximoDiasVencido{
    fechaCorte:string,
    diasVencido: string,
    ejeY:number,
    ejeX:number,
    radio:number,
    color:string
}

export interface tendenciaDeuda{
    fechaCorte:string,
    totalDeuda:number,
    valorVencidoTotal:number
}

export interface indicadoresDeuda{
    saldoPromedio36M:number,
    saldoPromedioTarjetas36M:number,
    maxMontoDeuda:number,
    peorEdadVencidoDirecta36M:string,
    maySaldoVencDirecta36M:number,
    fechaUltimoVencido:string

}

export interface operacionesHistoricasTarjeta{
    clasificación:string,
    sistemaCrediticio:string
    codigoInstitucionFinanciera:string,
    marcaTarjeta:string,
    numeroTarjeta:string,
    fechaCorte:string,
    razonSocial:string,
    marcaTarjetaDescripcion:string,
    rankingTarjetas:number,
    porcentajeUso:number,
    cupoTarjeta:number,
    capitalConsumo:number,
    saldoTotal:number,
    capitalxVencerTotal:number,
    saldoVencido:number,
    valorNoDevengaInteresTotal:number,
    valorDemandaJudicial:number,
    carteraCastigada:number,
    diasMorosidad:number,
    valorPagado:number,
    valorMinimoPagar:number,
    cuotaEstimadaTarjetas:number
}

export interface operacionesHistoricasBanco{
    codigoInstitucionFinanciera:string,
    sistemaCrediticio:string,
    fechaCorte:string,
    razonSocial:string,
    tipoDeudorDescripcion:string,
    tipoCreditoDescripcion:string,
    numeroOperacion:string,
    saldoTotalCalculado:number,
    valorxVencerTotal:number,
    valorVencidoTotal:number,
    valorNoDevengaInteresTotal:number,
    valorDemandaJudicial:number,
    carteraCastigada:number,
    plazoXOpPendiente:number,
    diasMorosidad:number,
    cuotaEstimadaOperacion:number

}

export interface operacionesHistoricasCooperativa{
    sistemaCrediticio:string,
    codigoInstitucionFinanciera:string,
    fechaCorte:string,
    razonSocial:string,
    tipoDeudorDescripcion:string,
    tipoCreditoDescripcion:string,
    numeroOperacion:string,
    saldoTotalCalculado:number,
    valorxVencerTotal:number,
    valorVencidoTotal:number,
    valorNoDevengaInteresTotal:number,
    valorDemandaJudicial:number,
    carteraCastigada:number
    plazoXOpPendiente:number
    peorEdadVenXOp119:string,
    diasMorosidad:number,
    cuotaEstimadaOperacion:number
}

export interface operacionesHistoricasEmpresa{
    fechaCorte:string,
    razonSocial:string,
    tipoDeudorDescripcion:string,
    numeroOperacion:string,
    saldoTotalCalculado:number,
    valorxVencerTotal:number,
    valorVencidoTotal:number,
    valorNoDevengaInteresTotal:number,
    valorDemandaJudicial:number,
    carteraCastigada:number,
    diasVencido:number,
    cuotaEstimadaOperacion:number

}

export interface operacionesHistoricasServicio{

    fechaCorte:string,
    razonSocial:string,
    tipoServicioDescripcion:string
    codigoServicioContrato:string,
    estadoServicioDescripcion:string,
    cuotaEstimadaOperacion:number,
    totalDeuda:number,
    valorVencido:number,
    numeroDiasVencido:number

}

export interface operacionesHistoricasCobranza{
    fechaCorte: string,
    nombreCasaCobranza:string,
    numeroOperacion:string,
    montoInicialCasaCobranza:number,
    plazoOriginal:number,
    saldoDeuda:number,
    valorPorVencer:number,
    valorVencido:number,
    valorNoDevengaInteres:number,
    demandaJudicial:number,
    carteraCastigada:number,
    numeroDiasVencido:number,
    cuotaEstimadaOperacion:number
}

export interface relacionEmpresas{
    identificacionEmpresa:string,
    nombreRazonSocial:string,
    tipoRelacion:string
}

export interface detalleEmpresa{
    actividadEconomicaN3Descripcion:string,
    capitalSuscrito:number,
    antiguedad:number,
    nombreGrupoEconomico:string,
    numeroEmpleados:string,
    numeroEmpleadosDirectivos:number,
    numeroEmpleadosAdministrativos:number,
    numeroEmpleadosProduccion:number,
    numeroEmpleadosOtros:number,
    numeroTotalEmpleados:number,
    companiaConInversionExtrangeraDirecta:string,
    perteneceMercadoValores:string

}

export interface resumenPrincipalesCuentasFinancieras{
    cuenta:string,
    anioActualMenos5:string,
    anioActualMenos4:string,
    anioActualMenos3:string,
    anioActualMenos2:string,
    anioActualMenos1:string
}

export interface cuentasEstadosFinancieros{
    cuenta:string,
    anioActualMenos5:string,
    anioActualMenos4:string,
    anioActualMenos3:string,
    anioActualMenos2:string,
    anioActualMenos1:string
}

export interface indicesFinancieros{
    tipoIndice:string,
    nombreIndice:string,
    anioActualMenos5:string,
    anioActualMenos4:string,
    anioActualMenos3:string,
    anioActualMenos2:string,
    anioActualMenos1:string

}


export interface principalesAccionistas{
    identificacionSujeto:string,
    nombre:string,
    participacion:number
}

export interface representantesLegales{
    identificacionSujeto:string,
    nombre:string,
    cargo:string
}

export interface datosContacto{
    telefonoCelular:string,
    ciudadDescripcion:string,
    sector:string,
    direccionCompleta:string,
    numeracion:string,


}


export interface contactabilidad{
    provinciaDescripcion:string,
    ciudadDescripcion:string,
    telefono1:string,
    email1:string,
    sector:string,
    callePrincipal:string,
    numeracion:string,
    calleSecundaria:string,
    referencia:string,
    paginaWeb:string

}

export interface titularConsultado12Meses{
    fechaConsulta:string,
    nombreComercial:string,
    nombreUsuario:string
}