import User from "~/entity/User";

export default class GithubUser implements User {
  readonly name: string;
  constructor({ name }: { name: string }) {
    this.name = name;
  }
}