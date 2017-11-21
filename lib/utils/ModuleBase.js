/**
 * @flow
 */
import { initialiseLogger } from './log';
import { initialiseNativeModule } from './native';

import type App from '../modules/core/app';
import type { FirebaseModuleConfig, FirebaseNamespace } from '../types';

export default class ModuleBase {
  _app: App;
  _serviceUrl: ?string;
  namespace: FirebaseNamespace;

  /**
   *
   * @param app
   * @param config
   */
  constructor(app: App, config: FirebaseModuleConfig, serviceUrl: ?string) {
    if (!config.moduleName) {
      throw new Error('Missing module name');
    }
    if (!config.namespace) {
      throw new Error('Missing namespace');
    }
    const { moduleName } = config;
    this._app = app;
    this._serviceUrl = serviceUrl;
    this.namespace = config.namespace;

    // check if native module exists as all native
    initialiseNativeModule(this, config, serviceUrl);
    initialiseLogger(
      this,
      `${app.name}:${moduleName.replace('RNFirebase', '')}`
    );
  }

  /**
   * Returns the App instance for current module
   * @return {*}
   */
  get app(): App {
    return this._app;
  }

  get serviceUrl(): ?string {
    return this._serviceUrl;
  }

  /**
   * Returns the a key that uniquely identifies the native instance for this module
   * @return {string}
   */
  get nativeModuleKey(): string {
    return `${this.serviceUrl || this.app.name}:${this.namespace}`;
  }
}
