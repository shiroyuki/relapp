import IVertexData from "../../graph/IVertexData";
import IVertexRepository from "../../graph/IVertexRepository"

class Person implements IVertexData {
    private id: string;
    private name: string;
    private priority: number;

    constructor(id: string, name: string, priority: number = 0) {
        this.id = id;
        this.name = name;
        this.priority = priority;
    }

    getId(): any {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPriority() {
        return this.priority;
    }

    setPriority(newPriority: number): void {
        this.priority = newPriority;
    }
}

export default class PersonRepository implements IVertexRepository {
    findMany(criteria?: any): Array<IVertexData> {
        return [
            new Person("ABC", "Kanata Iwata", 2),
            new Person("DEF", "Koichi Nakayama", 1),
        ];
    }
}