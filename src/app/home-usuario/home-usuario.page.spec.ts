import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HomeUsuarioPage } from './home-usuario.page';

describe('HomeUsuarioPage', () => {
  let component: HomeUsuarioPage;
  let fixture: ComponentFixture<HomeUsuarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); 
