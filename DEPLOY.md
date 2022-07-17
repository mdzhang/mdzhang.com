# Deploy

Follow Setup in the README first.

## Infrastructure Deployment

This project uses [S3](https://aws.amazon.com/s3/) to store the generated static site files, and [Route 53](https://aws.amazon.com/route53/) as a DNS service.

### Manually via Web UI

See S3 setup instructions [here](http://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html)

### With Terraform

See [here](terraform/README.md)

## Site Deployment

Get S3 credentials to deploy your site. Either ask a project admin for `$AWS_ACCESS_KEY_ID` and `$AWS_SECRET_ACCESS_KEY` or [generate them yourself](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey).

### Manually

* Install `awscli`
    ```sh
    brew install awscli
    ```
* Build the site
    ```sh
    HUGO_BASEURL=http://mdzhang.com/ make build
    ```
* Ensure `$AWS_ACCESS_KEY_ID`, `$AWS_SECRET_ACCESS_KEY`, and `$AWS_S3_BUCKET` are defined in your environment
  - or that `~/.aws/config` and `~/.aws/credentials` are set appropriately
* Run e.g.
    ```sh
    HUGO_BASEURL=mdzhang.com make deploy
    ```

### Continuously

* See [Github Actions](https://github.com/mdzhang/mdzhang.com/actions) for this project, which will redeploy staging when the `development` branch is updated, and will redeploy production when the `main` branch is updated.
* [Add `$AWS_ACCESS_KEY_ID` and `$AWS_SECRET_ACCESS_KEY` to repository secrets](https://github.com/mdzhang/mdzhang.com/settings/secrets/actions).
