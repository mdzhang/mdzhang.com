# Terraform

## Setup

* Create a [Terraform Cloud](https://www.terraform.io/cloud) account
  * Create an API token
  * Setup VCS tracking
  * Create an organization and workspace
  * Set AWS environment variables: `$AWS_ACCESS_KEY_ID`, `$AWS_SECRET_ACCESS_KEY`, and `$AWS_REGION`
* Install [`asdf`](https://asdf-vm.com/)
* Install `terraform`
  ```sh
  brew install asdf
  asdf plugin-add terraform
  asdf plugin-add terraform-docs
  asdf plugin-add tflint
  asdf install
  ```
* Login from CLI
  ```sh
  terraform login
  ```
* Proceed with planning:
  ```sh
  terraform init
  terraform plan
  ```

## Tips

Add to shell startup

```sh
alias tf='terraform'
```
