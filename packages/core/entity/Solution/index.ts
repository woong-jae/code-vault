export default class Solution {
  readonly platform: string;
  readonly id: string;
  readonly code: string;
  readonly language: string;
  readonly date: Date;

  constructor({
    platform,
    id,
    code,
    language,
    date,
  }: {
    platform: string;
    id: string;
    code: string;
    language: string;
    date: Date;
  }) {
    this.id = id;
    this.platform = platform;
    this.code = code;
    this.language = language;
    this.date = date;
  }

  get key() {
    return `${this.platform}/${this.id}`;
  }
}
