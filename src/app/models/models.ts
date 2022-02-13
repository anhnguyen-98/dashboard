export class AverageData {
    mean: number;
    name: string;
    unit: string;

    constructor(name = '', unit = '', mean: number) {
        this.name = name;
        this.unit = unit;
        this.mean = mean;
    }
}

export class GraphData {
    time: Date;
    data: number;
    sensor: string;
    station: string

    constructor(time: Date, data: number, sensor: string, station: string) {
        this.time = time;
        this.sensor = sensor;
        this.data = data;
        this.station = station;
    }
}

export class Station {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}

export interface GraphDataApi {
    name: string;
    unit?: string;
    dataArray: GraphData[];
}
