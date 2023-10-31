import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ViajeService {
    
    IniciarViaje() {
        console.log("Iniciando viaje");
    }
    FinalizarViaje() {
        console.log("Finalizando viaje");
    }

}