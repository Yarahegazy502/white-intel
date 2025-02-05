import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  toggleAsideMenu = new Subject();
  constructor() { }
}
