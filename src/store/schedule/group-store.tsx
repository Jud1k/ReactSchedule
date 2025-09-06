import { Group } from "@/schemas";
import { makeAutoObservable } from "mobx";

class GroupStore {
  selectedGroup: Group | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: string) {
    this.error = error;
  }

  setSelectredGroup(group: Group) {
    this.selectedGroup = group;
  }
}

export default new GroupStore();
