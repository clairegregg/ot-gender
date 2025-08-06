import { ObjectId } from "mongodb";

export type OTConsideration = {
  title: string;
  short_title: string;
  contents: string;
};

export default class Surgery {
  constructor(
    public name: string,
    public primary_association: string,
    public type: string,
    public summary: string,
    public ot_considerations: OTConsideration[],
    public _id?: ObjectId
  ) {}
}
