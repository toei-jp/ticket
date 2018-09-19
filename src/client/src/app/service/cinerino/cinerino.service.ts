import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as cinerino from '@toei-jp/cinerino-api-javascript-client';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
// import { StorageService } from '../storage/storage.service';

@Injectable()
export class CinerinoService {

    public auth: cinerino.IImplicitGrantClient;
    public userName?: string;
    public event: cinerino.service.Event;
    // public order: cinerino.service.Order;
    public organization: cinerino.service.Organization;
    // public person: cinerino.service.Person;
    // public place: cinerino.service.Place;
    // public transaction: {
    //     placeOrder: cinerino.service.transaction.PlaceOrder
    // };

    constructor(
        private http: HttpClient,
        // private storage: StorageService
    ) { }

    /**
     * getServices
     */
    public async getServices(): Promise<void> {
        try {
            const option = await this.createOption();
            this.event = new cinerino.service.Event(option);
            // this.order = new cinerino.service.Order(option);
            this.organization = new cinerino.service.Organization(option);
            // this.person = new cinerino.service.Person(option);
            // this.place = new cinerino.service.Place(option);
            // this.transaction = {
            //     placeOrder: new cinerino.service.transaction.PlaceOrder(option)
            // };
            // this.programMembership = new cinerino.service.ProgramMembership(option);
        } catch (err) {
            console.log(err);

            throw new Error('getServices is failed');
        }
    }

    /**
     * サインイン
     */
    // public async signIn() {
    //     const url = '/api/authorize/signIn';
    //     const result = await this.http.get<any>(url, {}).toPromise();
    //     console.log(result.url);
    //     location.href = result.url;
    // }

    /**
     * サインアップ
     */
    // public async signUp() {
    //     const url = '/api/authorize/signIn';
    //     const result = await this.http.get<any>(url, {}).toPromise();
    //     console.log(result.url);
    //     const signupUrl = (<string>result.url).replace(/\/authorize/, '/signup');
    //     location.href = signupUrl;
    // }

    /**
     * サインイン
     */
    // public reSignIn(): Promise<string> {
    //     return new Promise(async (resolve) => {
    //         const url = '/api/authorize/signIn';
    //         const result = await this.http.get<any>(url, {}).toPromise();
    //         console.log(result.url);
    //         if (result.url.indexOf('authorize') === -1) {
    //             resolve(<string>(result.url));
    //         } else {
    //             resolve (undefined);
    //         }
    //     });
    // }

    /**
     * サインアウト
     */
    // public async signOut() {
    //     const url = '/api/authorize/signOut';
    //     const result = await this.http.get<any>(url, {}).toPromise();
    //     console.log(result.url);
    //     location.href = result.url;
    // }

    /**
     * @method createOption
     */
    public async createOption() {
        await this.authorize();

        return {
            endpoint: environment.toeiAPIEndpoint,
            auth: this.auth
        };
    }

    /**
     * @method authorize
     */
    public async authorize() {
        const memberType = '0';
        const url = '/api/authorize/getCredentials';
        const options = {
            headers: new HttpHeaders({
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'If-Modified-Since': new Date(0).toUTCString()
            }),
            params: new HttpParams().set('member', memberType)
        };
        const credentials = await this.http.get<{
                accessToken: string;
            }>(url, options).toPromise();
        const option = {
            domain: '',
            clientId: '',
            redirectUri: '',
            logoutUri: '',
            responseType: '',
            scope: '',
            state: '',
            nonce: null,
            tokenIssuer: ''
        };
        this.auth = cinerino.createAuthInstance(option);
        this.auth.setCredentials(credentials);
    }
}
