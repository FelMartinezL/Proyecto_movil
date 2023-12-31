import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/user_services';
import { HttpClient } from '@angular/common/http';
import { UserPasajero } from '../modelos/UserPasajero';
import { Observable, of } from 'rxjs';
import { MostrarUsers } from '../services/home-user/home_users';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home-pasajero',
  templateUrl: './home-pasajero.page.html',
  styleUrls: ['./home-pasajero.page.scss'],
})
export class HomePasajeroPage {

  PasajeroInfoReceived$: Observable<UserPasajero | null>; 
  idUserHtmlRouterLink: any;
  user_id!: any;
  userList: any;

  constructor(private cdr: ChangeDetectorRef,private router: Router, private _userService: ApiService, private Httpclient: HttpClient, private _mostrarUser: MostrarUsers)
   {
    //this.user_id = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    //this.userInfoReceived$ = this._userService.getUser(this.user_id)
    this.user_id = JSON.parse(localStorage.getItem('user_id') || '') || '';
    this.PasajeroInfoReceived$ = this._userService.getPasajero(this.user_id);

   } 

  ngOnInit() {
    this.getUserType();
    //this.getUserInfo();
  }
  async getUserType(){
    
    console.log(this.user_id);
    
    if (this.user_id) {
      
      this.PasajeroInfoReceived$ = this._userService.getPasajero(this.user_id).pipe(
        catchError((error) => {
          console.log('Error al obtener el usuario', error);
          return of(null);
        }),
        tap((data) => {
          if (data) {
            console.log('user_id', data);
          } else {
            console.log('No se pudo obtener el usuario');
            console.log(this.user_id);
            console.log(data);
          }
          this.cdr.detectChanges();
        })
      );
    } else {
      console.log('user_id es undefined, no se puede realizar la solicitud a Supabase.');
    }
  }
  
  navegarA(opcion: String) {
    switch (opcion) {
      case 'home':
        this.router.navigate(['/home-usuario']);
        break;
      case 'configuracion':
        this.router.navigate(['/login']);
        break;
      case 'cuenta':
        this.router.navigate(['/recuperar']);
        break;
      default:
        break;
    }
  }
  salir(){
    console.log('Antes de eliminar el elemento');
    localStorage.removeItem('user_id');
    console.log('Después de eliminar el elemento');

    this.router.navigate(['/login']);
  }
  entrar(){
    console.log('entrando jeje');    
}
verMap(){
  console.log('Entrando al mapa');
  this.router.navigate(['/test']);
}

verViajes(){
  console.log('Saiendo...');
  this.router.navigate(['/disponible'])
}

}

