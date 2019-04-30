// Google methods

import omit from 'lodash.omit';
import tmp from 'tmp';
import shell from 'shelljs';
import winston from 'winston';
import jsonpack from 'jsonpack';
import yaml from 'js-yaml';

export default class AppEngineInstance {
  constructor({ settingsFile, dockerFile, appFile }) {
    this.meteorSettings = omit(settingsFile, 'meteor-google-cloud');
    this.dockerFile = dockerFile;
    this.appSettings = appFile;
    this.workingDir = tmp.dirSync().name;
  }

  prepareBundle() {
    // Create app.yml file
    const app = yaml.safeDump(this.appSettings);

    if (!app.env.METEOR_SETTINGS) {
      Object.assign(app.env, { METEOR_SETTINGS: jsonpack(this.meteorSettings || {}) });
    }
    shell.exec(`echo '${app}' >${this.workingDir}/app.yml`);

    // Create Dockerfile
    const nodeVersion = shell.exec('meteor node -v', { silent: true }).stdout.trim();
    const npmVersion = shell.exec('meteor npm -v', { silent: true }).stdout.trim();
    winston.debug(`set Node to ${nodeVersion}`);
    winston.debug(`set NPM to ${npmVersion}`);

    const docker = this.dockerFile
      .replace('{{ nodeVersion }}', nodeVersion)
      .replace('{{ npmVersion }}', npmVersion);

    shell.exec(`echo '${docker}' >${this.workingDir}/Dockerfile`);
  }

  async deployBundle() {
    winston.debug('deploy to App Engine');
    shell.exec(`cd ${this.workingDir}`);
    shell.exec('gcloud app deploy -q');
  }
}
