import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { DeveloperComponent } from 'src/app/developer/developer.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user: User = new User(); // Instanciez un nouvel utilisateur

  createUser() {
    if (this.user.password != this.user.password2) {
      alert("Les mots de passe ne sont pas identiques");
    }
    else if (this.user.password.length < 8) {
      alert("Le mot de passe doit contenir au moins 8 caractères");
    }

    //utiliser le backend pour créer un utilisateur


  }

  LoginUser() {
    if (this.user.password != this.user.password2) {
      alert("Les mots de passe ne sont pas identiques");
    }
    else {
      // vérifier que l'utilisateur existe, si oui, le connecter et le rediriger vers la page d'accueil
    }

  }

}
