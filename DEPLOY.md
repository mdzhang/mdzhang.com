# Deploy

Follow Setup in the README first.

## Infrastructure Deployment

This project uses [S3](https://aws.amazon.com/s3/) to store the generated static site files, and [Route 53](https://aws.amazon.com/route53/) as a DNS service.

### Manually via Web UI

See S3 setup instructions [here](http://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html)

### With Terraform

See [here](terraform/README.md)

## Site Deployment

### Manually

- Install `awscli`
  ```sh
  brew install awscli
  ```
- Build the site
  ```sh
  $ cd frontend
  $ BASEURL=mdzhang.com make build
  ```
- Get S3 credentials to deploy your site. Either ask a project admin for `$AWS_ACCESS_KEY_ID` and `$AWS_SECRET_ACCESS_KEY` or [generate them yourself](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey).
- Ensure `$AWS_ACCESS_KEY_ID`, `$AWS_SECRET_ACCESS_KEY`, and `$AWS_S3_BUCKET` are defined in your environment or that `~/.aws/config` and `~/.aws/credentials` are set appropriately
- Run e.g.
  ```sh
  BASEURL=mdzhang.com make deploy
  ```

### Continuously

See [Github Actions](https://github.com/mdzhang/mdzhang.com/actions) for this project.

TL;DR site is built and sync'd to AWS S3. Pushes with Terraform changes to `main` include a `terraform plan` which then needs to be manually applied in Terraform Cloud.

Further, when `main` branch is updated, the `deploy/production/site` branch is updated to reflect latest built site.

## Content Deployment

- Update content in [Sanity](https://www.sanity.io/) directly
- See [Sanity README](./sanity-studio/README.md) for importing data otherwise.
