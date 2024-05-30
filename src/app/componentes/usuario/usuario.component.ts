import { Component , OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioComponent {
  listUsuario: Usuario[] = [];
  loading: boolean = false;

  form: FormGroup;
  id: number = 0;
  operacion: string = 'Agregar '

  constructor(
    private fb: FormBuilder,
    private _usuaService: UsuarioService,
    private toastr : ToastrService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private aRouter: ActivatedRoute
  ){this.form = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', Validators.required],
  })
  //this.id = Number(aRouter.snapshot.paramMap.get('idUsuario'));
  //console.log(aRouter.snapshot.paramMap.get('idUsuario'));

}

  ngOnInit(): void{
    this.getListUsuarios();  
    //if (this.id != 0) {
      // Editar
    //  this.operacion = 'Editar ';
    //  this.getusers(this.id);
    //}  
  }

  getListUsuarios(){
    this.loading = true;
    setTimeout(() => {
      this._usuaService.get_listar().subscribe((data: Usuario[]) => {
        this.listUsuario = data;
        this.cd.markForCheck();                
        //console.log(data);
        this.loading = false;
    })   
  })
  }

  deleteUser(id: number){
    this.loading = true;
    this._usuaService.userDelete(id).subscribe(() => {
      this.getListUsuarios();
      this.toastr.warning('El usuario fue eliminado con exito','Usuario eliminda');
    })
  }

//+++++++++++++++++++++++++++++++++++++++++++++++


getusers(id: number) {
  this.loading = true;
  this._usuaService.getUser(id).subscribe((data: Usuario) => {
    console.log(data);
    this.loading = false;
    this.form.setValue({
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      clave: data.clave
    })
  })
}

addUser() {
  const usuer: Usuario = {
    nombre: this.form.value.nombre,
    apellido: this.form.value.apellido,
    correo: this.form.value.correo,
    clave: this.form.value.clave
  };

  this.loading = true;

  if (this.id !== 0) {
    // Editar
    usuer.idUsuario = this.id;
    this._usuaService.updateUser(this.id, usuer).subscribe({
      next: () => {
        this.toastr.info(`El Usuario ${usuer.nombre} fue actualizado con éxito`, 'Usuario actualizado');
        this.getListUsuarios();
        this.loading = false;        
        //this.router.navigate(['/usuario']);
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  } else {
    // Agregar
    this._usuaService.saveUser(usuer).subscribe({
      next: () => {
        this.toastr.success(`El Usuario ${usuer.nombre} fue registrado con éxito`, 'Usuario registrado');
        this.getListUsuarios(); 
        this.loading = false;
        //this.router.navigate(['/usuario']);
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }
}

editarUsuario(usuario: Usuario) {
  this.id = usuario.idUsuario!;
  this.operacion = 'Editar ';
  this.form.setValue({
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    correo: usuario.correo,
    clave: usuario.clave
  });
}

nuevoUsuario() {
  this.id = 0;
  this.operacion = 'Agregar ';
  this.form.reset({
    nombre: '',
    apellido: '',
    correo: '',
    clave: ''
  });
}

private handleError(error: any) {
  this.loading = false;
  if (error.status === 400 && error.error.detail === 'El correo ya está registrado') {
    this.toastr.error('El correo ya está registrado', 'Error');
  } else if (error.status === 400) {
    this.toastr.error(error.error.detail, 'Error');
  } else {
    this.toastr.error('Ocurrió un error al procesar la solicitud', 'Error');
  }
}


}
