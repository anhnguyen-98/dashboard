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