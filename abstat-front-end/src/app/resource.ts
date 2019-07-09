export class Resource {

  constructor(
    private _globalURL: string,
    private _frequency: number) {
  }

  get globalURL(): string { return this._globalURL; }
  set globalURL(value: string) { this._globalURL = value; }

  get frequency(): number { return this._frequency; }
  set frequency(value: number) { this._frequency = value; }
}
