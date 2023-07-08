export default class Solution {
  readonly platform: string;
  readonly id: string;
  readonly code: string;
  readonly language: string;

  constructor({
    platform,
    id,
    code,
    language,
  }: {
    platform: string;
    id: string;
    code: string;
    language: string;
  }) {
    this.id = id;
    this.platform = platform;
    this.code = code;
    this.language = language;
  }
}
