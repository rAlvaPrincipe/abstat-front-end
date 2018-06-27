export class Resource {

  constructor(
    private _globalURL: string,
    private _freq: number) {
  }

  get globalURL(): string { return this._globalURL; }
  set globalURL(value: string) { this._globalURL = value; }

  get freq(): number { return this._freq }
  set freq(value: number) { this._freq = value; }
}
