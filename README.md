# Meteor Google Cloud

[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)

A command line tool for deploying Meteor applications on Google Cloud App Engine Flexible.

## What is Google Cloud App Engine Flexible?

App Engine allows developers to focus on doing what they do best, writing code. Based on Google Compute Engine, the App Engine flexible environment automatically scales your app up and down while balancing the load.

*Meteor needs to run on App Engine Flexible, not Standard.*

App Engine manages your virtual machines, ensuring that:

- Instances are health-checked, healed as necessary, and co-located with other services within the project.
Critical, backwards compatible updates are automatically applied to the underlying operating system.
- VM instances are automatically located by geographical region according to the settings in your project. Google's management services ensure that all of a project's VM instances are co-located for optimal performance.
- VM instances are restarted on a weekly basis. During restarts Google's management services will apply any necessary operating system and security updates.
- You always have root access to Compute Engine VM instances. SSH access to VM instances in the flexible environment is disabled by default. If you choose, you can enable root access to your app's VM instances.

For more information, check: [App Engine Flexible Environment's page](https://cloud.google.com/appengine/docs/flexible/).

## App Engine Flexible Pricing

Because we run Meteor on the Flexible environment you may not be able to use the free tier of App Engine Standard. For the first year you may have $300 in credit per month, but be aware of the costs:

- [Pricing calculator.](https://cloud.google.com/products/calculator/#id=126a7009-debc-49e7-8e36-f7d5574ecfc1)
- [More info on App Engine billing.](https://stackoverflow.com/questions/47125661/pricing-of-google-app-engine-flexible-env-a-500-lesson)

## Installation

```bash
npm install meteor-google-cloud -g
 ```

## Deploying

To deploy to App Engine Flexible, follow the steps bellow:

### 1. Install gcloud CLI

```bash
Follow the guide on: https://cloud.google.com/sdk/install
```

### 2. Init Meteor Google Cloud

If this is the first time you deploy, you will need some specific files on your repo, run the command below to get them automatically generated.

```bash
meteor-google-cloud init
```

### 3. Set your App Engine Flexible settings

```bash
cd ./deploy
ls
Dockerfile	app.yml		settings.json
```

- Dockerfile: you can customize your Docker image, if you don't need to or don't know how to, you can either delete this fle or leave iit as is.
- app.yml: The settings and preferences of your App Engine service goes in here, check [Google's app.yml documentation](https://cloud.google.com/appengine/docs/standard/nodejs/config/appref) for full options.
- settings.json: This is your normal Meteor settings file, you will need to have the special key `meteor-google-cloud` for the deployment settings.
  - Required keys:
    - `project`: The project name of the project on Google Cloud to use.
  - Other keys: You can add any option you would like here, and they will be passed to `gcloud deploy app` command, for the full list, check [Google's gcloud deploy documentation](https://cloud.google.com/sdk/gcloud/reference/app/deploy).

### 4. Deploy

```bash
meteor-google-cloud --settings .deploy/config.json --app .deploy/app.yaml --docker .deploy/Dockerfile 
```

P.S: It may take a few minutes to build your app, which may appear to be unresponsive, but it's not, just wait.

## CLI options

The Meteor Google Cloud CLI supports the following options:

```bash
  -v, --version          output the version number
  -i, --init             init necessary files on your repo
  -s, --settings <path>  path to settings file (settings.json)
  -c, --app <path>       path to app.yaml config file
  -d, --docker <path>    path to Dockerfile file 
  -v, --verbose          enable verbose mode
  -q, --quiet            enable quite mode
  -h, --help             output usage information
```

## FAQ
**1. Does App Engine supports websockets?**
Yes, announced in February 5, 2019, [more info](https://cloud.google.com/blog/products/application-development/introducing-websockets-support-for-app-engine-flexible-environment).

**2. Does App Engine supports session affinity?** Yes.

**3. Do I get auto scaling?** Yes.

**4. Do I get auto healing?** Yes.

## Support

We welcome any questions, contributions or bug reports in the GitHub [issue tracker](https://github.com/EducationLink/meteor-google-cloud/issues).

## Ideas

- [ ] Add support for cron, queue, dos, etc.
- [ ] Use Google Deployment Manager (when fully supported)
- [ ] Support multiple service deployment (?)
- [ ] Set up CI

## License

[MIT](https://github.com/EducationLink/meteor-google-cloud/blob/master/LICENSE)

This package was heavily inspired on `meteor-azure`, a deployment packge for Meteor applicatons on Microsoft Azure, [click here](https://github.com/fractal-code/meteor-azure) for more information.
