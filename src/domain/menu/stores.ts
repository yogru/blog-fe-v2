import {makeAutoObservable} from "mobx";


export class MenuStore {
    constructor() {
        makeAutoObservable(this)
    }

}

const menuStore = new MenuStore()
export default menuStore