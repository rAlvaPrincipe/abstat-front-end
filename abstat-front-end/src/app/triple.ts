export class Triple {

  constructor(
    private _subj: string,
    private _pred: string,
    private _obj: string,
    private _nsubjs: string,
    private _nobjs: string,
  ) {
  }

  get subj(): string { return this._subj; }
  set subj(value: string) { this._subj = value; }

  get pred(): string { return this._pred; }
  set pred(value: string) { this._pred = value; }

  get obj(): string { return this._obj; }
  set obj(value: string) { this._obj = value; }

  get nsubjs(): string { return this._nsubjs; }
  set nsubjs(value: string) { this._nsubjs = value; }

  get nobjs(): string { return this._nobjs; }
  set nobjs(value: string) { this._nobjs = value; }
}
