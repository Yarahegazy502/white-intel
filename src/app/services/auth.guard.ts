import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('token')){
    return true;
  }
  inject(Router).navigate(['/Login'])
  return false;
};
