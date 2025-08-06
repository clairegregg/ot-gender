import { ObjectId } from "mongodb";

export default class Welcome {
  constructor(
    public title: string,
    public text: string,
    public icons: string[],
    public _id?: ObjectId
  ) {}
}
