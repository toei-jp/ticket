/**
 * AwsCognitoService
 */
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';

@Injectable()
export class AwsCognitoService {
    public static REGION: string = environment.region;
    public static IDENTITY_POOL_ID: string = environment.identityPoolId;
    public static USER_POOL_ID: string = environment.userPoolId;
    public static CLIENT_ID: string = environment.clientId;

    public credentials: null | AWS.CognitoIdentityCredentials;

    constructor() {
        this.credentials = null;
    }

    /**
     * 端末IDで認証
     * @method authenticateWithDeviceId
     * @returns {Promise<void>}
     */
    public async authenticateWithDeviceId(): Promise<void> {
        if (this.isAuthenticate()) {
            return;
        }
        AWS.config.region = AwsCognitoService.REGION;
        let args: {
            IdentityPoolId: string;
            identityId?: string
        };
        const deviceId = localStorage.getItem('deviceId');
        if (deviceId !== null) {
            args = {
                IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
                identityId: deviceId
            };
        } else {
            args = {
                IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID
            };
        }
        AWS.config.credentials = new AWS.CognitoIdentityCredentials(args);
        this.credentials = (<AWS.CognitoIdentityCredentials>AWS.config.credentials);
        await this.credentials.getPromise();
    }

    /**
     * 認証確認
     * @method isAuthenticate
     * @returns {boolean}
     */
    public isAuthenticate(): boolean {
        return (this.credentials !== null
            && this.credentials.identityId !== undefined
            && this.credentials.identityId.length > 0);
    }

    /**
     * レコード更新
     * @param {string} datasetName
     * @param {value} value
     * @returns {Promise<any>}
     */
    public async updateRecords(datasetName: string, value: any): Promise<any> {
        if (this.credentials === null) {
            throw new Error('credentials is null');
        }
        await this.credentials.getPromise();
        const cognitoSync = new AWS.CognitoSync({
            credentials: this.credentials
        });
        const listRecords = await cognitoSync.listRecords({
            DatasetName: datasetName,
            IdentityId: this.credentials.identityId,
            IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
            LastSyncCount: 0
        }).promise();
        value.updateAt = moment().toISOString();
        if (listRecords.Records === undefined) {
            listRecords.Records = [];
        }
        const mergeValue = this.convertToObjects(listRecords.Records);
        Object.assign(mergeValue, value);

        const updateRecords = await cognitoSync.updateRecords({
            DatasetName: datasetName,
            IdentityId: this.credentials.identityId,
            IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
            SyncSessionToken: <string>listRecords.SyncSessionToken,
            RecordPatches: this.convertToRecords(mergeValue, <number>listRecords.DatasetSyncCount)
        }).promise();
        if (updateRecords.Records === undefined) {
            updateRecords.Records = [];
        }

        return this.convertToObjects(updateRecords.Records);
    }

    /**
     * レコード取得
     * @param {string} datasetName
     * @returns {Promise<any>}
     */
    public async getRecords(datasetName: string): Promise<any> {
        if (this.credentials === null) {
            throw new Error('credentials is null');
        }
        await this.credentials.getPromise();
        const cognitoSync = new AWS.CognitoSync({
            credentials: this.credentials
        });
        const listRecords = await cognitoSync.listRecords({
            DatasetName: datasetName,
            IdentityId: this.credentials.identityId,
            IdentityPoolId: AwsCognitoService.IDENTITY_POOL_ID,
            LastSyncCount: 0
        }).promise();
        if (listRecords.Records === undefined) {
            listRecords.Records = [];
        }
        console.log('getRecords', this.convertToObjects(listRecords.Records));

        return (<any>this.convertToObjects(listRecords.Records));
    }

    /**
     * レコードの形式へ変換
     * @param {any} value
     * @param {number} count
     * @returns {{ Key: string; Op: string; SyncCount: number; Value: string; }[]}
     */
    private convertToRecords(value: any, count: number): {
        Key: string;
        Op: string;
        SyncCount: number;
        Value: string;
    }[] {
        return Object.keys(value).map((key: string) => {
            return {
                Key: key,
                Op: 'replace',
                SyncCount: count,
                Value: JSON.stringify(value[key])
            };
        });
    }

    /**
     * オブジェクトの形式へ変換
     * @param {any[]} records
     * @param {number} count
     * @returns {Object}
     */
    private convertToObjects(records: any[]): Object {
        const result: any = {};
        records.forEach((record: {
            Key: string;
            Op: string;
            SyncCount: number;
            Value: string;
        }) => {
            result[record.Key] = JSON.parse(record.Value);
        });

        return result;
    }

}
