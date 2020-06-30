interface NamedAddress {
  name: string;
  address: string;
}
export type AddressesArray = NamedAddress[];

export interface MailBuildingParams {
  from: NamedAddress;
  to: NamedAddress[];
  bcc?: NamedAddress[];
  date?: Date;
  subject?: string;
  html?: string;
  contentType?: string;
  attachments?: unknown[];
}
