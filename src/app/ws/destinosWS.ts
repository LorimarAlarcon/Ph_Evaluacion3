export interface LugarInformacionWS {
    xid: string
    name: string
}

export interface LugarWS {
    type: string
    id: string
    properties: LugarInformacionWS
}

export interface ResultadoWSSugerencias {
    type: string
    features: LugarWS[]
}

export interface DireccionWS {
    city: string
    state: string
    country: string
}

export interface PreviewWS {
    source: string
}

export interface ResultadoWSDetalles {
    xid: string
    name: string
    address: DireccionWS
    preview: PreviewWS 
}