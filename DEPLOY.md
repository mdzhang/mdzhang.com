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

* Build the site
    ```sh
    HUGO_BASEURL=http://mdzhang.com/ hugo
    ```
* Ensure `$AWS_ACCESS_KEY_ID` and `$AWS_SECRET_ACCESS_KEY` are defined in your environment
* Run e.g.
    ```sh
    npm run deploy
    ```

### Continuously

* Reuse the existing [`./.circleci/config.yml`](./.circleci/config.yml) file, which will redeploy staging when the `development` branch is updated, and will redeploy production when the `master` branch is updated.
* [Add `$AWS_ACCESS_KEY_ID` and `$AWS_SECRET_ACCESS_KEY` to CircleCI](https://circleci.com/docs/environment-variables/#setting-environment-variables-for-all-commands-without-adding-them-to-git
).
