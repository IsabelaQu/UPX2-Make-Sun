import { Component } from '@angular/core';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    username: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    address: {
      cep: '',
      number: '',
      complement: '',
    },
  };

  constructor(private userService: UserService) {}

  onSubmit() {
    // Validação adicional pode ser feita aqui
    this.userService.registerUser(this.user).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso!', response);
        alert('Registro concluído com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao registrar usuário', err);
        alert('Erro ao registrar usuário!');
      },
    });
  }
}
