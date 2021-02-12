import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Utils } from "../utils";
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';



@Component({
  selector: 'lib-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {



  serverUrl: string;
  operationAPIURL: string;
  maxFileSize : number;
  CAMINHO_MODELO_DECLARACAO_CONTA_DIGITAL: string;
  CAMINHO_ROTEIRO_ASSINATURA_DIGITAL: string;
  hashdeclaracao: string;

  public uploader: FileUploader;

  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl;
    this.http.post<Object>(this.serverUrl + 'constantesFrontPJ', {}).subscribe(

      data => {

        this.operationAPIURL = data["operationAPIURL"];
        this.maxFileSize = data["maxFileSize"];
        this.CAMINHO_MODELO_DECLARACAO_CONTA_DIGITAL = data["CAMINHO_MODELO_DECLARACAO_CONTA_DIGITAL"];
        this.CAMINHO_ROTEIRO_ASSINATURA_DIGITAL = data["CAMINHO_ROTEIRO_ASSINATURA_DIGITAL"];
      },
      error => {
          console.log("**** Erro ao buscar constantes do front");
      });

    console.log("FileServiceService.ts :: Selecionou URL = " + this.serverUrl);

   }

  ngOnInit(): void {
  }

  atualizaUploaderComponent(_cnpj, _contrato, _contaBlockchain, _tipo, componenteComDeclaracao) {
    let self = this;
    this.uploader = new FileUploader({
                          url: this.serverUrl + "upload",
                          maxFileSize: this.maxFileSize,
                          additionalParameter: {
                                cnpj:             _cnpj,
                                contrato:         _contrato,
                                contaBlockchain:  _contaBlockchain,
                                tipo: _tipo
                              },

                          itemAlias:  "arquivo"});
    this.uploader.onAfterAddingFile = (fileItem) =>
    { fileItem.withCredentials = false;
    };

    this.uploader.onWhenAddingFileFailed = (fileItem) => {
       console.log("fail upload: max file size exceeded! ", fileItem);
       componenteComDeclaracao.hashdeclaracao = "ERRO! Arquivo muito grande! Tente enviar um arquivo menor.";
        //this.failFlag = true;
    }

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
             console.log("upload feito.", item, status, response);
             componenteComDeclaracao.hashdeclaracao = response.toString().replace('\"','').replace('\"','');
             componenteComDeclaracao.flagUploadConcluido = true;
        };
  }

  chamaUpload() {
      let self = this
      this.uploader.uploadAll();
      console.log("chamaUpload() - this.uploader")
      console.log(this.uploader)
  }


    private handleError(err: HttpErrorResponse) {
      console.log("handle errror em PJService");
      console.log(err);
      return Observable.throw(err.message);
    }



}
