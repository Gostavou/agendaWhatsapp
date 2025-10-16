export class Contato {
  private _id!: string;
  private _nome: string;
  private _telefone: string;
  private _email!: string;
  private _genero!: string;
  private _whatsapp: boolean;

  constructor(nome: string, telefone: string) {
    this._nome = nome;
    this._telefone = telefone;
    this._whatsapp = false;
  }

  public get id(): string {
    return this._id;
  }

  public get nome(): string {
    return this._nome;
  }
  public set nome(value: string) {
    this._nome = value;
  }

  public get telefone(): string {
    return this._telefone;
  }
  public set telefone(value: string) {
    this._telefone = value;
  }

  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }

  public get genero(): string {
    return this._genero;
  }
  public set genero(value: string) {
    this._genero = value;
  }

  public get whatsapp(): boolean {
    return this._whatsapp;
  }
  public set whatsapp(value: boolean) {
    this._whatsapp = value;
  }
}
