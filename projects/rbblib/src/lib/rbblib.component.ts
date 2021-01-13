import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { Utils } from './utils';
import {ethers} from 'ethers';

@Component({
  selector: 'lib-rbblib',
  template: `
    <p>
      rbblib works!
    </p>
  `,
  styles: [
  ]
})
export class RbblibComponent implements OnInit {

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

  constructor(private http: HttpClient) {


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

  ngOnInit(): void {}


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

}
