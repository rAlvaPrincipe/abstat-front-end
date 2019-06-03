export class Summary {

  constructor(
    private _id: string,
    private _dsName: string,
    private _listOntNames: string[],
    private _timestamp: string,
    private _tipoMinimo: boolean,
    private _inferences: boolean,
    private _cardinalita: boolean,
    private _propertyMinimaliz: boolean,
    private _shaclValidation: boolean,
    private _loadedMongoDB: boolean,
    private _indexedSolr: boolean) {
  }

  get id(): string { return this._id; }
  set id(value: string) { this._id = value; }

  get dsName(): string { return this._dsName; }
  set dsName(value: string) { this._dsName = value; }

  get listOntNames(): string[] { return this._listOntNames; }
  set listOntNames(value: string[]) { this._listOntNames = value; }

  get timestamp(): string { return this._timestamp; }
  set timestamp(value: string) { this._timestamp = value; }

  get tipoMinimo(): boolean { return this._tipoMinimo; }
  set tipoMinimo(value: boolean) { this._tipoMinimo = value; }

  get inferences(): boolean { return this._inferences; }
  set inferences(value: boolean) { this._inferences = value; }

  get cardinalita(): boolean { return this._cardinalita; }
  set cardinalita(value: boolean) { this._cardinalita = value; }

  get propertyMinimaliz(): boolean { return this._propertyMinimaliz; }
  set propertyMinimaliz(value: boolean) { this._propertyMinimaliz = value; }

  get shaclValidation(): boolean { return this._shaclValidation; }
  set shaclValidation(value: boolean) { this._shaclValidation = value; }

  get loadedMongoDB(): boolean { return this._loadedMongoDB; }
  set loadedMongoDB(value: boolean) { this._loadedMongoDB = value; }

  get indexedSolr(): boolean { return this._indexedSolr; }
  set indexedSolr(value: boolean) { this._indexedSolr = value; }

}
