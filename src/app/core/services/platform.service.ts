import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private _isNative = new BehaviorSubject<boolean>(false);
  public isNative$ = this._isNative.asObservable();
  constructor(
    private platform:Platform,
  ) {
    this._isNative.next(this.platform.is('cordova') || this.platform.is('capacitor'));
  }

}
