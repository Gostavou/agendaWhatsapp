import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contato } from 'src/app/model/contato';
import { ContatoService } from 'src/app/service/contato.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class DetalharPage implements OnInit {
  formDetalhar!: FormGroup
  contato!: Contato
  editar = true

  constructor(
    private router: Router,
    private alertController: AlertController,
    private contatoService: ContatoService,
    private formBuilder: FormBuilder
  ) {
    this.formDetalhar = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(8)]],
      telefone: ['', [Validators.required, Validators.minLength(10)]],
      genero: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation()
    if (nav?.extras?.state?.['objeto']) {
      this.contato = nav.extras.state['objeto']
      this.formDetalhar.patchValue({
        nome: this.contato.nome,
        telefone: this.contato.telefone,
        genero: this.contato.genero,
        email: this.contato.email
      })
    }
  }

  get errorControl() {
    return this.formDetalhar.controls
  }

  alterarEdicao() {
    this.editar = !this.editar
    if (this.editar) {
      this.formDetalhar.disable()
    } else {
      this.formDetalhar.enable()
    }
  }

  salvar() {
    if (!this.formDetalhar.valid) {
      this.presentAlert('Erro ao Atualizar', 'Campos Obrigatórios')
      return
    }
    const { nome, telefone, genero, email } = this.formDetalhar.value
    if (this.contatoService.update(this.contato, nome, telefone, genero, email)) {
      this.presentAlert('Atualizar', 'Contato atualizado com sucesso')
      this.router.navigate(['/home'])
    } else {
      this.presentAlert('Atualizar', 'Erro ao atualizar contato')
    }
  }

  excluir() {
    this.presentConfirmAlert('Excluir Contato', 'Você realmente deseja excluir contato?', () => {
      if (this.contatoService.delete(this.contato)) {
        this.presentAlert('Excluir', 'Exclusão efetuada com sucesso!')
        this.router.navigate(['/home'])
      } else {
        this.presentAlert('Erro ao Excluir', 'Contato não Encontrado')
      }
    })
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader,
      message,
      buttons: ['ok']
    })
    await alert.present()
  }

  async presentConfirmAlert(subHeader: string, message: string, acao: () => void) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader,
      message,
      buttons: [
        { text: 'Cancelar', role: 'cancelar', cssClass: 'secondary' },
        { text: 'Confirmar', handler: () => acao() }
      ]
    })
    await alert.present()
  }
}
