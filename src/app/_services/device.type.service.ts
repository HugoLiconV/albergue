import { Injectable } from '@angular/core';

@Injectable()
export class DeviceTypeService {

  private innerWidth;
  constructor() {
    this.innerWidth = window.innerWidth;
  }

  isMobile(): boolean {
    return this.checkScreenSize();
  }

  private checkScreenSize(): boolean {
    return this.innerWidth < 840;
  }
}
