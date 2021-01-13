import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Web3Service } from '../Web3Service';
import { environment } from '../../environments/environment';
import { Utils } from '../utils';
import {ethers} from 'ethers';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  usuario : any;
  selectedAccount : any;
  events: string[] = [];
  opened: boolean;

  private serverUrl: string;

  private RBBRegistryAddress: string = '';
  private blockchainNetwork: string = '';
  private ethereum: any;
  private web3Instance: any;                  // Current instance of web3

  private RBBRegistrySmartContract: any;

  // Application Binary Interface so we can use the question contract
  private ABIRBBRegistry;

  private vetorTxJaProcessadas : any[];

  private eventoBNDESRegistry: any;
  private eventoCadastro: any;
  private eventoTransacao: any;

  private provider: any;
  private netVersion: any;
  private accountProvider: any;
  private URLBlockchainProvider: string;

  public static serverUrl: string = environment.serverUrl;

  constructor(private  http: HttpClient) {

    console.log("Web3Service.ts :: Selecionou URL = " + this.serverUrl)

    this.http.post<Object>(this.serverUrl + 'constantesFront', {}).subscribe(
        data => {

            this.RBBRegistryAddress      = data["addrContratoBNDESRegistry"];
            this.blockchainNetwork       = data["blockchainNetwork"];
            this.ABIRBBRegistry          = data['abiBNDESRegistry'];
            this.URLBlockchainProvider   = data["URLBlockchainProvider"];

            console.log("abis");
            console.log(this.ABIRBBRegistry);

            this.intializeWeb3();

        },
        error => {
            console.log("**** Erro ao buscar constantes do front");
        });

  }

  ngOnInit():void {

    setInterval(async () => {
      this.selectedAccount = await this.getCurrentAccountSync();
      console.log(this.selectedAccount);
      this.usuario = await this.recuperaRegistroBlockchain(this.selectedAccount);
  }, 5000)
  }



  async intializeWeb3() {

    console.log("this.URLBlockchainProvider = " + this.URLBlockchainProvider);
    this.provider = new ethers.providers.JsonRpcProvider(this.URLBlockchainProvider);
    this.ethereum =  window['ethereum'];

    this.netVersion = await this.ethereum.request({
        method: 'net_version',
    });
    console.log(this.netVersion);

    this.accountProvider = new ethers.providers.Web3Provider(this.ethereum);

    console.log("accountProvider=");
    console.log(this.accountProvider);

    console.log("INICIALIZOU O WEB3 - RBBRegistryAddress abaixo");
    console.log("this.RBBRegistryAddress=" + this.RBBRegistryAddress);

    this.RBBRegistrySmartContract = new ethers.Contract(this.RBBRegistryAddress, this.ABIRBBRegistry, this.provider);

    console.log("INICIALIZOU O WEB3");
    console.log("BNDESRegistry=");
    console.log(this.RBBRegistrySmartContract);
  }


  public getInfoBlockchainNetwork(): any {

    let blockchainNetworkAsString = "Localhost";
    let blockchainNetworkPrefix = "";
    if (this.blockchainNetwork=="4") {
        blockchainNetworkAsString = "Rinkeby";
        blockchainNetworkPrefix = "rinkeby."
    }
    else if (this.blockchainNetwork=="1") {
        blockchainNetworkAsString = "Mainnet";
    }

    return {
        blockchainNetwork:this.blockchainNetwork,
        blockchainNetworkAsString:blockchainNetworkAsString,
        blockchainNetworkPrefix: blockchainNetworkPrefix,
        registryAddr: this.RBBRegistryAddress
    };
  }


  public getCurrentAccountSync() {
    if (this.accountProvider.getSigner() != undefined)
        return this.accountProvider.getSigner().getAddress();
    else {
        console.log("getCurrentAccountSync waiting for getSigner");
        return undefined;
    }
}

conectar () {
  this.ethereum.enable();
}


  toggleSideBar(){
    this.toggleSideBarForMe.emit();
  }


  async getPJInfo(address: string): Promise<any> {
    let result = await this.RBBRegistrySmartContract.getRegistry(address);
    let pjInfo = this.montaPJInfo(result);
    pjInfo.address = address; //apendice com endereco
    return pjInfo;
 }

  async recuperaRegistroBlockchain(enderecoBlockchain) : Promise<any> {
    if (enderecoBlockchain != undefined && enderecoBlockchain != null) {
        let usuario = await this.getPJInfo(enderecoBlockchain);
        return usuario;
    } else {
        console.log('this.usuario');
        console.log(this.usuario);
        return undefined;
    }

}

    //Métodos de tradução back-front

montaPJInfo(result): any {
  let pjInfo: any;

  console.log("montaPJInfo");
  console.log(result);

  pjInfo  = {};

  if ( result == undefined )
      return pjInfo;

  pjInfo.rbbid = result[0];
  pjInfo.cnpj = result[1];
  pjInfo.hashDeclaracao = result[2];
  pjInfo.status = result[3];
  pjInfo.role = result[4];
  pjInfo.paused = result[5];
  pjInfo.dateTimeExpiration = result[6];
  //pjInfo.address = result[5];

  pjInfo.statusAsString = this.getEstadoContaAsStringByCodigo(pjInfo.status);
  pjInfo.roleAsString   = this.getPapelContaAsString(pjInfo.role);

  if ( pjInfo.cnpj != undefined ) {
      pjInfo.cnpj = Utils.completarCnpjComZero(pjInfo.cnpj);
  }

  if (pjInfo.status == 2) {
      pjInfo.isValidada =  true;
  }
  else {
      pjInfo.isValidada = false;
  }


  if (pjInfo.status == 0) {
      pjInfo.isAssociavel =  true;
  }
  else {
      pjInfo.isAssociavel = false;
  }

  return pjInfo;
}

getEstadoContaAsStringByCodigo(result): string {
  if (result==100) {
      return "Conta Reservada";
  }
  else if (result==0) {
      return "Disponível";
  }
  else if (result==1) {
      return "Aguardando";
  }
  else if (result==2) {
      return "Validada";
  }
  else if (result==3) {
      return "Invalidada";
  }
  else {
      return "N/A";
  }
}


getPapelContaAsString (result): string {
  if (result==0) {
      return "Regular";
  }
  else if (result==1) {
      return "Admin";
  }
  else if (result==2) {
      return "Supadmin";
  }
  else {
      return "Indefinido";
  }
}

}
