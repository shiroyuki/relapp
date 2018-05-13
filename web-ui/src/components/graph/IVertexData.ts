export default interface IVertexData {
    getId() : any;
    getPriority() : number; // higher number means higher priority
    setPriority(newPriority: number): void;
}