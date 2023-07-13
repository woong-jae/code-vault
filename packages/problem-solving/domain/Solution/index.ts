export default class Solution {
  readonly problemId: string;
  readonly platform: string;
  readonly language: string;
  readonly date: Date;
  code: string;

  constructor({
    problemId,
    platform,
    language,
    code,
    date,
  }: {
    problemId: string;
    platform: string;
    language: string;
    code: string;
    date: Date;
  }) {
    this.problemId = problemId;
    this.platform = platform;
    this.language = language;
    this.code = code;
    this.date = date;
  }

  get key() {
    return `${this.platform}/${this.problemId}`;
  }
}
