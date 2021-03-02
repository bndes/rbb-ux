import { Component, OnInit , Inject} from '@angular/core';
import { RbbuxConfig } from "../rbbux-config";
import { RBBUX_CONFIG } from "../rbbux.config.token";
import { FileUploader } from "ng2-file-upload";

/* import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Utils } from "../utils";
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';


 */
@Component({
  selector: 'lib-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(@Inject(RBBUX_CONFIG) private rbbuxConfig: RbbuxConfig) {

   }

  ngOnInit(): void {
  }

  public uploader = new FileUploader({
                          url: this.rbbuxConfig.serverUrl + "upload",
                          maxFileSize: this.rbbuxConfig.maxFileSize,
                         /*additionalParameter: {
                                cnpj:             _cnpj,
                                contrato:         _contrato,
                                contaBlockchain:  _contaBlockchain,
                                tipo: _tipo
                              },
 */
                          itemAlias:  "arquivo"});

  chamaUpload() {
    let self = this
    this.uploader.uploadAll();
    console.log("chamaUpload() - this.uploader")
    console.log(this.uploader)
  }


}
