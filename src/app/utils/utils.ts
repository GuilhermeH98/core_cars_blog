export class Utils{

    constructor() {}

    static removeArrayItem(item: any, arrayList: any){
        arrayList.splice(arrayList.indexOf(item), 1);
    }
}

