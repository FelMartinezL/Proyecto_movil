import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ModelViajes } from 'src/app/modelos/Viajes';

@Injectable({
  providedIn: 'root'
})
export class CrearViajes {
  constructor(private _http: HttpClient) { }

  superbaseUrl = "https://staxsitmytxxwupentta.supabase.co/rest/v1/"
  supabaseHeaders = new HttpHeaders().set("apiKey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0YXhzaXRteXR4eHd1cGVudHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NzQ2NjksImV4cCI6MjAxMTM1MDY2OX0.zwia42h8na8h1p52H0L8B_-IkHAS-WooRAWP5nGlC2Q")

  guardarViaje(registros1: ModelViajes): Observable<string | any>{
      return this._http.post<any>(this.superbaseUrl+'VIAJE',registros1,{headers: this.supabaseHeaders});
}
}