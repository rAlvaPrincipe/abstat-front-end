export class Dataset {

  constructor(
    private _id: string,
    private _name: string,
    private _timestamp: string,
    private _server: string
  ) {
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }

  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }

  get timestamp(): string { return this._timestamp; }
  set timestamp(value: string) { this._timestamp = value; }

  get server(): string { return this._server; }
  set server(value: string) { this._server = value; }
}
