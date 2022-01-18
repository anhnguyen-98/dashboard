export class SensorData {
    sensor: string;
    value: string;
    timestamp: string;
    unit: string;

    constructor(sensor: string, value: string, timestamp: string, unit: string) {
        this.sensor = sensor;
        this.value = value;
        this.timestamp = timestamp;
        this.unit = unit;
    }
}

export class PM {
    time: Date;
    data: number;
    sensor: string;
    station: string;
    units: string;

    constructor(time: Date, data: number, sensor: string, station: string, units: string) {
        this.time = time;
        this.sensor = sensor;
        this.data = data;
        this.station = station;
        this.units = units;
    }
}

export class Humidity {
    time: Date;
    data: number;
    sensor: string;
    station: string;
    units: string;

    constructor(time: Date, data: number, sensor: string, station: string, units: string) {
        this.time = time;
        this.sensor = sensor;
        this.data = data;
        this.station = station;
        this.units = units;
    }
}

export class Station {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

