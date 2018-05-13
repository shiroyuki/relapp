import IVertexData from "./IVertexData";

export default interface IVertexRepository {
    findMany(criteria?: any) : Array<IVertexData>;
}