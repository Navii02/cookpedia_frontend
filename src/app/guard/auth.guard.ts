import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
const router=Inject(Router)
if(sessionStorage.getItem('token')){
  return true;
}else{
  alert('Unauthorized Access Detected.... Please Login First')
  router.navigateByUrl('/login')
  return false;
}


};
