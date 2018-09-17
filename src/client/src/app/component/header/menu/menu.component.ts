/**
 * MenuComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CallNativeService, InAppBrowserTarget } from '../../../service/call-native/call-native.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    @Input() public isOpen: boolean;
    @Output() public logout: EventEmitter<{}> = new EventEmitter();
    @Output() public close: EventEmitter<{}> = new EventEmitter();
    public portalSite: string;

    constructor(private callNative: CallNativeService) { }

    /**
     * 初期化
     * @method ngOnInit
     * @returns {Promise<void>}
     */
    public ngOnInit(): void {
        this.portalSite = environment.portalSite;
    }

    /**
     * webブラウザで開く
     * @method openWebBrowse
     * @param {string} url
     */
    public openWebBrowse(url: string): void {
        this.callNative.inAppBrowser({
            url: url,
            target: InAppBrowserTarget.System
        });
        this.close.emit();
    }
}
