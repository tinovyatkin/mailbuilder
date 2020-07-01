interface NamedAddress {
  name?: string;
  address: string;
}
export type AddressesArray = NamedAddress[];

export interface MailBuildingParams {
  from: NamedAddress | string;
  to: AddressesArray | string;
  bcc?: AddressesArray | string;
  date?: Date;
  subject?: string;
  html?: string;
  contentType?: string;
  attachments?: unknown[];
}
