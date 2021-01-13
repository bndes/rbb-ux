import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RbblibService {
  public static serverUrl: string = environment.serverUrl;
  
  constructor() { }
}
