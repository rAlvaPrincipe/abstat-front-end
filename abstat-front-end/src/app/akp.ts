import {Resource} from './resource';

export class Akp {

  constructor(
    private _subject: Resource,
    private _predicate: Resource,
    private _object: Resource,
    private _type: string,
    private _subType: string,
    private _datasetOfOrigin: string,
    private _ontologyOfOrigin: string,
    private _frequency: number,
    private _numberOfInstances: number,
    private _cardinality1: number,
    private _cardinality2: number,
    private _cardinality3: number,
    private _cardinality4: number,
    private _cardinality5: number,
    private _cardinality6: number) {
  }

  get subject(): Resource { return this._subject; }
  set subject(value: Resource) { this._subject = value; }

  get predicate(): Resource { return this._predicate; }
  set predicate(value: Resource) { this._predicate = value; }

  get object(): Resource { return this._object; }
  set object(value: Resource) { this._object = value; }

  get type(): string { return this._type; }
  set type(value: string) { this._type = value; }

  get subType(): string { return this._subType; }
  set subType(value: string) { this._subType = value; }

  get datasetOfOrigin(): string { return this._datasetOfOrigin; }
  set datasetOfOrigin(value: string) { this._datasetOfOrigin = value; }

  get ontologyOfOrigin(): string { return this._ontologyOfOrigin; }
  set ontologyOfOrigin(value: string) { this._ontologyOfOrigin = value; }

  get frequency(): number { return this._frequency; }
  set frequency(value: number) { this._frequency = value; }

  get numberOfInstances(): number { return this._numberOfInstances; }
  set numberOfInstances(value: number) { this._numberOfInstances = value; }

  get cardinality1(): number { return this._cardinality1; }
  set cardinality1(value: number) { this._cardinality1 = value; }

  get cardinality2(): number { return this._cardinality2; }
  set cardinality2(value: number) { this._cardinality2 = value; }

  get cardinality3(): number { return this._cardinality3; }
  set cardinality3(value: number) { this._cardinality3 = value; }

  get cardinality4(): number { return this._cardinality4; }
  set cardinality4(value: number) { this._cardinality4 = value; }

  get cardinality5(): number { return this._cardinality5; }
  set cardinality5(value: number) { this._cardinality5 = value; }

  get cardinality6(): number { return this._cardinality6; }
  set cardinality6(value: number) { this._cardinality6 = value; }
}
