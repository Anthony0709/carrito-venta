import { ChangeDetectorRef, Component } from '@angular/core';
import { Marca } from '../../interfaces/marca';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from '../../services/marca.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.css'
})
export class MarcaComponent {
  ListaMarca: Marca[] = [];
  loading: boolean = false;

  form: FormGroup;
  id: number = 0;
  operacion: string = 'Agregar '

  constructor(
    private fb: FormBuilder,
    private _marcaService: MarcaService,
    private toastr : ToastrService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private aRouter: ActivatedRoute
  ){this.form = this.fb.group({
    nombre: ['', Validators.required],
    clave: ['', Validators.required],
  })
}
ngOnInit(): void{
  this.get_listar_marca();  
  //if (this.id != 0) {
    // Editar
  //  this.operacion = 'Editar ';
  //  this.getusers(this.id);
  //}  
}

get_listar_marca(){
  this.loading = true;
    setTimeout(() => {
      this._marcaService.get_lis_marca().subscribe((data: Marca[]) => {
        this.ListaMarca = data;
        this.cd.markForCheck();                
        //console.log(data);
        this.loading = false;
    })   
  })
}

deleteUser(id: number){
  this.loading = true;
  this._marcaService.delete_marca(id).subscribe(() => {
    this.get_listar_marca();
    this.toastr.warning('Elimanada Marca','Marca eliminda');
  })
}
}