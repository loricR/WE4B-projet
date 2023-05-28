import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GamefullService {

  constructor(private router: Router) { }

  eventClose(modalElement: any) {
    modalElement.addEventListener('hidden.bs.modal', () => {  //When the modal is closed
      this.router.navigate(['/', 'store'])  //Go back to the store
    });
  }

  showModal(modalElement: any, body: any) {
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
    modalElement.setAttribute('role', 'dialog');
    modalElement.setAttribute('aria-modal', 'true');
    modalElement.removeAttribute('aria-hidden');
    body.classList.add('modal-open');
    body.style.overflow = 'hidden';
    body.style.paddingRight = '0px';
  }
}
