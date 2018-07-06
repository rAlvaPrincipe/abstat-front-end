export class SearchResult {
  constructor(
    private _subject: string,
    private _predicate: string,
    private _object: string,
    private _type: string,
    private _subtype: string,
    private _frequency: string,
    private _dataset: string
  ){
  }

  get subject(): string {
    return this._subject;
  }

  set subject(value: string) {
    this._subject = value;
  }

  get predicate(): string {
    return this._predicate;
  }

  set predicate(value: string) {
    this._predicate = value;
  }

  get object(): string {
    return this._object;
  }

  set object(value: string) {
    this._object = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get subtype(): string {
    return this._subtype;
  }

  set subtype(value: string) {
    this._subtype = value;
  }

  get frequency(): string {
    return this._frequency;
  }

  set frequency(value: string) {
    this._frequency = value;
  }

  get dataset(): string {
    return this._dataset;
  }

  set dataset(value: string) {
    this._dataset = value;
  }

}
