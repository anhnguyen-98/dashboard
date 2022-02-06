export class AverageData {
    time: Date;
    mean: number;
    name: string;
    unit: string;

    constructor(mean: number, name = '', unit = '', 
    time = '2021-12-11T23:00:22.000Z' as unknown as Date,) {
        this.time = time;
        this.mean = mean;
        this.name = name;
        this.unit = unit;
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

